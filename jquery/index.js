var localStorage = window.localStorage;
var data = {};

function div(classname, id, innerHtml) {
    return $(document.createElement('div'))
        .addClass(classname)
        .attr('id', id)
        .html(innerHtml)
}

function button(classname, id, value, onclick) {
    return $(document.createElement('input'))
        .addClass(classname)
        .attr('id', id)
        .attr('type', 'button')
        .attr('value', value)
        .attr('onclick', onclick)
}

function renderComment(dom_id, c) {
    jQuery(dom_id).html("");
    jQuery(dom_id).append(div('comment_name', undefined, c.name))
        .append(div('comment_email', undefined, c.email))
        .append(div('comment_body', undefined, c.body))
        .append(button('comment_like', undefined, 'Like!', "likeComment(" + c.id + ")"))
        .append(button('post_delete_comments', undefined, 'Delete Comments', "deleteComment(" + c.id + ")"));
    if (c.liked) {
        jQuery(dom_id + ">.comment_like").attr("disabled", true)
            .val("Liked");
    }
}

function renderPost(dom_id, post) {
    jQuery(dom_id).html("");
    jQuery(dom_id).append(div('post_id', undefined, post.id))
        .append(div('post_User', undefined, (data.users.find(u => u.id === post.userId) || {}).name))
        .append(div('post_title', undefined, post.title))
        .append(div('post_body', undefined, post.body))
        .append(button('post_edit_post', undefined, 'Edit Post', "editPost(" + post.id + ")"))
        .append(button('post_delete_post', undefined, 'Delete Post', "deletePost(" + post.id + ")"))
        .append(button('post_show_comments', undefined, 'Show Comments', "showComments(" + post.id + ")"))
        .append(button('post_create_comments', undefined, 'Create Comments', "createComments(" + post.id + ")"));
    // console.log(data.comments)
}

function saveData(data, changed) {
    localStorage.setItem('data', JSON.stringify(data));
    if (changed) {
        if (changed.comment) {
            // console.log(changed.comment)
            var c = data.comments.filter(c => c.id === changed.comment)[0];
            if (!c.deleted) {
                // create new
                // console.log(c)
                jQuery('#postid_' + c.postId + ">.post_comments").append(div('comment', 'commentid_' + c.id));
                renderComment('#commentid_' + c.id, c);
            } else {
                //delete
                jQuery('#commentid_' + c.id).remove();
            }
        }
        if (changed.post) {
            var post = data.posts.filter(post => post.id === changed.post)[0];
            if (!jQuery('#postid_' + post.id).length) {
                // create new
                jQuery('#posts').append(div('post', 'postid_' + post.id));
                renderPost('#postid_' + post.id, post);
            } else if (!post.deleted) {
                // edit
                renderPost('#postid_' + post.id, post);
            } else {
                //delete
                jQuery('#postid_' + post.id).remove();
            }
        }
    } else {
        location.reload();
    }
}

function edit_comment_submit() {
    var id = data.comments.length + 1;
    data.comments.push({
        postId: parseInt(jQuery('#edit_comment_post_id').attr("value")),
        id: id,
        name: jQuery('#edit_comment_name').val(),
        email: jQuery('#edit_comment_email').val(),
        body: jQuery('#edit_comment_body').val(),
    });
    saveData(data, { comment: id });
    jQuery("#edit_comment").hide();
}

function edit_comment_cancel() {
    jQuery("#edit_comment").hide();
}

function edit_post_submit() {
    var postId = parseInt(jQuery('#edit_post_id').val());
    console.log(postId);
    if (postId) {
        for (var post of data.posts) if (post.id === postId) {
            post.userId = jQuery('#edit_post_userId').val();
            post.title = jQuery('#edit_post_title').val();
            post.body = jQuery('#edit_post_body').val();
        }
    } else {
        postId = data.posts.length + 1;
        data.posts.push({
            userId: parseInt(jQuery('#edit_post_userId').val()),
            id: postId,
            title: jQuery('#edit_post_title').val(),
            body: jQuery('#edit_post_body').val(),
        });
    }
    saveData(data, { post: postId });
    jQuery("#edit_post").hide();
}

function edit_post_cancel() {
    jQuery("#edit_post").hide();
}

function editPost(postid) {
    for (var post of data.posts) if (post.id === postid) {
        jQuery('#edit_post_userId').attr("value", post.userId);
        jQuery('#edit_post_id').attr("value", post.id);
        jQuery('#edit_post_title').attr("value", post.title);
        jQuery('#edit_post_body').attr("value", post.body);
    }
    jQuery("#edit_post").show();
    jQuery("#edit_post_id").attr('value', postid);
}

function createPost() {
    jQuery("#edit_post").show();
    jQuery("#edit_post_id").attr('value', "");
}

function deletePost(postid) {
    data.posts.filter(p => p.id === postid).forEach(p => p.deleted = true);
    saveData(data, { post: postid });
}

function deleteComment(commentid) {
    data.comments.filter(c => c.id === commentid).forEach(c => c.deleted = true);
    saveData(data, { comment: commentid });
}
function likeComment(commentid) {
    data.comments.filter(c => c.id === commentid).forEach(c => c.liked = true);
    saveData(data, { comment: commentid });
}

function showComments(postid) {
    jQuery('#postid_' + postid + ">.post_show_comments").attr("disabled", true);
    jQuery('#postid_' + postid).append(div('post_comments'));
    data.comments.filter(c => c.postId === postid).filter(c => !c.deleted).forEach(c => {
        jQuery('#postid_' + postid + ">.post_comments").append(div('comment', 'commentid_' + c.id));
        renderComment('#commentid_' + c.id, c);
    });
}

function createComments(postid) {
    jQuery("#edit_comment_post_id").attr('value', postid);
    jQuery("#edit_comment").show();
}

function loadData(data, n) {
    jQuery("#fetch").hide();
    // console.log(JSON.stringify(data));
    if (!this.current) this.current = 0;
    // console.log(this.current);
    data.posts.filter(post => !post.deleted).slice(this.current, this.current + n).forEach(post => {
        // console.log(post);
        this.current += 1;
        jQuery('#posts').append(div('post', 'postid_' + post.id));
        renderPost('#postid_' + post.id, post);
    });
}

function fetchData(url, category) {
    return new Promise((resolve, reject) => {
        jQuery.ajax({
            url: url,
            type: "GET",
            success: json => {
                // console.log(json);
                // console.log(typeof(json));
                resolve([category, json]);
            },
            error: error => {
                console.log(error);
                var urlwlink = "<a href='" + url + "'>" + url + "</a>";
                var errortext = "* Failed to load " + category + ". Check your connection to " + urlwlink + ". ";
                jQuery("#error_messages").append("<div>" + errortext + "<br>Please refresh the page. </div>");
                reject(error);
            },
        });
    });
}

function fetchButtonClick() {
    jQuery("#fetch").attr("disabled", true);
    var promisePosts = fetchData("https://jsonplaceholder.typicode.com/posts", 'posts');
    var promiseComments = fetchData("https://jsonplaceholder.typicode.com/comments", 'comments');
    var promiseUsers = fetchData("https://jsonplaceholder.typicode.com/users", 'users');
    Promise.all([promisePosts, promiseComments, promiseUsers]).then(value => {
        data = {};
        value.forEach(v => data[v[0]] = v[1]);
        saveData(data);
    }).catch(error => {
        console.log(error);
        jQuery("#fetch").attr("disabled", false);
    });
}

function loadwoData() {
    jQuery("#fetch").show();
}

function clearButtonClick() {
    localStorage.clear();
    location.reload();
}

jQuery(() => {
    jQuery(window).on('scroll', function () {
        // console.log($(this).scrollTop(), $(this).innerHeight(), window.innerHeight);
        if ($(this).scrollTop() + window.innerHeight >= $(this).innerHeight()) {
            loadData(data, 20);
        }
    })
    data = JSON.parse(localStorage.getItem('data'));
    // console.log(data);
    if (data) {
        loadData(data, 20);
    } else {
        loadwoData()
    }
});

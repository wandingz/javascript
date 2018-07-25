var localStorage = window.localStorage;
var data = {};


function saveData(data) {
    localStorage.setItem('data', JSON.stringify(data));
    location.reload();
}

function edit_comment_submit() {
    data.comments.push({
        postId: parseInt(jQuery('#edit_comment_post_id').attr("value")),
        id: data.comments.length + 1,
        name: jQuery('#edit_comment_name').val(),
        email: jQuery('#edit_comment_email').val(),
        body: jQuery('#edit_comment_body').val(),
    });
    saveData(data);
}

function edit_comment_cancel() {
    jQuery("#edit_comment").hide();
}

function edit_post_submit() {
    var postid = parseInt(jQuery('#edit_post_id').val());
    console.log(postid);
    if (postid) {
        for (var post of data.posts) if (post.id === postid) {
            post.userId = jQuery('#edit_post_userId').val();
            post.title = jQuery('#edit_post_title').val();
            post.body = jQuery('#edit_post_body').val();
        }
    } else {
        var obj = {
            userId: parseInt(jQuery('#edit_post_userId').val()),
            id: data.posts.length + 1,
            title: jQuery('#edit_post_title').val(),
            body: jQuery('#edit_post_body').val(),
        };
        console.log(obj);
        data.posts.push(obj);
    }
    saveData(data);
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
    saveData(data);
}

function deleteComment(commentid) {
    data.comments.filter(c => c.id === commentid).forEach(c => c.deleted = true);
    saveData(data);
}
function likeComment(commentid) {
    data.comments.filter(c => c.id === commentid).forEach(c => c.liked = true);
    saveData(data);
}

function showComments(postid) {
    jQuery('#postid_' + postid + ">.post_show_comments").attr("disabled", true);
    jQuery('#postid_' + postid).append(div('post_comments'));
    data.comments.filter(c => c.postId === postid).filter(c => !c.deleted).forEach(c => {
        jQuery('#postid_' + postid + ">.post_comments").append(div('comment', 'commentid_' + c.id));
        jQuery('#commentid_' + c.id).append(div('comment_name', undefined, c.name))
            .append(div('comment_email', undefined, c.email))
            .append(div('comment_body', undefined, c.body))
            .append(button('comment_like', undefined, 'Like!', "likeComment(" + c.id + ")"))
            .append(button('post_delete_comments', undefined, 'Delete Comments', "deleteComment(" + c.id + ")"));
        if (c.liked) {
            jQuery('#commentid_' + c.id + ">.comment_like").attr("disabled", true)
                .val("Liked");
        }
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
    console.log(this.current);
    data.posts.filter(post => !post.deleted).slice(this.current, this.current + n).forEach(post => {
        // console.log(post);
        this.current += 1;
        jQuery('#posts').append(div('post', 'postid_' + post.id));
        jQuery('#postid_' + post.id).append(div('post_id', undefined, post.id))
            .append(div('post_User', undefined, (data.users.find(u => u.id === post.userId) || {}).name))
            .append(div('post_title', undefined, post.title))
            .append(div('post_body', undefined, post.body))
            .append(button('post_edit_post', undefined, 'Edit Post', "editPost(" + post.id + ")"))
            .append(button('post_delete_post', undefined, 'Delete Post', "deletePost(" + post.id + ")"))
            .append(button('post_show_comments', undefined, 'Show Comments', "showComments(" + post.id + ")"))
            .append(button('post_create_comments', undefined, 'Create Comments', "createComments(" + post.id + ")"));
        // console.log(data.comments)
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

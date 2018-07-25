
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


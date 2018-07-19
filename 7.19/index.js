var status = 'pause';

var leftText = document.getElementById('leftText');
var rightText = document.getElementById('rightText');

var timeMs = 1000;

function timer() {
    if (status === 'shiftLeft') {
        if(leftText.value.length !== 0) {
            var t = leftText.value[0];
            leftText.value = leftText.value.slice(1);
            rightText.value += t;
        }
    }
    if (status === 'shiftRight') {
        if(rightText.value.length !== 0) {
            var t = rightText.value[rightText.value.length - 1];
            rightText.value = rightText.value.slice(0, rightText.value.length - 1);
            leftText.value = t + leftText.value;
        }
    }

    setTimeout(timer, timeMs);
}

timer();

function shift(s) {
    status = s;
}

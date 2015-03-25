var ctx = document.getElementById('ctx').getContext('2d');
var canvas100 = document.createElement('canvas');
canvas100.height = 640;
canvas100.width = 480;
original = canvas100.getContext('2d');
var canvas25 = document.createElement('canvas');
canvas25.height = 640;
canvas25.width = 480;
var reference = canvas25.getContext('2d');

$(document).ready(function () {
    original.drawImage($('#img100')[0], 0, 0);
    reference.drawImage($('#img50')[0], 0, 0);
    var dataOriginal = original.getImageData(0, 0, 480, 640);
    var dataReference = reference.getImageData(0, 0, 480, 640);
    var result = ctx.createImageData(480, 640);
    var maxIndex = 4 * (480 + 640*640);
    var diff;
    for (var i = 0; i < maxIndex; i++) {
        if ((i % 4) == 3) {
            result.data[i] = 255;
        } else {
            diff  = Math.abs(dataOriginal.data[i] - dataReference.data[i]);
            result.data[i] = 255-diff;
        }
    }
    ctx.putImageData(result, 0, 0);
    console.log('Rendered');
});

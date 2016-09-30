(function () {
    'use strict';

    function getPixelArray(r,g,b,a) {
        var data = [];
        data[0] = r;
        data[1] = g;
        data[2] = b;
        data[3] = a;
        return data;
    }

    $(document).ready(function(){
        var $frontCanvas = $('#frontCanvas');
        var frontContext = $frontCanvas.get(0).getContext('2d');

        frontContext.fillStyle = "rgb(200,0,0)";
        frontContext.fillRect (10, 10, 50, 50);
        var imageData = frontContext.createImageData(1,1);
        imageData.data = getPixelArray(255, 0, 0,255);
        imageData.putImageData(imageData, 100, 100);
        imageData.data = getPixelArray(0, 0, 0, 0);
        imageData.putImageData(imageData, 100, 100, 100);
    });
}());
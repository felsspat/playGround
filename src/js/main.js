(function () {
    'use strict';

    function getPixelArray(context, r,g,b,a) {
        var data = context.createImageData(1,1);
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
        frontContext.putImageData(getPixelArray(frontContext, 255, 0, 0, 255), 100, 100);
        frontContext.putImageData(getPixelArray(frontContext, 255, 0,0 , 0), 105, 100);
    });
}());
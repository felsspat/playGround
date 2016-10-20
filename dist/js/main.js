(function () {
    'use strict';

    var Color = function(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;

        this.toString = function() {
            return ('rgb(' + this.r + ',' + this.g + ',' + this.b + ')');
        };
    };

    var Mandel = function (width, height) {
        this.width = width;
        this.height = height;

        this.mandelColor = function(x,y) {
            this.x0 = (x / this.width) * 3.5 - 2.5; // -2.5 .. 1
            this.y0 = (y / this.height) * 2 - 1; // -1 .. 1
            this.x = 0;
            this.y = 0;
            this.iteration = 0;
            this.maxIteration =100;
            this.xTemp = 0;

            while ((this.x * this.x + this.y * this.y) < 4 && this.iteration < this.maxIteration) {
                this.xTemp = this.x * this.x - this.y * this.y + this.x0;
                this.y = 2 * this.x * this.y + this.y0;
                this.x = this.xTemp;
                this.iteration++;

            }
            var color = this.iteration / this.maxIteration * 255;
            return color;
        };
    };

    var CanvasObject = function(canvas) {
        this.canvas = canvas;
        this.canvas.width = $('canvas').parent().width();
        this.canvas.height = $('canvas').parent().height();
        this.context = this.canvas.getContext('2d');

        this.putPixel = function(x,y, color) {
            this.context.fillStyle = color.toString();
            this.context.fillRect (x, y, 1, 1);
        };

        this.putImageData = function(imageData) {
            this.context.putImageData(imageData, 0, 0);
        };

        return this;
    };

    $(document).ready(function(){
        var start = new Date().getTime();
        var canvases = [$('#frontCanvas'),
            $('#backCanvas'),
            $('#leftCanvas'),
            $('#rightCanvas'),
            $('#topCanvas'),
            $('#bottomCanvas')
        ];

        var width = canvases[0].width();
        var height = canvases[0].width();
        var canvasObjects = [];
        var mandel = new Mandel(width, height);
        var pixels = new Uint8ClampedArray(width * height * 4);
        var maxColor = 0;

        //var imageData = new ImageData(width, height);s

        $.each(canvases,function(index, value) {
            canvasObjects[index] = new CanvasObject(value[0]);
        });

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {

                var color = mandel.mandelColor(x, y);
                if (color > maxColor) {
                    maxColor = color;
                }
                pixels[(y*width*4) + x*4] = color;
                pixels[(y*width*4) + x*4 + 1] = 0;
                pixels[(y*width*4) + x*4 + 2] = 0;
                pixels[(y*width*4) + x*4 + 3] = (255 % color) * 2;

                //$.each(canvasObjects, function(index, canvas) {
                    //var imageData = new ImageData(pixels, width, height);
                    //canvas.putImageData(imageData);
                  //  setTimeout(function(color) {
                        //console.log(canvas, x, y, color);
                        //canvas.putPixel(x, y, color);
                    //}, 1);
               //});
            }
        }

        if (width % x == 0) {
            var imageData = new ImageData(pixels, width, height);
            $.each(canvasObjects, function(index, canvas) {
                canvas.putImageData(imageData);
            });
        }


        var end = new Date().getTime();
        console.log('Done:' + (end - start));
        console.log('Max:' + maxColor);
    });
}());
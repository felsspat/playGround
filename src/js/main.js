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
            this.maxIteration = 85;
            this.xTemp = 0;

            while ((this.x * this.x + this.y * this.y) < 4 && this.iteration < this.maxIteration) {
                this.xTemp = this.x * this.x - this.y * this.y + this.x0;
                this.y = 2 * this.x * this.y + this.y0;
                this.x = this.xTemp;
                this.iteration++;

            }
            var color = new Color(this.iteration / this.maxIteration * 255, 0, 0);
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

        $.each(canvases,function(index, value) {
            canvasObjects[index] = new CanvasObject(value[0]);
        });

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {

                var color = mandel.mandelColor(x, y);

                $.each(canvasObjects, function(index, canvas) {
                    canvas.putPixel(x, y, color);
                });
            }
        }

        var end = new Date().getTime();
        console.log('Done:' + (end - start));
    });
}());
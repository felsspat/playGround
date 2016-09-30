(function () {
    'use strict';

    getPixelArray = function (r,g,b,a = 255) {
        var data = [];
        data[0] = r;
        data[1] = g;
        data[2] = b;
        data[3] = a;
        return data;
    };
}());
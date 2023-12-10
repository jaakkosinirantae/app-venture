/* filename: sophisticated_code.js */

// This JavaScript code performs a complex task of generating a Mandelbrot Fractal using the HTML5 canvas.

window.onload = function() {
  // Canvas setup
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var imageData = ctx.createImageData(width, height);
  var data = imageData.data;

  // Mandelbrot Fractal constants
  var maxIterations = 100;
  var escapeRadius = 4;
  var palette = [
    [66, 30, 15],
    [25, 7, 26],
    [9, 1, 47],
    [4, 4, 73],
    [0, 7, 100],
    [12, 44, 138],
    [24, 82, 177],
    [57, 125, 209],
    [134, 181, 229],
    [211, 236, 248],
    [241, 233, 191],
    [248, 201, 95],
    [255, 170, 0],
    [204, 128, 0],
    [153, 87, 0],
    [106, 52, 3]
  ];

  // Function to map values from one range to another
  function map(value, start1, stop1, start2, stop2) {
    return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  }

  // Function to calculate Mandelbrot set
  function calculateMandelbrot(x, y) {
    var real = map(x, 0, width, -2.5, 1);
    var imaginary = map(y, 0, height, -1, 1);

    var zx = 0;
    var zy = 0;
    var iteration = 0;

    while (zx * zx + zy * zy < escapeRadius && iteration < maxIterations) {
      var zxn = zx * zx - zy * zy + real;
      var zyn = 2 * zx * zy + imaginary;
      zx = zxn;
      zy = zyn;
      iteration++;
    }

    return iteration;
  }

  // Generate Mandelbrot Fractal
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      var iteration = calculateMandelbrot(x, y);

      if (iteration === maxIterations) {
        data[index] = 0;
        data[index + 1] = 0;
        data[index + 2] = 0;
        data[index + 3] = 255;
      } else {
        var color = palette[iteration % palette.length];
        data[index] = color[0];
        data[index + 1] = color[1];
        data[index + 2] = color[2];
        data[index + 3] = 255;
      }
    }
  }

  // Render Mandelbrot Fractal on the canvas
  ctx.putImageData(imageData, 0, 0);
};
 

// Please note that executing this code will require an HTML file with a canvas element with id "canvas".
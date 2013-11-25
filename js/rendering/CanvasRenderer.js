(function () {

  var ns = $.namespace("pskl.rendering");
  ns.CanvasRenderer = function (frame, zoom) {
    this.frame = frame;
    this.zoom = zoom;
    this.transparentColor_ = 'white';
  };

  /**
   * Decide which color should be used to represent transparent pixels
   * Default : white
   * @param  {String} color the color to use either as '#ABCDEF' or 'red' or 'rgb(x,y,z)' or 'rgba(x,y,z,a)'
   */
  ns.CanvasRenderer.prototype.drawTransparentAs = function (color) {
    this.transparentColor_ = color;
  };

  ns.CanvasRenderer.prototype.render = function  () {
    var canvas = this.createCanvas_();
    var context = canvas.getContext('2d');

    this.frame.forEachPixel(function (color, x, y) {
      this.renderPixel_(color, x, y, context);
    }.bind(this));

    return canvas;
  };

  ns.CanvasRenderer.prototype.renderPixel_ = function (color, x, y, context) {
    if(color == Constants.TRANSPARENT_COLOR) {
      color = this.transparentColor_;
    }
    context.fillStyle = color;
    context.fillRect(x * this.zoom, y * this.zoom, this.zoom, this.zoom);
  };

  ns.CanvasRenderer.prototype.createCanvas_ = function () {
    var width = this.frame.getWidth() * this.zoom;
    var height = this.frame.getHeight() * this.zoom;
    return pskl.CanvasUtils.createCanvas(width, height);
  };
})();
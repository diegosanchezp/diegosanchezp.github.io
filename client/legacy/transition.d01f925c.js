function cubicOut(t) {
  var f = t - 1.0;
  return f * f * f + 1.0;
}

function fly(node, _ref3) {
  var _ref3$delay = _ref3.delay,
      delay = _ref3$delay === void 0 ? 0 : _ref3$delay,
      _ref3$duration = _ref3.duration,
      duration = _ref3$duration === void 0 ? 400 : _ref3$duration,
      _ref3$easing = _ref3.easing,
      easing = _ref3$easing === void 0 ? cubicOut : _ref3$easing,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y,
      _ref3$opacity = _ref3.opacity,
      opacity = _ref3$opacity === void 0 ? 0 : _ref3$opacity;
  var style = getComputedStyle(node);
  var target_opacity = +style.opacity;
  var transform = style.transform === 'none' ? '' : style.transform;
  var od = target_opacity * (1 - opacity);
  return {
    delay: delay,
    duration: duration,
    easing: easing,
    css: function css(t, u) {
      return "\n\t\t\ttransform: ".concat(transform, " translate(").concat((1 - t) * x, "px, ").concat((1 - t) * y, "px);\n\t\t\topacity: ").concat(target_opacity - od * u);
    }
  };
}

var transition = {
  y: 200,
  duration: 500
};

export { fly as f, transition as t };

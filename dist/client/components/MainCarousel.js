"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainCarousel = function (_React$Component) {
	_inherits(MainCarousel, _React$Component);

	function MainCarousel() {
		_classCallCheck(this, MainCarousel);

		return _possibleConstructorReturn(this, (MainCarousel.__proto__ || Object.getPrototypeOf(MainCarousel)).apply(this, arguments));
	}

	_createClass(MainCarousel, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ id: "carouselExampleIndicators", className: "carousel slide", "data-ride": "carousel" },
				_react2.default.createElement(
					"div",
					{ className: "carousel-inner", role: "listbox" },
					_react2.default.createElement(
						"div",
						{ className: "carousel-item active" },
						_react2.default.createElement("img", { className: "d-block img-fluid", src: "#", "data-src": "/carouselbooks1.jpeg", alt: "First slide" })
					),
					_react2.default.createElement(
						"div",
						{ className: "carousel-item" },
						_react2.default.createElement("img", { className: "d-block img-fluid", src: "#", "data-src": "/carouselbooks2.jpeg", alt: "Second slide" })
					)
				),
				_react2.default.createElement(
					"a",
					{ className: "carousel-control-prev", href: "#carouselExampleIndicators", role: "button", "data-slide": "prev" },
					_react2.default.createElement("span", { className: "carousel-control-prev-icon", "aria-hidden": "true" }),
					_react2.default.createElement(
						"span",
						{ className: "sr-only" },
						"Previous"
					)
				),
				_react2.default.createElement(
					"a",
					{ className: "carousel-control-next", href: "#carouselExampleIndicators", role: "button", "data-slide": "next" },
					_react2.default.createElement("span", { className: "carousel-control-next-icon", "aria-hidden": "true" }),
					_react2.default.createElement(
						"span",
						{ className: "sr-only" },
						"Next"
					)
				)
			);
		}
	}]);

	return MainCarousel;
}(_react2.default.Component);

exports.default = MainCarousel;
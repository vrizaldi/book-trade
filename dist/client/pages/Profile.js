"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _Shelf = require("./Shelf");

var _Shelf2 = _interopRequireDefault(_Shelf);

var _ProfileSettings = require("./ProfileSettings");

var _ProfileSettings2 = _interopRequireDefault(_ProfileSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Profile = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		loggedIn: store.user.loggedIn
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Profile, _React$Component);

	function Profile() {
		_classCallCheck(this, Profile);

		return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
	}

	_createClass(Profile, [{
		key: "render",
		value: function render() {
			if (!this.props.loggedIn) {
				// redirect to home if not logged in
				return _react2.default.createElement(_reactRouterDom.Redirect, { to: "/" });
			}

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"h1",
					null,
					"#Profile"
				),
				_react2.default.createElement(
					_reactRouterDom.Switch,
					null,
					_react2.default.createElement(_reactRouterDom.Route, { path: "/profile/shelf", component: _Shelf2.default }),
					_react2.default.createElement(_reactRouterDom.Route, { path: "/profile/settings", component: _ProfileSettings2.default })
				)
			);
		}
	}]);

	return Profile;
}(_react2.default.Component)) || _class);
exports.default = Profile;
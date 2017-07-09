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

var _LoginForm = require("./LoginForm");

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _UserActions = require("../actions/UserActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		status: store.user.status,
		loggedIn: store.user.loggedIn,
		username: store.user.userData.username
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	}

	_createClass(Header, [{
		key: "login",
		value: function login() {
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;
			console.log("Logging in " + username + " with " + password);
			this.props.dispatch((0, _UserActions.login)(username, password));
		}
	}, {
		key: "signup",
		value: function signup() {
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;
			console.log("Signing up " + username + " with " + password);
			this.props.dispatch((0, _UserActions.signup)(username, password));
		}
	}, {
		key: "render",
		value: function render() {
			if (this.props.status == "fetching") {
				return _react2.default.createElement(
					"div",
					{ id: "over-all" },
					_react2.default.createElement(
						"p",
						null,
						"Fetching user data..."
					)
				);
			}

			return _react2.default.createElement(
				"header",
				null,
				"#header",
				this.props.loggedIn ? _react2.default.createElement(
					"p",
					null,
					"Hello,",
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ to: "/profile" },
						this.props.username
					)
				) : _react2.default.createElement(_LoginForm2.default, {
					login: this.login.bind(this),
					signup: this.signup.bind(this)
				})
			);
		}
	}]);

	return Header;
}(_react2.default.Component)) || _class);
exports.default = Header;
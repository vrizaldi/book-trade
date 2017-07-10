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

var _BioForm = require("../components/BioForm");

var _BioForm2 = _interopRequireDefault(_BioForm);

var _UserActions = require("../actions/UserActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfileSettings = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		userData: store.user.userData
	};
}), _dec(_class = function (_React$Component) {
	_inherits(ProfileSettings, _React$Component);

	function ProfileSettings() {
		_classCallCheck(this, ProfileSettings);

		return _possibleConstructorReturn(this, (ProfileSettings.__proto__ || Object.getPrototypeOf(ProfileSettings)).apply(this, arguments));
	}

	_createClass(ProfileSettings, [{
		key: "updateData",
		value: function updateData() {
			var fullName = document.getElementById("full-name").value;
			var city = document.getElementById("city").value;
			var state = document.getElementById("state").value;
			console.log(fullName + " lives in " + city + ", " + state);
			this.props.dispatch((0, _UserActions.updateBio)(this.props.userData.username, fullName, city, state));
		}
	}, {
		key: "render",
		value: function render() {
			var _props$userData = this.props.userData,
			    username = _props$userData.username,
			    fullName = _props$userData.fullName,
			    city = _props$userData.city,
			    state = _props$userData.state;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"h1",
					null,
					"Profile Settings"
				),
				_react2.default.createElement(_BioForm2.default, {
					username: username,
					fullName: fullName,
					city: city,
					state: state,
					action: this.updateData.bind(this)
				})
			);
		}
	}]);

	return ProfileSettings;
}(_react2.default.Component)) || _class);
exports.default = ProfileSettings;
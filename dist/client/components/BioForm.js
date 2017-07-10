"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _InputField = require("./InputField");

var _InputField2 = _interopRequireDefault(_InputField);

var _Button = require("./Button");

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BioForm = function (_React$Component) {
	_inherits(BioForm, _React$Component);

	function BioForm() {
		_classCallCheck(this, BioForm);

		return _possibleConstructorReturn(this, (BioForm.__proto__ || Object.getPrototypeOf(BioForm)).apply(this, arguments));
	}

	_createClass(BioForm, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_InputField2.default, { id: "username",
					className: "form-control form-control-lg",
					groupClassName: "form-group",
					label: "Username",
					value: this.props.username,
					disabled: true
				}),
				_react2.default.createElement(_InputField2.default, { id: "full-name",
					className: "form-control form-control-lg",
					groupClassName: "form-group",
					label: "Full Name",
					placeholder: this.props.fullName
				}),
				_react2.default.createElement(_InputField2.default, { id: "city",
					className: "form-control form-control-lg",
					groupClassName: "form-group",
					label: "City",
					placeholder: this.props.city
				}),
				_react2.default.createElement(_InputField2.default, { id: "state",
					className: "form-control form-control-lg",
					groupClassName: "form-group",
					label: "State",
					placeholder: this.props.state
				}),
				_react2.default.createElement(_Button2.default, { label: "Update!",
					className: "btn btn-success",
					action: this.props.action
				})
			);
		}
	}]);

	return BioForm;
}(_react2.default.Component);

exports.default = BioForm;
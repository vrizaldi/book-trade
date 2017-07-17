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

var _CollectionActions = require("../actions/CollectionActions");

var _UserActions = require("../actions/UserActions");

var _BookList = require("../components/BookList");

var _BookList2 = _interopRequireDefault(_BookList);

var _RequestList = require("../components/RequestList");

var _RequestList2 = _interopRequireDefault(_RequestList);

var _MainCarousel = require("../components/MainCarousel");

var _MainCarousel2 = _interopRequireDefault(_MainCarousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		userStatus: store.user.status,
		collectionStatus: store.collection.status,
		loggedIn: store.user.loggedIn,
		err: store.collection.err,
		username: store.user.userData.username,
		requests: store.user.userData.requests,
		requestNotifs: store.user.userData.requestNotifs,
		books: store.collection.books
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Home, _React$Component);

	function Home() {
		_classCallCheck(this, Home);

		return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
	}

	_createClass(Home, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.props.dispatch((0, _CollectionActions.fetchCollection)());
		}
	}, {
		key: "request",
		value: function request(bookID) {
			console.log(this.props.username + " is requesting " + bookID + "...");
			this.props.dispatch((0, _UserActions.request)(this.props.username, bookID));
		}
	}, {
		key: "cancelRequest",
		value: function cancelRequest(requestID) {
			console.log("Removing " + requestID + "...");
			this.props.dispatch((0, _UserActions.cancelRequest)(this.props.username, requestID));
		}
	}, {
		key: "render",
		value: function render() {
			console.log("loggedIn", this.props.loggedIn);
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement("img", { src: "/mainimg.jpeg", className: "d-block img-fluid" }),
				_react2.default.createElement(
					"div",
					{ id: "book-list-wrapper" },
					this.props.userStatus == "fetching" ? _react2.default.createElement(
						"p",
						null,
						"Fetching requests made by and for the user..."
					) : _react2.default.createElement(
						"div",
						null,
						_react2.default.createElement(_RequestList2.default, { title: "Your exchange requests",
							className: "btn btn-outline-danger",
							onClick: this.cancelRequest.bind(this),
							showSource: false,
							requests: this.props.requests
						}),
						_react2.default.createElement(_RequestList2.default, { title: "Requests",
							className: "btn",
							showSource: true,
							requests: this.props.requestNotifs
						})
					),
					this.props.collectionStatus == "fetching" ? _react2.default.createElement(
						"p",
						null,
						"Fetching collection..."
					) : _react2.default.createElement(_BookList2.default, { title: "Our current collection",
						books: this.props.books,
						buttonLabel: "Request exchange",
						buttonClassName: "btn btn-success",
						buttonAction: this.props.loggedIn ? this.request.bind(this) : ""
					})
				)
			);
		}
	}]);

	return Home;
}(_react2.default.Component)) || _class);
exports.default = Home;
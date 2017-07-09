"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

//import { fetchShelf } from "../shelf"


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _ShelfActions = require("../actions/ShelfActions");

var _NewBookForm = require("../components/NewBookForm");

var _NewBookForm2 = _interopRequireDefault(_NewBookForm);

var _BookList = require("../components/BookList");

var _BookList2 = _interopRequireDefault(_BookList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shelf = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		username: store.user.userData.username,
		books: store.shelf.books
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Shelf, _React$Component);

	function Shelf() {
		_classCallCheck(this, Shelf);

		return _possibleConstructorReturn(this, (Shelf.__proto__ || Object.getPrototypeOf(Shelf)).apply(this, arguments));
	}

	_createClass(Shelf, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			// load the books owned by the user
			//	this.props.dispatch(fetchShelf(username));
		}
	}, {
		key: "addBook",
		value: function addBook() {
			var title = document.getElementById("book-title").value;
			var author = document.getElementById("book-author").value;
			console.log("Adding " + title + " by " + author);
			this.props.dispatch((0, _ShelfActions.addBook)(this.props.username, title, author));
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_NewBookForm2.default, { addBook: this.addBook.bind(this) }),
				_react2.default.createElement(_BookList2.default, { books: this.props.books })
			);
		}
	}]);

	return Shelf;
}(_react2.default.Component)) || _class);
exports.default = Shelf;
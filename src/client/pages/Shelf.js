import React from "react";
import { connect } from "react-redux";

//import { fetchShelf } from "../shelf"
import { addBook } from "../actions/ShelfActions";
import NewBookForm from "../components/NewBookForm";
import BookList from "../components/BookList";

@connect((store) => {
	return {
		username: store.user.userData.username,
		books: store.shelf.books
	};
}) export default class Shelf extends React.Component {
	componentDidMount() {
		// load the books owned by the user
	//	this.props.dispatch(fetchShelf(username));
	}

	addBook() {
		const title = document.getElementById("book-title").value;
		const author = document.getElementById("book-author").value;
		console.log(`Adding ${title} by ${author}`);
		this.props.dispatch(addBook(this.props.username, title, author));
	}

	render() {
		return(
			<div>
				<NewBookForm addBook={this.addBook.bind(this)} />
				<BookList books={this.props.books} />
			</div>
		);
	}
}
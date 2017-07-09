import React from "react";
import { connect } from "react-redux";

import { fetchShelf, addBook, removeBook  } from "../actions/ShelfActions";
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
		this.props.dispatch(fetchShelf(this.props.username));
	}

	addBook() {
		const title = document.getElementById("book-title").value;
		const author = document.getElementById("book-author").value;
		console.log(`Adding ${title} by ${author}`);
		this.props.dispatch(addBook(this.props.username, title, author));
	}

	removeBook(bookID) {
		console.log(`Removing ${bookID}...`);
		this.props.dispatch(removeBook(this.props.username, bookID));
	}

	render() {
		return(
			<div>
				<NewBookForm addBook={this.addBook.bind(this)} />
				<BookList title="Your Collection" 
					books={this.props.books} 
					buttonAction={this.removeBook.bind(this)}
					buttonClassName="btn btn-danger"
					buttonLabel="Remove"		
				/>
			</div>
		);
	}
}
import React from "react";
import { connect } from "react-redux";

import { fetchCollection } from "../actions/CollectionActions";
import { request } from "../actions/UserActions";
import BookList from "../components/BookList";

@connect((store) => {
	return {
		status: store.collection.status,
		loggedIn: store.user.loggedIn,
		err: store.collection.err,
		username: store.user.userData.username,
		books: store.collection.books
	};
}) export default class Home extends React.Component {

	componentDidMount() {
		this.props.dispatch(fetchCollection());	
	}

	request(bookID) {
		console.log(`${this.props.username} is requesting ${bookID}...`);
		this.props.dispatch(request(this.props.username, bookID));
	}

	render() {
		return(
			<div>
				<h1>#Home</h1>
				{
					this.props.status == "fetching" ? (
						<p>Fetching collection</p>
					) : (
						<BookList title="Our current collection" 
							books={this.props.books} 
							buttonLabel="Request exchange"
							buttonClassName="btn btn-succes"
							buttonAction={this.props.loggedIn ? 
								this.request.bind(this) : ""}
						/>
					)
				}
			</div>
		);
	}
}
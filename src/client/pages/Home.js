import React from "react";
import { connect } from "react-redux";

import { fetchCollection } from "../actions/CollectionActions";
import { request, cancelRequest } from "../actions/UserActions";
import BookList from "../components/BookList";
import RequestList from "../components/RequestList";
import MainCarousel from "../components/MainCarousel";

@connect((store) => {
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
}) export default class Home extends React.Component {

	componentDidMount() {
		this.props.dispatch(fetchCollection());	
	}

	request(bookID) {
		console.log(`${this.props.username} is requesting ${bookID}...`);
		this.props.dispatch(request(this.props.username, bookID));
	}

	cancelRequest(requestID) {
		console.log(`Removing ${requestID}...`);
		this.props.dispatch(cancelRequest(this.props.username, requestID));
	}

	render() {
		console.log("loggedIn", this.props.loggedIn);
		return(
			<div>
				<img src="/mainimg.jpeg" className="d-block img-fluid"/>

				<div id="book-list-wrapper">
					{
						this.props.userStatus == "fetching" ? (
							<p>Fetching requests made by and for the user...</p>
						) : (
							<div>
								<RequestList title="Your exchange requests"
									className="btn btn-outline-danger"
									onClick={this.cancelRequest.bind(this)}
									showSource={false}
									requests={this.props.requests}
								/>
								<RequestList title="Requests"
									className="btn"
									showSource={true}
									requests={this.props.requestNotifs}
								/>
							</div>
						)
					}

					{
						this.props.collectionStatus == "fetching" ? (
							<p>Fetching collection...</p>
						) : (
							<BookList title="Our current collection" 
								books={this.props.books} 
								buttonLabel="Request exchange"
								buttonClassName="btn btn-success"
								buttonAction={this.props.loggedIn ? 
									this.request.bind(this) : ""}
							/>
						)
					}
				</div>
			</div>
		);
	}
}
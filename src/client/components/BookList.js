import React from "react";

export default class BookList extends React.Component {
	render() {
		return(
			<div>
				<h2>Your Collection</h2>
				{
					// list the books
					this.props.books.map((book) => {
						return(
							<div>
								<img src={book.imageurl} alt={"Cover of " + book.title}/>
								<h4>{book.title}</h4>
							</div>
						);
					})
				}
			</div>
		);
	}
}
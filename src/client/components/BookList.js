import React from "react";

import Button from "./Button";

export default class BookList extends React.Component {
	render() {
		return(
			<div>
				<h2>{this.props.title}</h2>
				{
					// list the books
					this.props.books.map((book) => {
						return(
							<div>
								<img src={book.imageurl} alt={"Cover of " + book.title}/>
								<h4>{book.title}</h4>
								<Button className={this.props.buttonClassName} 
									label={this.props.buttonLabel}
									action={this.props.buttonAction}
									value={book._id}
								/>
							</div>
						);
					})
				}
			</div>
		);
	}
}
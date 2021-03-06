import React from "react";

import Button from "./Button";

export default class BookList extends React.Component {
	render() {
		return(
			<div>
				<h2>{this.props.title}</h2>
				<div id="book-list">
					{
						// list the books
						this.props.books.map((book) => {
							return(
								<div className="books card">
									<img src={book.imageurl} alt={"Cover of " + book.title}/>
									<div className="card-block">
										<h4 className="card-title book-title">{book.title}</h4>
									</div>
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
			</div>
		);
	}
}
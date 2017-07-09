import React from "react";

import InputField from "./InputField";
import Button from "./Button";

export default class NewBookForm extends React.Component {
	render() {
		return(
			<div>
				<InputField id="book-title"
					label="Title:"
				/>
				<InputField id="book-author"
					label="Author: "
				/>
				<Button 
					label="+"
					action={this.props.addBook}
				/>
			</div>
		);
	}
}
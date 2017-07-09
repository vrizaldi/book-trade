import React from "react";

import InputField from "./InputField";
import Button from "./Button";

export default class LoginForm extends React.Component {
	render() {
		return(
			<div>
				<InputField id="username"
					placeholder="Username" 
				/>
				<InputField id="password"
					placeholder="Password"
					type="password" 
				/>
				<Button 
					action={this.props.login}
					label="Login"
				/>
				<Button 
					action={this.props.signup}
					label="Sign up"
				/>
			</div>
		);
	}
}
import React from "react";

import InputField from "./InputField";
import Button from "./Button";

export default class LoginForm extends React.Component {
	render() {
		return(
			<div className="form-inline">
				<InputField id="username"
					maxlength="13"
					placeholder="Username" 
				/>
				<InputField id="password"
					placeholder="Password"
					maxlength="13"
					type="password" 
				/>
				<Button className="btn btn-primary"
					action={this.props.login}
					label="Login"
				/>
				<Button className="btn btn-success"
					action={this.props.signup}
					label="Sign up"
				/>
			</div>
		);
	}
}
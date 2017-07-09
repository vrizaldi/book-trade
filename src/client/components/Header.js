import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import LoginForm from "./LoginForm";
import { login, signup } from "../actions/UserActions";

@connect ((store) => {
	return {
		status: store.user.status,
		loggedIn: store.user.loggedIn,
		username: store.user.userData.username
	};
}) export default class Header extends React.Component {
	
	login() {
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;
		console.log(`Logging in ${username} with ${password}`);
		this.props.dispatch(login(username, password));
	}

	signup() {
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;
		console.log(`Signing up ${username} with ${password}`);
		this.props.dispatch(signup(username, password));
	}

	render() {
		if(this.props.status == "fetching") {
			return(
				<div id="over-all">
					<p>Fetching user data...</p>
				</div>
			);
		}

		return(
			<header>
				#header
				{
					this.props.loggedIn ? (
						<p>Hello, 
							<Link to="/profile">{this.props.username}</Link>
						</p>
					)	: (
						<LoginForm 
							login={this.login.bind(this)} 
							signup={this.signup.bind(this)} 
						/>
					)
				}
				
			</header>
		);
	}
}
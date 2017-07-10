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
					<div id="over-all-text"><p>Fetching user data...</p></div>
				</div>
			);
		}

		return(
			<header className="navbar fixed-top">
				<div className="row">
					<div id="logo" className="col-md-2">
						#header
					</div>
					<div className="col-md-10">
						{
							this.props.loggedIn ? (
								<div className="nav nav-fill row"> 
									<Link className="nav-link" to="/">Home</Link>
									<Link className="nav-link" to="/profile/shelf">Manage Library</Link>
									<Link className="nav-link" to="/profile/settings">
										Settings</Link>
								</div>
							)	: (
								<LoginForm 
									login={this.login.bind(this)} 
									signup={this.signup.bind(this)} 
								/>
							)
						}
					</div>
				</div>
			</header>
		);
	}
}
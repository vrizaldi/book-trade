import React from "react";
import { connect } from "react-redux";

@connect((store) => {
	return {
		status: store.user.status,
		loggedIn: store.user.loggedIn,
		userData: store.user.userData
	};
}) export default class Profile extends React.Component {
	render() {
		return(
			<div>
				<h1>#Profile</h1>
			</div>
		);
	}
}
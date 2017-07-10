import React from "react";
import { connect } from "react-redux";

import BioForm from "../components/BioForm";
import { updateBio } from "../actions/UserActions";

@connect((store) => {
	return {
		userData: store.user.userData
	}
}) export default class ProfileSettings extends React.Component {
	
	updateData() {
		var fullName = document.getElementById("full-name").value;
		var city = document.getElementById("city").value;
		var state = document.getElementById("state").value;
		console.log(`${fullName} lives in ${city}, ${state}`);
		this.props.dispatch(updateBio(this.props.userData.username, fullName, city, state));
	}

	render() {
		const { username, fullName, city, state} = this.props.userData;
		return(
			<div>
				<h1>Profile Settings</h1>
				<BioForm 
					username={username}
					fullName={fullName}
					city={city}
					state={state}
					action={this.updateData.bind(this)} 
				/>
			</div>
		);
	}
}
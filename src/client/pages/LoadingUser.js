import React from "react";
import { connect } from "react-redux"; 

@connect((store) => {
	return {
		status: store.user.status
	}
}) export default class LoadingUser extends React.Component {
	render() {
		return(
			<div>
				<h1>#LoadingUser</h1>
			</div>
		);
	}
}
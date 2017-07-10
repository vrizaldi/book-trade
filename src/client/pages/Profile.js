import React from "react";
import { connect } from "react-redux";
import { Redirect, Switch, Route, IndexRoute } from "react-router-dom";

import Shelf from "./Shelf";
import ProfileSettings from "./ProfileSettings";

@connect((store) => {
	return {
		loggedIn: store.user.loggedIn
	};
}) export default class Profile extends React.Component {
	render() {
		if(!this.props.loggedIn) {
			// redirect to home if not logged in
			return(<Redirect to="/" />);
		}

		return(
			<div>
				<h1>#Profile</h1>
				<Switch>
					<Route path="/profile/shelf" component={Shelf} />
					<Route path="/profile/settings" component={ProfileSettings} />
				</Switch>
			</div>
		);
	}
}
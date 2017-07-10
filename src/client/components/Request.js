import React from "react";

import Button from "./Button";

export default class Request extends React.Component {
	render() {
		console.log("request", this.props.request);
		const { _id, title, requester, requesterCity } = this.props.request;

		console.log("props", this.props.request);
		const extra = " from " + requester 
			+ (requesterCity == "" ? "" : " in " + requesterCity)
		const label = title + (this.props.showSource ? extra : "");
			

		return(
			<div>
				<Button className={this.props.className} 
					action={this.props.onClick}
					label={label}
					value={_id}
				/>
			</div>
		);
	}
}
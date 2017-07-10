import React from "react";

import InputField from "./InputField";
import Button from "./Button";

export default class BioForm extends React.Component {
	render() {
		return(
			<div>
				<InputField id="username"
					className="form-control form-control-lg"
					groupClassName="form-group"
					label="Username"
					value={this.props.username}
					disabled={true}
				/>
				<InputField id="full-name"
					className="form-control form-control-lg"
					groupClassName="form-group"
					label="Full Name"
					placeholder={this.props.fullName}
				/>
				<InputField id="city"
					className="form-control form-control-lg"
					groupClassName="form-group"
					label="City"
					placeholder={this.props.city}
				/>
				<InputField id="state"
					className="form-control form-control-lg"
					groupClassName="form-group"
					label="State"
					placeholder={this.props.state}
				/>
				<Button label="Update!"
					className="btn btn-success"
					action={this.props.action}
				/>
			</div>
		);
	}
}
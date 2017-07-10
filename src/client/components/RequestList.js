import React from "react";

import Request from "./Request";

export default class RequestList extends React.Component {
	render() {
		return(
			<div>
				<h4>{this.props.title + "(" + (this.props.requests ? this.props.requests.length : 0) + ")"}</h4>
				{
					this.props.requests.map((request) => {
						return(<Request className={this.props.className}
							onClick={this.props.onClick}
							showSource={this.props.showSource} 
							request={request}/>);
					})
				}
			</div>
		);
	}
}
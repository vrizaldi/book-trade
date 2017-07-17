import React from "react";

export default class MainCarousel extends React.Component {

	render() {
		return(
			<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
			  <div className="carousel-inner" role="listbox">
			    <div className="carousel-item active">
			      <img className="d-block img-fluid" src="#" data-src="/carouselbooks1.jpeg" alt="First slide"/>
			    </div>
			    <div className="carousel-item">
			      <img className="d-block img-fluid" src="#" data-src="/carouselbooks2.jpeg" alt="Second slide"/>
			    </div>
			  </div>
			  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
			    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span className="sr-only">Previous</span>
			  </a>
			  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
			    <span className="carousel-control-next-icon" aria-hidden="true"></span>
			    <span className="sr-only">Next</span>
			  </a>
			</div>
		);
	}
}
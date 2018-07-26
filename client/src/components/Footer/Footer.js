import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<div>
			<div className="footer-top ">
				<div className="container">
					<div className="row">
						<div className="col-md-3 footer-about wow fadeInUp">
							<p>
								Claude Wang
		        			</p>
							<p><a>Our Team</a></p>
						</div>
						<div className="col-md-4 offset-md-1 footer-contact wow fadeInDown">
							<h3>Contact</h3>
							<p><i className="fas fa-map-marker-alt"></i> 1631 N 1st St s200, San Jose CA 95112</p>
							<p><i className="fas fa-phone"></i> Phone: (408)571-6516</p>
							<p><i className="fas fa-envelope"></i> Email: <a href="mailto:hello@domain.com">usj@usjus.edu</a></p>
						</div>
						<div className="col-md-4 footer-links wow fadeInUp">
							<div className="row">
								<div className="col">
									<h3>Links</h3>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<p><a className="scroll-link" href="#top-content">Home</a></p>
									<p><a >Features</a></p>
									<p><a >How it works</a></p>
									<p><a >Our clients</a></p>
								</div>
								<div className="col-md-6">
									<p><a >Plans &amp; pricing</a></p>
									<p><a >Affiliates</a></p>
									<p><a >Terms</a></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container">
					<div className="row">
						<div className="col-md-6 footer-copyright">
							&copy; by <a href="https://google.com">Claude Universtiy</a>
						</div>
						<div className="col-md-6 footer-social">
							<a ><i className="fab fa-facebook-f"></i></a>
							<a ><i className="fab fa-twitter"></i></a>
							<a ><i className="fab fa-google-plus-g"></i></a>
							<a ><i className="fab fa-instagram"></i></a>
							<a ><i className="fab fa-pinterest"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer;
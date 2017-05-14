var React = require('react')


var Nav = React.createClass({
	render: function() {
		return (
			<div >
			<nav id = "menu" className="navbar navbar-default">

			  <div className="container">
			    <div className="navbar-header">
			      <a className="navbar-brand" href="#">aglb.</a>
			    </div>
			    <ul className="nav navbar-nav">
{/*
			      <li><a href="#">Page 1</a></li>
			      <li><a href="#">Page 2</a></li>
			      <li><a href="#">Page 3</a></li>
			      <li className="active"><a href="#">Home</a></li>
*/}
			    </ul>
			  </div>
			</nav>
			</div>
		)
	}

});

module.exports = Nav;



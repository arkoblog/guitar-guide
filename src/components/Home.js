var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

// Load Components

// var MyMap = require('./Maps')


var Home = React.createClass({
    getInitialState: function() {
        return {}
    },
    componentDidMount: function() {},
    render: function() {
        return (
            <div>
            <h1> Hello! </h1>
			         </div>
        )
    }
})

module.exports = Home;

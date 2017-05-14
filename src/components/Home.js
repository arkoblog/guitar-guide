var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var _ = require('lodash')
var VF = require('vexflow').Flow;
var d3 = require('d3');


require('../css/nav.css')
require('../css/home.css')

// Load Components
var Nav = require('./Nav')
var Metronome = require('./Metronome')
    // var MyMap = require('./Maps')

var Tabs = React.createClass({
    componentDidMount: function() {
        // var maxWindowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        this.renderStave();
    },
    componentDidUpdate: function() {
        // d3.selectAll("svg > *").remove()
        var a = "#" +this.props.id
        $(a).empty()
        this.renderStave();

    },
    renderStave: function() {

        var data = this.props.data
        var notes = data.split("-")
        // Create an SVG renderer and attach it to the DIV element named "boo".
        var div = document.getElementById(this.props.id)
        var width = div.offsetWidth;
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        // Configure the rendering context.
        renderer.resize(width, 90);
        var context = renderer.getContext();
        context.setFont("Arial", 8, "").setBackgroundFillStyle("#fff");

        // Create a stave of width 400 at position 10, 40 on the canvas.
        var stave = new VF.TabStave(0, -40, width-30);

        // Add a clef and time signature.
        stave.addClef("tab").setContext(context).draw();


        // console.log(data.split("-"));

        var myNotes = []
        for(var j = 6; j>=1; j--) {
            console.log("J",j)    
            notes.map(function(i){
                var a = new VF.TabNote({
                positions: [{ str: j, fret: i }],
                duration: "q"
                })

                myNotes.push(a)
            })
        }

        for(var k = 2; k<=6; k++) {
            notes.map(function(i){
                var a = new VF.TabNote({
                positions: [{ str: k, fret: i }],
                duration: "q"
                })

                myNotes.push(a)
            })
        }

        console.log(myNotes);
        VF.Formatter.FormatAndDraw(context, stave, myNotes);

        // Connect it to the rendering context and draw!
        // stave.setContext(context).draw();
    },
    render: function() {

        return (<div className = "row">
                <div className = "col-md-12" >
                    <h4>Pattern #{this.props.id+1}: {this.props.data}</h4>
                </div>
                <div className = "col-md-12" id={this.props.id}></div>
                    </div>)
    }
})

var Home = React.createClass({
    getInitialState: function() {
        return {
            zappa_24: ['1-2-3-4', '2-3-4-1', '3-4-2-1', '4-1-2-3', '1-2-4-3', '2-4-3-1', '4-3-1-2', '3-1-2-4', '1-3-2-4', '3-2-4-1', '2-4-1-3', '4-1-3-2', '1-3-4-2', '3-4-2-1', '4-2-1-3', '2-1-3-4', '1-4-2-3', '4-2-3-1', '2-3-1-4', '3-1-4-2', '1-4-3-2', '4-3-2-1', '3-2-1-4', '2-1-4-3'],
            finalFour: ['1-2-3-4', '2-3-4-1', '3-4-1-2', '4-1-2-3']
        }
    },
    _generateFourZappas: function() {
        // console.log(VF)
        var length = this.state.zappa_24.length;
        var total = 4

        function getRandomArbitrary(min, max) {
            var random = Math.random() * (max - min) + min;
            // console.log(Math.floor(random))
            return random;
        }

        function generateRandomArray(total) {
            var arr = []
            for (var i = 0; i < total; i++) {
                var a = Math.floor(getRandomArbitrary(0, length));
                arr.push(a)
            }
            return arr;
        }

        var newArr = generateRandomArray(total)
        do {
            var mylength = _.uniq(newArr).length
                // console.log("Length", mylength)
            var newArr = generateRandomArray(total)
        } while (mylength < 4);

        var finalFour = []
        newArr.map(function(item) {
            // console.log(item)
            finalFour.push(this.state.zappa_24[item])
                // console.log(this.state.zappa_24[item])
        }.bind(this));

        this.setState({
            finalFour: finalFour
        })
        console.log(finalFour)
    },
    componentDidMount: function() {},
    render: function() {
        var Tablatures = this.state.finalFour.map(function(item, i){
            return <Tabs data = {item} id={i}/>
        })

        return (
            <div>
                <Nav/>
                <div className = "container">
                    <div className= "row">
                        <div className = "col-md-10">
                            <h2>Routine 1: Finger Independence</h2>
                            <p>We start our practice with the basic spider exercise bundle. Let's try and keep in mind the Zappa24 combo. Here's a picture of the same: </p>
                            <img className="img-responsive" src="https://raw.githubusercontent.com/arkoblog/guitar-guide/master/src/img/zappa-24.png"></img>

                            <h4>Exercise #1 : Pattern of Four</h4>
                            <p>This is pretty straightforward, repeat each and every combination, starting from the low E string all the way to the high E string and then make your way back to the top. We do this twice for every combination.</p>
                            <p>Click the button provided to generate four random combinations. You can also use the metronome provided for your reference:</p>
                            <div className = "jumbotron clearfix">
                                <div className="col-md-6">
                                
                                    <h4> Metronome </h4>
                                    <Metronome/>
                                </div>
                                <div className="col-md-6">
                                    <h4>Generate the four patterns</h4>
                                    <p>By default, we have selected the first four patterns of the Zappa 24 for you!</p>
                            
                                     <button onClick = {this._generateFourZappas}>Generate Now!</button>
                                </div>
                            </div>

                            {Tablatures}
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Home;

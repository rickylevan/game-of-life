var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
require('./index.css');

var N = 5;
class App extends React.Component {
  constructor() {
    super();
    this.state.vals = new Array(N).fill(new Array(N).fill(true));
  }

  toggle(idx, idy) {
    var cpy = this.state.vals.slice();
    cpy[idx][idy] = !cpy[idx][idy];
    this.setState({vals: cpy});
  }

  render() {
    return (
      <h1> Hi! </h1>
    )
  }
}

function Bit(props) {
  var colorTrue = "#ffffff";
  var colorFalse = "#000000";

  return (
    <div 
      style={{"backgroundColor": this.props.val ? colorTrue : colorFalse}}
      onClick={props.f}
    />
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);




var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
require('./index.css');

class App extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Bit/><Bit/>
        </tr>
        <tr>
          <Bit/><Bit/>
        </tr>
      </table>
    )
  }
}

class Bit extends React.Component {

  constructor() {
    super();
    this.state = {val: true}
  }

  render() {
    var colorTrue = "#ffffff";
    var colorFalse = "#000000";

    return (
      <td 
        style={{"backgroundColor": this.state.val ? colorTrue : colorFalse}}
        onClick={(() => this.setState({val: !this.state.val})).bind(this)}
      />
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);




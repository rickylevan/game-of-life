var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
require('./index.css');

                /*return <Bit 
                  val={this.state.vals[idx][idy]}
                  f={this.toggle.bind(this).bind(null, idx, idy)}
                />*/



var N = 5;
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      vals: new Array(N).fill(new Array(N).fill(true))
    }

    console.log(this.state.vals);
  }

  toggle(idx, idy) {
    var cpy = this.state.vals.slice();
    cpy[idx][idy] = !cpy[idx][idy];
    this.setState({vals: cpy});
  }

  render() {
    return (
      <table>
        {this.state.vals.map((val, idx) => {
            <tr>
              {val.map((_, idy) => {
                <Bit 
                  val={this.state.vals[idx][idy]}
                  f={this.toggle.bind(this).bind(null, idx, idy)}
                />
              })}
            </tr>
        })}
      </table>
    )
  }
}

function Bit(props) {
  var colorTrue = "#ffffff";
  var colorFalse = "#000000";

  return (
    <td 
      style={{"backgroundColor": props.val ? colorTrue : colorFalse}}
      onClick={props.f}
    />
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);




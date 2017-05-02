var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
require('./index.css');

                /*return <Bit 
                  val={this.state.vals[idx][idy]}
                  f={this.toggle.bind(this).bind(null, idx, idy)}
                />*/



var M = 5;
var N = 4;
class App extends React.Component {
  constructor() {
    super();

    var arr  = [];
    for (var i = 0; i < M; i++) {
      var tmp = [];
      for (var j = 0; j < N; j++) {
        tmp.push(true);
      }
      arr.push(tmp);
    }


    this.state = {
      vals: arr
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
        {this.state.vals.map((val, idx) => (
          <tr key={idx}>
            {val.map((item, idy) => (
              <Bit 
                val={item} 
                f={this.toggle.bind(this)}
                key={idy}
                idx={idx}
                idy={idy}
              />
            ))}
          </tr>
        ))}
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
      onClick={props.f.bind(null, props.idx, props.idy)}
    />
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);




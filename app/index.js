import TimerMixin from 'react-timer-mixin';
var reactMixin = require('react-mixin');

var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
require('./index.css');

                /*return <Bit 
                  val={this.state.vals[idx][idy]}
                  f={this.toggle.bind(this).bind(null, idx, idy)}
                />*/



var M = 3;
var N = 3;
var bConst = 1.9;


var test = [[false, false, false], [false, true, true], [true, true, true]];


// [][]bool -> [][]float64
function score(init) {

    var i, j, k, l;

    // initialize numGrid
    var numGrid= [];
    for (i = 0; i < M; i++) {
      var tmp = [];
      for (j = 0; j < N; j++) {
        tmp.push(0.0);
      }
      numGrid.push(tmp);
    }

    for (i = 0; i < M; i++) {
      for (j = 0; j < N; j++) {
        for (k = 0; k < M; k++) {
          for (l = 0; l < N; l++ ) {
            var xdiff = Math.abs(i-k)
            var ydiff = Math.abs(j-l)
            if (xdiff <= 1 && ydiff <= 1) {
              if (init[i][j] && init[k][l]) {
                numGrid[i][j] += 1.0;
              } else if ((!init[i][j]) && init[k][l]) {
                numGrid[i][j] += bConst;
              }
            }
          }
        }
      }
    }

    return numGrid
}



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

    console.log('TESTING');
    console.log(test);
    console.log(score(test));
  }

  toggle(idx, idy) {
    var cpy = this.state.vals.slice();
    cpy[idx][idy] = !cpy[idx][idy];
    this.setState({vals: cpy});
  }

  toggleAll() {
    for (var i = 0; i < M; i++) {
      for (var j = 0; j < N; j++) {
        this.toggle(i, j);
      }
    }
  }

  componentDidMount() {
    this.setInterval(
      () => { this.toggleAll(); },
      2000
    )
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

reactMixin(App.prototype, TimerMixin);

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




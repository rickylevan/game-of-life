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

var M = 61;
var N = 61;
var bConst = 1.9;


//var test = [[false, false, false], [false, true, true], [true, true, true]];


// [][]bool -> [][]float64
// Use the cooperator and defector logic from CAAM 210 to assign
// a score to each square. Intermediate step in state transition
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

// [][]bool, [][]float64 -> [][]bool
function nextState(init, numGrid) {
    var i, j, k, l;

    // initialize out
    var out = [];
    for (i = 0; i < M; i++) {
      var tmp = [];
      for (j = 0; j < N; j++) {
        tmp.push(false); // arbitrary, will be overwritten
      }
      out.push(tmp);
    }


    for (i = 0; i < M; i++) {
      for (j = 0; j < N; j++) {
        var argMax = {x: i, y: j};
        for (k = 0; k < M; k++) {
          for (l = 0; l < N; l++ ) {
            var xdiff = Math.abs(i-k)
            var ydiff = Math.abs(j-l)
            if (xdiff <= 1 && ydiff <= 1) {
              if (numGrid[k][l] > numGrid[argMax.x][argMax.y]) {
                argMax = {x: k, y: l};
              }
            }
          }
        }
          out[i][j] = init[argMax.x][argMax.y]
      }
    }

    return out
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

    var p = Math.floor(N/2);
    arr[p][p] = false;


    this.state = {
      vals: arr
    }

  }

  toggle(idx, idy) {
    var cpy = this.state.vals.slice();
    cpy[idx][idy] = !cpy[idx][idy];
    this.setState({vals: cpy});
  }


  componentDidMount() {
    this.setInterval(
      () => {this.setState({vals: nextState(this.state.vals.slice(),
                                            score(this.state.vals.slice())
                                           
              )});},
      200
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




var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
require('./index.css');

class App extends React.Component {
  render() {
    var words = ["hey", "ricky", "you", "so", "fine"];
    return (
      <div>
      <Romeo romeoText={words}/>
      <table>
<tr><td/><td/><td/></tr>
<tr><td/><C3 msg='boobs'/><td/></tr>
<tr><C3 msg='tits' /><C3 msg='boobies'/><C3 msg='ass'/></tr>
</table>
      </div>
    )
  }
}



class C3 extends React.Component {
  render() {
    if (this.props.msg === "boobs") {
      console.log('found boobs!');
      return <td style={{"backgroundColor": "#ff0000"}} />
    } else {
      return <td 
        onClick={() => console.log(this.props.msg)}
        style={{"backgroundColor": "#0000ff"}}
      />
    }
  }
}

function wordMap(words) {
  return words.map(function(word) {
    return (
      <div> {word} </div>
    )
  })
}

class Romeo extends React.Component {
  render() {
    return (
      wordMap(this.props.romeoText)
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);




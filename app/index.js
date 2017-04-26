var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
require('./index.css');

class App extends React.Component {
  render() {
    return (
      <Romeo romeoText="hi ricky, you so fine. fo sho"/>
    )
  }
}


class Romeo extends React.Component {
  render() {
    return (
      <div> {this.props.romeoText} </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);


Romeo.propTypes = {
  romeoText: PropTypes.string.isRequired
}

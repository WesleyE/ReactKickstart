import React from 'react';
import ReactDOM from 'react-dom';

console.log('RELOAD');
console.log(APPCONFIG);

class Hello extends React.Component {
  render() {
    return <h1>Hello!</h1>
  }
}

ReactDOM.render(<Hello />, document.getElementById('container'));

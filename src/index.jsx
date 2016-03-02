import React from 'react';
import ReactDOM from 'react-dom';

// Include the main style
import './styles/main.scss'

//console.log(APPCONFIG);

class Hello extends React.Component {
  render() {
    return <div className='startDiv'><h1>Hello!</h1></div>
  }
}

ReactDOM.render(<Hello />, document.getElementById('container'));

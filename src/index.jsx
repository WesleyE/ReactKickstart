import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';

// Include the main style
import './styles/main.scss'

// This will be injected into the app
// console.log(APPCONFIG);

class Hello extends React.Component {
  render() {
    return <div className='startDiv'><h1>React Kickstart!</h1><br/><Button bsStyle="primary">This is a Bootstrap button</Button></div>
  }
}

ReactDOM.render(<Hello />, document.getElementById('container'));

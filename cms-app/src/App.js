import React, { Component } from 'react';
import css from './App.css'

class App extends Component {
  constructor () {
    super();
    this.state = {
        timemaps: [],
        selectedMap: null
    };
  }

  componentDidMount () {
    fetch('/api/v1/timemap/1/').then(response => {
      response.json().then(json => {
          this.setState({timemaps: [json]})
      });
    });
  }

  render () {
    return (
      <div id='footer-wrapper' className='footerWrapper'>
        <header className='style1'>
          <h2>TimeMapper CMS</h2>
        </header>
        <div className='row'>
            <div className='3u'>
                hello
            </div>
            <div className='9u'>
                world
            </div>
        </div>
      </div>
    );
  }
}

export default App;

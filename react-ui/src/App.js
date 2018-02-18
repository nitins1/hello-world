import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Info } from './Info';
import { Searchbar } from './Searchbar';
import { Unsplash } from './Unsplash';
import { UnsplashUser } from './UnsplashUser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
    return (
      <div className="App">
        <Searchbar errorClass={this.state.errorClass} onSubmit={this.changeLocation} onClick={this.changeLocation}/>
        <UnsplashUser
        userProfileLink={this.state.userProfileLink}
        userProfileImage={this.state.userProfileImage}
        userFirstName={this.state.userFirstName}>
        </UnsplashUser>
        <Unsplash
          currentCityImage={this.state.currentCityImage}>
        </Unsplash>
        <p className="App-intro">
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>
      </div>
    );
  }
}

export default App;

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      states: [],
      stateName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  //Handles what happens once user selects "Submit"
  handleChange(event) {
    this.setState({ stateName: event.target.value })
  }

  handleSubmit(event) {
    alert('Name is ' + this.state.stateName)
    event.preventDefault(); //Stops page from refreshing once submit is clicked
  }

  //Function that loads page
  componentDidMount() {
    fetch('http://localhost:9000/homepage', {
      'method': 'GET',
      headers: {
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        'x-rapidapi-key': 'a9e6f4bf49msh62b7508fc86ea21p1b8fa8jsnde25c251bc62',
        useQueryString: true
      }
    })
      .then(res => res.json())
      .then(data => { this.setState({ states: data.countryDataToJSON[0].provinces }) })
      .then(stateObj => console.log('State name is ' + this.state.stateName))
  }

  componentDidUpdate() {
    console.log('Updated version of state name: ' + this.state.stateName)


  }

  render() {
    return (
      <div>
        <div id="searchTool">
          <h2 >Search State Data:</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.stateName} onChange={this.handleChange}></input>
            <input type="submit" ></input>
          </form>
        </div>

        <ul>
          {this.state.states.map(element => {
            return <div>
              <li> {element.province}</li>
              <li> {element.confirmed}</li>
              
            </div>
          })}
        </ul>
      </div>
    );
  }
}


// function GetAllStates() {
//   fetch('http://localhost:9000/homepage', {
// 'method': 'GET',
// headers: {
// 'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
// 'x-rapidapi-key': 'a9e6f4bf49msh62b7508fc86ea21p1b8fa8jsnde25c251bc62',
// useQueryString: true

// }
// })
// .then(res => res.json())
// .then(data => {this.setState({ states: data.countryDataToJSON[0].provinces})})

// }

export default Search;

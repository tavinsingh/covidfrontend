import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      states: [],
      requestedStateName: '',
      interestedStateObjs: [],
      interestedStateObj: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  
  handleChange(event) {
    this.setState({ requestedStateName: event.target.value })
  }

//Handles what happens once user selects "Submit"
  handleSubmit(event) {
    //Querying states for state user specified 
    this.state.states.map(element => {
      if (element.province.toLowerCase() === this.state.requestedStateName.toLowerCase()) {
        this.setState({ interestedStateObj: element})
        this.setState({interestedStateObjs: this.state.interestedStateObjs + this.state.interestedStateObj})
      }
       
    })
    console.log(this.state.interestedStateObj)
    console.log(this.state.interestedStateObjs)

    
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

  }
  //Updates the table if user selects new state
  // componentDidUpdate() {

  // }

  render() {
    return (
      <div>
        <div id="searchTool">
          <h2 >Covid-19 Data by Province:</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Enter Province" value={this.state.requestedStateName} onChange={this.handleChange}></input>
            <input type="submit" ></input>
          </form>
        </div>
        <table>
          <tr>
            <th>Province</th>
            <th>Confirmed</th>
            <th>Recovered</th>
            <th>Deaths</th>
            <th>Active</th>
          </tr>
          {/* <tr>
            <th>{this.state.interestedStateObj.province}</th> 
            <th>{this.state.interestedStateObj.confirmed}</th>
            <th>{this.state.interestedStateObj.recovered}</th>
            <th>{this.state.interestedStateObj.deaths}</th>
            <th>{this.state.interestedStateObj.active}</th>
          </tr> */}
        </table>
      </div>
    )
  }
}

export default Search;

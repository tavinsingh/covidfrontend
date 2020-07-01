import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      provinces: [],
      provinceInput: '',
      selectedProvincesArray: [],
      provinceObj: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  
  handleChange(event) {
    this.setState({ provinceInput: event.target.value })
  }

//Handles what happens once user selects "Submit"
  handleSubmit(event) {
    //Querying provinces for state user specified 
    this.state.provinces.map(element => {
      if (element.province.toLowerCase() === this.state.provinceInput.toLowerCase()) {
        this.setState({ provinceObj: element})
      //this.setState({selectedProvincesArray: this.state.selectedProvincesArray.push(this.state.provinceObj)})
        this.setState({ selectedProvincesArray: this.state.selectedProvincesArray.push('44')})

        
        //this.setState({selectedProvincesArray: [this.state.selectedProvincesArray,this.state.provinceObj]})
        

      }
       
    })
    console.log(this.state.selectedProvincesArray)   
    console.log(this.state.selectedProvincesArray[0])   
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
      .then(data => { this.setState({ provinces: data.countryDataToJSON[0].provinces }) })

  }

  render() {
    return (
      <div>
        <div id="searchTool">
          <h2 >Covid-19 Data by Province:</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Enter Province" value={this.state.provinceInput} onChange={this.handleChange}></input>
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
          <tr>
            <th>{this.state.provinceObj.province}</th> 
            <th>{this.state.provinceObj.confirmed}</th> 
            <th>{this.state.provinceObj.recovered}</th> 
            <th>{this.state.selectedProvincesArray[0]}</th> 
            <th>{this.state.selectedProvincesArray[0]}</th> 
          </tr>
        </table>

      </div>
    )
  }
}

export default Search;

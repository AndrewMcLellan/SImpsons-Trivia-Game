import React, { Component } from 'react'
import { Link } from 'react-router'

class DashboardShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: [],
      numberOfQuotes: 3
    }
  }

  componentDidMount() {
    fetch(`https://thesimpsonsquoteapi.glitch.me/quotes`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          quote: response.shift()
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  render() {

    return(
      <div>
        <center>
          <div>
            <img src={this.state.quote.image}/>
          </div>
          <Link to="/game">Click Here to Play Simpsons Quote Trivia!!</Link>
        </center>
      </div>
    )
  }
}


export default DashboardShowContainer

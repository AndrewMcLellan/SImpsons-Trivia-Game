import React, { Component } from 'react'
import ButtonTile from '../components/ButtonTile'
import QuestionTile from '../components/QuestionTile'

class GameMainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: null
    }
    this.handleRetriveQuestion = this.handleRetriveQuestion.bind(this)
  }
  handleRetriveQuestion(event) {
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
    let questionTile;
    if (this.state.quote) {
      questionTile = <QuestionTile
        quote={this.state.quote.quote}
        />
    }

    return(
      <div>
        Welcome to the game!
        <ButtonTile
          handleRetriveQuestion={this.handleRetriveQuestion}
          />
        {questionTile}
      </div>
    )
  }
}


export default GameMainContainer

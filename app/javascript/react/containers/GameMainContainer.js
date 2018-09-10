import React, { Component } from 'react'
import ButtonTile from '../components/ButtonTile'
import QuestionTile from '../components/QuestionTile'
import OptionsTile from '../components/OptionsTile'
import AnswerContainer from './AnswerContainer'

class GameMainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: null,
      correctAnswer: '',
      characters: [],
      correctnessNotice: ''
    }
    this.handleRetriveQuestion = this.handleRetriveQuestion.bind(this)
    this.checkCorrectness = this.checkCorrectness.bind(this)
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
      .then(response => response.shift())
      .then(response => {
        this.setState({
          quote: response.quote,
          correctAnswer: response.character
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

      fetch(`/api/v1/characters`)
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
            characters: response
          })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    checkCorrectness(formPayLoad) {
      if (this.state.correctAnswer == formPayLoad.answer) {
        this.setState({ correctnessNotice: "You Are Correct!" })
      } else {
        this.setState({ correctnessNotice: "Sorry Wrong Answer"})
      }
    }

  render() {
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    let questionTile;
    if (this.state.quote) {
      questionTile = <QuestionTile
        quote={this.state.quote}
        />
    }

    let options = []
    let count = 0
    this.state.characters.forEach(character => {
      if (character.full_name != this.state.correctAnswer &&
      count < 3) {
        options.push(character.full_name)
        count += 1
      }
    })


    options.push(this.state.correctAnswer)
    options = shuffle(options)


    let optionsTile;
    if (this.state.quote) {
      optionsTile = options.map(character => {
        return(
          <OptionsTile
            character={character}
            />
        )
      })
    }

    let answerContainer;
    if (this.state.quote) {
      answerContainer =
          <AnswerContainer
            checkCorrectness={this.checkCorrectness}
            />
    }
    let result
    if (this.state.correctnessNotice) {
      result = <div>{this.state.correctnessNotice}</div>
    }

    return(
      <div>
        Welcome to the game!
        <ButtonTile
          handleRetriveQuestion={this.handleRetriveQuestion}
          />
        {questionTile}
        {optionsTile}
        {answerContainer}
        {result}
      </div>
    )
  }
}


export default GameMainContainer

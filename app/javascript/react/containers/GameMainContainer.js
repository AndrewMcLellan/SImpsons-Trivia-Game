import React, { Component } from 'react'
import ButtonTile from '../components/ButtonTile'
import QuestionTile from '../components/QuestionTile'
import OptionsTile from '../components/OptionsTile'
import AnswerContainer from './AnswerContainer'
import ScoreTile from '../components/ScoreTile'

class GameMainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: null,
      correctAnswer: '',
      characters: [],
      correctnessNotice: '',
      questionAsked: false,
      round: {
        id: null,
        score: 0,
        totalAsked: 0,
        totalQuestions: 10
      }
    }
    this.handleRetriveQuestion = this.handleRetriveQuestion.bind(this)
    this.checkCorrectness = this.checkCorrectness.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }


  handleRetriveQuestion() {
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


    handleClick(event) {
      this.handleRetriveQuestion()
      this.setState({
        questionAsked: true
      })
    }


    checkCorrectness(formPayLoad) {
      let newScore = this.state.round.score
      let totalQuestionsAsked = this.state.round.totalAsked
      if (this.state.correctAnswer == formPayLoad.answer) {
        newScore += 1
        totalQuestionsAsked += 1
        this.setState({
          correctnessNotice: "You Are Correct!",
          questionAsked: true,
          round: {
            id: this.state.round.id,
            score: newScore,
            totalAsked: totalQuestionsAsked,
            totalQuestions: 10
          }
        })
      } else if (formPayLoad.answer == "" || formPayLoad.answer == " ") {
        this.setState({ correctnessNotice: "You Must Submit An Answer" })
      } else {
        totalQuestionsAsked += 1
        this.setState({
          correctnessNotice: "Sorry Wrong Answer",
          questionAnswered: true,
          round: {
            id: this.state.round.id,
            score: newScore,
            totalAsked: totalQuestionsAsked,
            totalQuestions: 10
          }
         })
      }
    }

    componentDidMount() {
      fetch(`/api/v1/rounds/new`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          round: {
            id: response.id,
            score: response.total_correct,
            totalAsked: response.total_questions_asked,
            totalQuestions: response.total_questions
          }
        })
      })
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


    let buttonTile;
    if (this.state.questionAsked != null) {
      buttonTile = <ButtonTile
        handleClick={this.handleClick}
        questionAnswered={this.state.questionAnswered}
        />
    }



    let answerContainer;
    if (this.state.quote) {
      answerContainer =
          <AnswerContainer
            checkCorrectness={this.checkCorrectness}
            handleRetriveQuestion={this.handleRetriveQuestion}
            />
    }
    let result
    if (this.state.correctnessNotice) {
      result = <div>{this.state.correctnessNotice}</div>
    }


    return(
      <div>
        Welcome to the game!
        {buttonTile}
        {questionTile}
        {optionsTile}
        {answerContainer}
        {result}
        <ScoreTile
          round={this.state.round}
          />
      </div>
    )
  }
}


export default GameMainContainer

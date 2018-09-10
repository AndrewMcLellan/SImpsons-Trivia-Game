import React, { Component } from 'react'
import AnswerField from '../components/AnswerField'

class AnswerContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answerString: ""

    }
    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleAnswerChange(event) {
    event.preventDefault()
    this.setState ({ answerString: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayLoad = {
      answer: this.state.answerString
    }
    this.props.checkCorrectness(formPayLoad)
  }

  render() {

    return(
      <div>
        <AnswerField
          content={this.state.answerString}
          label="Answer"
          name="answer"
          handleAnswerChange={this.handleAnswerChange}
          />
          <div className="button-group">
            <input className="button" type="submit" value="Submit" onClick={this.handleSubmit}  />
          </div>
      </div>
    )
  }
}


export default AnswerContainer

import React from 'react'

const AnswerField = (props) => {

  return(
    <div>
      <label>{props.label}
        <input
          type='text'
          value={props.content}
          onChange={props.handleAnswerChange}
          />

      </label>
    </div>
  )
}

export default AnswerField

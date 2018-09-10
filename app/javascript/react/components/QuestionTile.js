import React from 'react'

const QuestionTile = (props) => {

  return(
    <div>
      Which of The Following Characters Said this Quote?
      <br/>
      {props.quote}
    </div>
  )

}

export default QuestionTile

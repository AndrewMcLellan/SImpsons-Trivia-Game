import React from 'react'

const ScoreTile = (props) => {

  return(
    <div>
      <div>
        Score <br />
        {props.round.score}<br />
        Questions Asked So Far <br />
        {props.round.totalAsked} <br />
        Total Questions in Round <br />
        {props.round.totalQuestions} <br />

      </div>
    </div>
  )
}



export default ScoreTile

import React from 'react'

const ButtonTile = (props) => {

  return(
    <div onClick={props.handleRetriveQuestion}>
      <button>Retrieve Question</button>
    </div>

  )
}

export default ButtonTile

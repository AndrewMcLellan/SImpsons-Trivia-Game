import React from 'react'

const ButtonTile = (props) => {

  return(
    <div onClick={props.handleClick}>
      <button>Retrieve Question</button>
    </div>

  )
}

export default ButtonTile

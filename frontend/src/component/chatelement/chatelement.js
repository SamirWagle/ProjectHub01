import './chatelement.css'
import React from 'react'

const Chatelement = ({sender,messege}) => {
    return(
        <div class='chatelements'>
            <div class='chatby'>
                {sender}
            </div>
            <div class='chatmessege'>
                {messege}
            </div>
        </div>
  )
}

export default Chatelement

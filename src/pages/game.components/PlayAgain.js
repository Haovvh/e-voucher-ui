import React from 'react'
import {
    Button
  } from "antd";

export default function PlayAgain({ again }) {


    return (
        <div className="menu-item">
            <Button className='btn btn-primary ' onClick={() => again()}
          >
                Play again?
        </Button>
            
        </div>
    )
}

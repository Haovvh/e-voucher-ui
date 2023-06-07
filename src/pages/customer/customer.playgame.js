import React, {useEffect} from 'react'

import GamePokemon from '../GamePokeMon';

export default function CustomerPlayGame (props) {
    
    
    useEffect(() => {
        
    },[])

    return (
        <React.Fragment>
            <div className="container">
          <header className="jumbotron">
            
          </header>
          <GamePokemon show={props.show} id={props.id}/>          
          </div>
        </React.Fragment>
    )
}
import React, {useEffect} from 'react'

import GamePokemon from '../GamePokeMon';
import Game2048 from '../Game2048';

export default function CustomerPlayGame (props) {
    
    
    useEffect(() => {
        
    },[])

    return (
        <React.Fragment>
            <div className="container">
          <header className="jumbotron">
            
          </header>
          {(props.game === 'gamepokemon') && <GamePokemon partner={props.partner} show={props.show} id={props.id}/>}
          {(props.game === 'game2048') && <Game2048 partner={props.partner} show={props.show} id={props.id}/>}         
          </div>
        </React.Fragment>
    )
}
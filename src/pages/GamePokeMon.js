import React, { Component, useState, useEffect } from "react";
import GameBoard from './game.components/GameBoard'
import NewGame from "./game.components/NewGame";
import PlayAgain from './game.components/PlayAgain';
import customerService from '../services/customer.service'
import notification from '../utils/notification';

const createId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}



export default function GamePokemon (props) {

  const [newGame, setNewGame] = useState(false);
  const [won, setWon] = useState(false);
  const [cards, setCards] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [promotionID, setPromotionID] = useState("");  
  const [voucherListId, setVoucherListId] = useState([])
  const voucherListID = [];

  const countClicks = () => {
    setClicks(clicks+1);    
  }

  const shuffleCards = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const resetGame = () => {   
    setNewGame(false)
    setWon(false);
    setCards([]);
    setClicks(0);
    setTimeout(() => {
      initGame()
    }, 1000);   
    
  }

  const hasWon = () => {
   setWon(true)
    setTimeout(() =>{
      if(props.id && props.id != "" && props.show === true ) {      
        const temp = Math.floor(Math.random()*voucherListId.length)
        const id = voucherListId[temp];
        customerService.postParticipationByCustomer(promotionID).then(
            response => {

                if(response.data && response.data.success) {
                    console.log(response.data)
                }
            }
        )
        customerService.postRewardByCustomer(promotionID,id).then(
            response => {
                if(response.data && response.data.success === true) {
                    alert(notification.VOUCHER_SUCCESS)
                    customerService.getVoucherIdByCustomer(id).then(
                        response => {
                            if(response.data && response.data.success === true) {
                                console.log(response.data)
                                const tempvoucher = response.data.data
                                alert(`Voucher: ${tempvoucher.title} Value: ${tempvoucher.value}`)
                                window.location.assign('/customervoucher')
                            }
                        }
                    )
                }
            }, error => {
              if(error.response && error.response.status === 405 && error.response.data && error.response.data.success === false) {
                alert(notification.LIMIT_VOUCHER)
              }
              
            }
        )
      }
      
    }, 1000)
  };

  const initGame = () => {
    generateDeck();
    setNewGame(true);
  };

  const generateDeck = () => {
    
    let amount = 5;
    let listcards = [];
    for (let i = 1; i < amount + 1; i++) {
      let id = createId();
      let id2 = createId();
      let rand = Math.floor(Math.random() * 300) + 1;
      const card1 = {
        id: id,
        matchesId: id2,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rand}.png`,
        flipped: false,
        found: false,
      }
      const card2 = {
        id: id2,
        matchesId: id,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rand}.png`,
        flipped: false,
        found: false,
      }
      listcards.push(card1);
      listcards.push(card2);
    }
    shuffleCards(listcards);
    setCards(listcards)
    
  }

  useEffect(() => {
    if(props.id && props.id != "" && props.show === true) {
        customerService.getPromotionIdByCustomer(props.id).then(
            response => {
                if(response.data && response.data.success === true) {
                    const temp = response.data.data
                    setPromotionID(temp.id)
                    for(let i = 0; i< temp.Details.length; i++) {
                        if(temp.Details[i].balanceQty>0) {
                            voucherListID.push(temp.Details[i].Voucher.id)
                        }                            
                    }
                    setVoucherListId(voucherListID)
                    
                }
            }
        )
    }
},[])

  return (
    <>
  <header className="jumbotron">
            <h1>Game Pokemon </h1> 
          </header>
    <div>
      <div className="board-container">
        {newGame ?
          (<GameBoard cards={cards} won={hasWon} click={countClicks} />)
          : null}
          {newGame && (<p className="message center">Total flips: {clicks}</p>)}
      </div>

      <div className="menu">
      <div className="message">
          {won && (<h2>You win!</h2>)}
        </div>
        
        <NewGame play={initGame} />
        {won && (<PlayAgain again={resetGame} />)}
      </div>
    </div>
    </>
    
  );

}




import React, {useEffect, useState} from "react";
import Item from "./Item";
import {Button, Container, Row} from "react-bootstrap";
import {move, createEmptyField, isFinish, generateNewValue} from '../utils/GameUtils'
import {useSwipeable} from "react-swipeable";
import customerService from '../services/customer.service'
import notification from '../utils/notification';


export default function Game2048(props) {
    const [field, setField] = useState(createEmptyField())
    const [history, setHistory] = useState([])
    const [score, setScore] = useState(0)
	const [promotionID, setPromotionID] = useState("");  
  	const [voucherListId, setVoucherListId] = useState([])
	const voucherListID = [];
    function handleMove(x, y) {
        let f = move(field, x, y);
        if (f != null) {
            let nField = generateNewValue(f.field)
            let nScore = score + f.score
            setField(nField)
            setScore(nScore)
            if(score >= 500) {
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
            }
        }
    }

    let handleKey = key => {
        if (key.keyCode == '38') {
            handleMove(-1, 0)
        } else if (key.keyCode == '40') {
            handleMove(1, 0)
        } else if (key.keyCode == '37') {
            handleMove(0, -1)
        } else if (key.keyCode == '39') {
            handleMove(0, 1)
        }
    }

    useEffect(() => {
        let h = [...history]
        if (h[h.length - 1]?.field !== field) {
            h.push({field: field, score: score})
            setHistory(h)
        }
    }, [field, score])

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


        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('keydown', handleKey);
        };
		
    }, [field]);

    function restartGame() {
        setField(createEmptyField())
        setHistory([])
        setScore(0)
    }

    let finished = isFinish(field)

    const swipeHandlers = useSwipeable({
        onSwipedLeft: e => handleMove(0, -1),
        onSwipedRight: e => handleMove(0, 1),
        onSwipedUp: e => handleMove(-1, 0),
        onSwipedDown: e => handleMove(1, 0),
        preventScrollOnSwipe: true,
        trackMouse: true
    })

    return (
		<>
		<header className="jumbotron">
            <h1>Game 2048 </h1> 
          </header>
		<div className="" style={{textAlign: 'center'}}>
            <div className="mt-2 d-flex">
                <div className="ms-auto me-auto">
                    <Button variant="outline-secondary" className="me-1" onClick={() => {
                        if (history?.length > 1) {
                            let h = [...history]
                            h.pop()
                            setHistory(h)
                            setField(h[h.length - 1].field)
                            setScore(h[h.length - 1].score)
                        }
                    }}>Back</Button>
                    <Button variant="secondary" className="ms-1" onClick={() => {
                        restartGame()
                    }}>Restart</Button>

                </div>

            </div>
            <div className="mt-2" style={{fontSize: 18}}>
                <b className="">score: </b>
                <label>{score}</label>
            </div>
            <div {...swipeHandlers}>
                <div className={"d-flex justify-content-center"}>
                    <div className={"mt-2"} style={{position: 'relative'}}>
                        <div className={"unselectable" + (finished ? " translucent" : "")}>
                            {
                                field.map((row, i) =>
                                    <Row>
                                        {
                                            row.map((value, j) => <Item key={i + "_" + j + '_' + value} value={value}/>)
                                        }
                                    </Row>
                                )
                            }
                        </div>

                        <div className={"m-auto" + (!finished ? " d-none" : '')} style={{
                            position: "absolute",
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <label style={{fontSize: 30, fontWeight: 'bold'}} className="m-auto">Game over</label>
                        </div>
                    </div>
                </div>

            </div>

        </div>
		</>
        
    )

}

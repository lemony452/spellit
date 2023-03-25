import { useState, useContext, useEffect } from "react"
// import { useSelector } from "react-redux"

import { WebSocketContext } from '@/store/websocket'
// import { RootState } from "@/store/";
import API from "@/utils/API";

import Cards from './Cards'
import style from './index.module.css'
interface CardType {
  attribute: number;
  code: string;
  cost: number;
  damage: number;
  id: number;
  spell: string;
  title: string
}

const User = () => {
  const { send } = useContext(WebSocketContext);
  // const memberId = useSelector((state: RootState) => state.user.id);
  const token = sessionStorage.getItem("token");
  console.log(token)
  const [cards, setCards] = useState<Array<CardType>>([]);
  useEffect(() => {
    API.get(
      'game/card',
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(({data}) => {
      console.log(data)
      setCards(data)
      console.log(cards)
    }).catch((err) => console.log(err))
    return () => {}
  }, [])

  const [deck, setDeck] = useState<Array<CardType>>([]);

  const selectCard = (res: CardType) => {
    let flag = false;
    for (const i of deck) {
      if (i === res) {
        flag = true;
      }
    }
    if (!flag) {
      setDeck([...deck, res])
      console.log('cardseledted')
      console.log(deck)
    }
  };

  return (
    <div className={`${style.bg}`}>
      <div className={`${style.items}`}>
        <Cards cards={cards} selectCard={selectCard}/>
      </div>
      {/* 선택된 카드 덱 */}
      <div className={`${style.cardselectcontainer}`}>
        <div className={`${style.cardselect}`}>
          {deck.map((item: CardType, index: number) => (
           <div key={index}>{item.title}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default User;


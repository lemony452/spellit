import { useRef, useEffect } from 'react';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash'

import { RootState } from '@/store'
import { DeckType } from '@/utils/Types';

import Card from './Card'
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
interface PropsType {
  cards: Array<CardType>;
  selectCard: (res: CardType) => void;
};

const Cards = ({cards, selectCard}: PropsType) => {
  const onSelectCard = (data:any)=>{
    selectCard(data);
    console.log(data)
  }
  
  const myDeck = useSelector((state: RootState) => (state.user.deck))

  // const mine = cards.filter(c => myDeck.includes(c))
  // const [notMine, setNotMine] = useState<Array<DeckType>>([]);
  let notMine = useRef<Array<DeckType>>([]);

  useEffect(() => {
    for (const card of cards) {
      for (const m of myDeck) {
        console.log(m.title)
        if (card.id !== m.id) {

          notMine.current.push(card)
          // setNotMine([...notMine, card])
          console.log(notMine)
        }
        break
      }
    }
  }, [myDeck])

  console.log('myDeck ', myDeck)
  console.log('notMine ', notMine)

  return (
    <div className={`${style.cardItems}`}>
      { myDeck.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)} className={`${style.cardContainer}`}>
          <Card key={index} card={card.code}/>
        </div>
      ))}
      <hr />
      {/* { notMine.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)} className={`${style.cardContainer}`}>
          <Card key={index} card={card.code}/>
        </div>
      ))} */}
      {/* { cards.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)} className={`${style.cardContainer}`}>
          <Card key={index} card={card.code}/>
        </div>
      ))} */}
    </div>
  )
}

export default Cards;
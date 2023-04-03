import {RootState} from '@/store'
import { useSelector } from 'react-redux';

import _ from 'lodash'

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
  console.log('myDeck ', myDeck)
  // const mine = cards.filter(c => myDeck.includes(c))
  const mine = cards.filter(c => myDeck.includes(c))
  const notMine = cards.filter(c=> !(myDeck.includes(c)))
  console.log('mine ', mine)
  console.log('notMine ', notMine)

  return (
    <div className={`${style.cardItems}`}>
      { mine.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)} className={`${style.cardContainer}`}>
          <Card key={index} card={card.code}/>
        </div>
      ))}
      <hr />
      { notMine.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)} className={`${style.cardContainer}`}>
          <Card key={index} card={card.code}/>
        </div>
      ))}
      {/* { cards.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)} className={`${style.cardContainer}`}>
          <Card key={index} card={card.code}/>
        </div>
      ))} */}
    </div>
  )
}

export default Cards;
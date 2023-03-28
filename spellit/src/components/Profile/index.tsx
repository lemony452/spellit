import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from "@/utils/API"

import style from './index.module.css'

type DeckType = {
  id : number,
  code : string,
  title : string,
  spell : string,
  cost : number,
  damage : number,
  attribute : number,
}

type GameCharacterType = {
  id : number,
  characterName : string,
  englishName : string,
  stand : string,
  hurt : string,
  attack : string,
  winner : string,
  combo : string,
}

type UserType = {
  deck: Array<DeckType> | null,
  email: string,
  exp: number,
  gameCharacter: GameCharacterType | null,
  id: number | null,
  level: number,
  nickname: string,
  playCount: number,
  winCount: number,
}

const Profile = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem("token");

  const [user, setUser] = useState({});

  useEffect(() => {
    API.post<any>(
      `member/info/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then((res) => {
      // 수정 필요
      console.log(res)
      setUser(res)
    })
    console.log(id)
  },[])

  return (
    <div className={`${style.bg}`}>
      <div className={`${style.items}`}>
        hello

      </div>
    </div>
  )
};
export default Profile;

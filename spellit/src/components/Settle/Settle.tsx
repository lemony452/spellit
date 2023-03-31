import react, {useState, useContext, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import attack, { attackActions } from '@/store/attack';
import { RootState } from "@/store/";
import { AttackType } from '@/utils/Types'
import { WebSocketContext } from '@/store/websocket'

import ProfileHp from '../Game/Items/ProfileHp';

import "./Settle.css";
import LUNA_attack from '../../assets/character/LUNA_attack.png';
import AK_attack from '../../assets/character/AK_attack.png';
import player, { playerActions } from '@/store/player';
import { settleActions } from '@/store/settle';

function Settle() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { send } = useContext(WebSocketContext);

    const roomId = useSelector((state: RootState) => state.room.roomId)
    const memberId = useSelector((state: RootState) => state.user.id)

    const p1Character = useSelector((state: RootState) => state.player.p1!.gameCharacterEntity.englishName);
    const p2Character = useSelector((state: RootState) => state.player.p2!.gameCharacterEntity.englishName);

    const defaultHP = useSelector((state: RootState) => (state.attack.defaultHp));

    const p1Hp = useSelector((state: RootState) => (state.player.p1!.hp));
    const p2Hp = useSelector((state: RootState) => (state.player.p2!.hp));

    const p1Deffense = useSelector((state: RootState) => (state.settle.p1Deffense));
    const p2Deffense = useSelector((state: RootState) => (state.settle.p2Deffense));

    const attacks = useSelector((state: RootState) => (state.game.attacks));

    const percentList = useSelector((state: RootState) => (state.settle.percentList));
    console.log('percentList : ', percentList);
    
    const p1HpStyle = {
        width: `${p1Hp/defaultHP*385}px`,
        backgroundColor: p1Hp > 100 ? '#FFF500' : '#FF0000' ,
    }
    const p2HpStyle = {
        width: `${p2Hp/defaultHP*385}px`,
        backgroundColor: p2Hp > 100 ? '#FFF500' : '#FF0000' ,
    }

    const [idx, setIdx] = useState(0);
    
    async function settling(idx: number) {
        console.log('정산중..')
        let d = attacks[idx].card.damage * percentList[idx] * 2;
        console.log('========')
        console.log('d', d);

        // 이펙트 사라지게 하기
        const spellEffect = document.querySelector(`.spellEffect-${idx}`);
        spellEffect?.classList.add('hidden-effect');

        if (attacks[idx].isMine) {
            console.log('내가 공격중!!')
            if (p2Deffense) {
                d = d/2;
            }
            setTimeout(() => {
                dispatch(playerActions.p2HpDecrese(d));
            }, 3000);
        } else {
            console.log('공격 당하는중,,')
            if (p1Deffense) {
                d = d/2;
            }
            setTimeout(() => {
                dispatch(playerActions.p1HpDecrese(d));
            }, 3000);
        }
    }

    useEffect(() => {
        console.log('=========')
        console.log('idx : ', idx)
        console.log('=========')

        if (p1Hp <= 0 || p2Hp <= 0) {
            send({
                event: 'gameOver',
                roomId: roomId,
                memberId: memberId,
                data:  {
                    hp: p1Hp,
                },
            }) 
        }

        if (idx < attacks.length) {
            settling(idx) ;
        } else {
            dispatch(settleActions.percentListClear());
            console.log('Go to Next Turn!');
            navigate('/ready');
        }
        console.log('p1HP : ', p1Hp);
        console.log('p2HP : ', p1Hp);

        setTimeout(() => {
            setIdx(idx+1);
        }, 5000);

    }, [idx]);

    return (
        <div className='settle-bg'>
            <div className='settle-top-itmes'>
                <div className='first-hp-box'>
                    <ProfileHp></ProfileHp>
                    <div className="first-hp-bar" style={p1HpStyle}></div>
                </div>
                <div className='second-hp-box'>
                    <ProfileHp></ProfileHp>
                    <div className="second-hp-bar" style={p2HpStyle}></div>
                </div>
            </div>
            <div className='settle-bottom-items'>
                <div style={{display: 'inline-flex'}}>
                    {attacks.map((attack: AttackType, i: number) => {
                        if (attack.isMine) {
                            return (
                                <img key={i} className={`spellEffect-${i}`} src={require(`../../assets/effect/${attack.card.code}.png`)} alt="없음,," />
                            )
                        }
                    })}   
                </div>
                <div className='characterBox'>
                    <img className="myCharacter" style={{width: '400px'}} src={require(`../../assets/character/${p1Character}_attack.png`)} alt="" />
                    <img className="yourCharacter" style={{width: '400px'}} src={require(`../../assets/character/${p2Character}_attack.png`)} alt="" />
                </div>
                <div style={{display: 'inline-flex'}}>
                    {attacks.map((attack: AttackType, i: number) => {
                        if (!attack.isMine) {
                            return (
                                <img key={i} className={`spellEffect-${i}`} src={require(`../../assets/effect/${attack.card.code}.png`)} alt="없음,," />
                            )
                        }
                    })}   
                </div>
            </div>
        </div>
    )
}



export default Settle;

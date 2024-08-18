import { useContext } from "react";
import {Timer} from "./Timer.jsx";
import { UserContext } from "../context/userContext.js";

export const GameInformations = () => {
    const userContext = useContext(UserContext)
    if(!userContext) return <div>loading</div>

    const {user, setGameSpeed} = userContext


    return <>
        <div className="informations">
            <div className="multiplicator"
                onClick={()=>{
                    setGameSpeed(user.gameSpeed === 1 ? 2 : 1)
                }}
            ><b>x{user.gameSpeed}</b></div>
            <div className="user"><b>Player:</b> {user.username}</div>
            <div className="score"><b>Score:</b> {user.score}</div>
            <div className="energy"><b>Energy:</b> {user.energy}</div>
            <div className="coins"><b>Coins:</b> {user.coins}</div>
            <Timer />
        </div>
    </>
}
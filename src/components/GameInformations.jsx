import {Timer} from "./Timer.jsx";

export const GameInformations = ({user, setUser}) => {
    return <>
        <div className="informations">
            <div className="multiplicator"
                onClick={()=>{
                    setUser((curUser)=>({
                        ...curUser,
                        speed : curUser.speed === 1 ? 2 : 1
                    }))
                }}
            ><b>x{user.speed}</b></div>
            <div className="user"><b>Player:</b> {user.username}</div>
            <div className="score"><b>Score:</b> {user.score}</div>
            <div className="energy"><b>Energy:</b> {user.energy}</div>
            <div className="coins"><b>Coins:</b> {user.coins}</div>
            <Timer />
        </div>
    </>
}
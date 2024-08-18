import { useContext } from "react";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../context/userContext";

export const Home = () => {
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('./game')
    }

    return <>
        <div className="home">
            <h1>Castle Guard</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => {
                        setUser(user => ({
                            ...user,
                            username: e.target.value
                        }))
                    }}
                    type="text" name="" id="" placeholder={'Your name'} required/>
                <button>Start game</button>
            </form>
        </div>
    </>
}
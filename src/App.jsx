import {useCallback, useState} from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Controls} from "./components/Controls.jsx";
import {Home} from "./components/Home.jsx";
import {Game} from "./components/Game.jsx";
import {EndGame} from "./components/EndGame.jsx";
import { UserContext } from './context/userContext.js';

function App() {
    const [user, setUser] = useState({
        gameSpeed : 1,
        username : '',
        score: 0,
        energy: 100,
        coins: 0
    })

    const setGameSpeed = useCallback((gameSpeed) => {
        setUser((user) => ({
            ...user,
            gameSpeed
        }))
    })

    const addResources = useCallback((coins, energy) => {
        setUser((currentUser)=>({
            ...currentUser,
            coins: currentUser.coins + coins,
            energy: currentUser.energy + energy,
        }))
    }, [user, setUser])

    const router = createBrowserRouter([
        {
            path : 'FR_tower_defense',
            element: <Controls />,
            children: [
                {
                    path: '',
                    element: <Home setUser={setUser}/>
                },
                {
                    path: 'game',
                    element : <Game />
                },
                {
                    path: 'end',
                    element : <EndGame user={user}/>
                }
            ]
        }
    ])

  return <UserContext.Provider value={{user, setUser, addResources, setGameSpeed}}>
      <RouterProvider router={router} />
  </UserContext.Provider>

}

export default App

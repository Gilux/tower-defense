import {useCallback, useState} from 'react'
import './App.css'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {Controls} from "./components/Controls.jsx";
import {Home} from "./components/Home.jsx";
import {Game} from "./components/Game.jsx";
import {EndGame} from "./components/EndGame.jsx";

function App() {
    const onAction = (energy, e,d) => {
        console.log(energy, e, d)
    }

    const [user, setUser] = useState({
        speed : 1,
        username : '',
        score: 0,
        energy: 500,
        coins: 500
    })

    const addResources = useCallback((coins, energy) => {
        setUser((currentUser)=>({
            ...currentUser,
            coins: currentUser.coins + coins,
            energy: currentUser.energy + energy,
        }))
    }, [user, setUser])

    const usedResources = (coins, energy) => {
        console.log(coins, energy)
    }

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
                    element : <Game user={user} setUser={setUser} addResources={addResources} usedResources={usedResources}/>
                },
                {
                    path: 'end',
                    element : <EndGame user={user}/>
                }
            ]
        }
    ])

  return <RouterProvider router={router} />
}

export default App

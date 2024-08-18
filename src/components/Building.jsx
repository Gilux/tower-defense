import { useCallback, useContext, useEffect, useState } from "react"
import { useBuildings } from "../hooks/useBuildings"
import { UserContext } from "../context/userContext"
import { useGameSpeed } from "../hooks/useGameSpeed"

export const Building = ({ building }) => {
    const [showDebugTicks] = useState(true)

    const {allBuildings} = useBuildings()
    const currentBuilding = allBuildings.find((b) => b.name === building.name )

    const { user } = useContext(UserContext)
    const { generateResourcesTicks } = useGameSpeed(user?.gameSpeed)
    const [ticksBeforeUpdate, setTicksBeforeUpdate] = useState(generateResourcesTicks)

    const [loop, setLoop] = useState()

    const {addResources} = useContext(UserContext)

    // Add coins and energy, or make damage to enemies nearby
    const update = useCallback(() => {
      addResources(currentBuilding.coinsPerSecond, currentBuilding.energyPerSecond)
    }, [currentBuilding])

    // Remove one tick every x
    useEffect(() => {
      setLoop(
        setTimeout(() => {
          if(ticksBeforeUpdate > 0) {
            setTicksBeforeUpdate((ticks) => ticks - 1)
          } else {
            update()
            setTicksBeforeUpdate(generateResourcesTicks)
          }
        }, 100)
      )

      return function cleanup() {
        clearTimeout(loop);
      };
    }, [ticksBeforeUpdate, setTicksBeforeUpdate, generateResourcesTicks])
    return <div style={{position:'relative'}} className="img__building">
        <img src={currentBuilding.image} alt={currentBuilding.name} className={'img__building'}/>
        <span className="center"></span>
        {showDebugTicks && (
          <span style={{position: 'absolute', fontSize: '12px', top: '0', left: '0'}}>{ticksBeforeUpdate}</span>
        )}
    </div>
}
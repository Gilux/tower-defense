import { useCallback, useEffect, useState } from "react"
import { useBuildings } from "../hooks/useBuildings"

export const Building = ({building}) => {
    const {allBuildings} = useBuildings()
    const currentBuilding = allBuildings.find((b) => b.name === building.name )

    const [ticksBeforeUpdate, setTicksBeforeUpdate] = useState(30)
    const [loop, setLoop] = useState()

    const update = useCallback(() => {
      console.log('must update', currentBuilding.coinsPerSecond, currentBuilding.damagePerSecond)
    }, [currentBuilding])

    useEffect(() => {
      setLoop(
        setTimeout(() => {
          if(ticksBeforeUpdate > 0) {
            setTicksBeforeUpdate((ticks) => ticks - 1)
          } else {
            update()
            setTicksBeforeUpdate(30)
          }
        }, 100)
      )

      return function cleanup() {
        clearTimeout(loop);
      };
    }, [ticksBeforeUpdate, setTicksBeforeUpdate])
    return <>
        <img src={currentBuilding.image} alt={currentBuilding.name} className={'img__building'}/>
        <span>{ticksBeforeUpdate}</span>
    </>
}
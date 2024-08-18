import { useCallback, useContext, useEffect, useState } from "react"
import { useGameSpeed } from "../hooks/useGameSpeed"
import { UserContext } from "../context/userContext"

export const Monster = ({ monster, moveMonster, attack }) => {
  
    const CELL_WIDTH = 30

    const gameZoneCoordinates = {
      x: monster.x * CELL_WIDTH,
      y: monster.y * CELL_WIDTH
    }

    const { user } = useContext(UserContext)
    const { monsterAttackTicks } = useGameSpeed(user?.gameSpeed)
    const [ticksBeforeAttack, setTicksBeforeAttack] = useState(monsterAttackTicks)


    useEffect(() => {
      const loop = setInterval(() => {
          moveMonster(monster.id)
        }, 15)
      
      return function cleanup() {
        clearInterval(loop);
      };
    }, [monster])

    const handleAttack = useCallback(() => {
      attack(monster)
    }, [monster])

    // Remove one tick every x
    useEffect(() => {
      const timeoutId = setTimeout(() => {
          if(ticksBeforeAttack > 0) {
            setTicksBeforeAttack((ticks) => ticks - 1)
          } else {
            handleAttack()
            setTicksBeforeAttack(monsterAttackTicks)
          }
        }, 50)

      return function cleanup() {
        clearTimeout(timeoutId);
      };
    }, [ticksBeforeAttack, setTicksBeforeAttack, monsterAttackTicks])

    return <div className={`monster ${monster.headingX !== 14 && monster.headingY !== 10 ? 'attacking' : ''}`} style={{top: `${gameZoneCoordinates.y}px`, left: `${gameZoneCoordinates.x}px`, color: 'black'}}>
      {/* <span style={{position: 'absolute', fontSize: '12px', top: '0', left: '0'}}>{ticksBeforeAttack}</span> */}
    </div>
}
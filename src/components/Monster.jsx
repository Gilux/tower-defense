import { useEffect, useState } from "react"

export const Monster = ({ monster, moveMonster }) => {
  
    const CELL_WIDTH = 30

    const gameZoneCoordinates = {
      x: monster.x * CELL_WIDTH,
      y: monster.y * CELL_WIDTH
    }

    const [loop, setLoop] = useState()

    useEffect(() => {
      setLoop(
        setInterval(() => {
          moveMonster(monster.id)
        }, 75)
      )

      return function cleanup() {
        clearInterval(loop);
      };
    }, [monster])

    return <div className={`monster ${monster.headingX !== 14 && monster.headingY !== 10 ? 'attacking' : ''}`} style={{top: `${gameZoneCoordinates.y}px`, left: `${gameZoneCoordinates.x}px`, color: 'black'}}>
        
    </div>
}
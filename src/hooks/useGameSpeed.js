import {useMemo} from "react";

export const useGameSpeed = (speed) => {

    // Returns the number of ticks a building has to wait before generating resources
    const generateResourcesTicks = useMemo(() => {
      if(!speed) {
        console.warn('Unknown speed')
        return 30
      } 
      if(speed === 1) return 30
      if(speed === 2) return 15
    }, [speed])

    return {
      generateResourcesTicks,
    }
}
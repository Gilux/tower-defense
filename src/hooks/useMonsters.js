import {useCallback} from "react";

export const useMonsters = () => {

    const buildingsNearMonster = useCallback(
        (monster, buildings) => {
            return buildings.filter((building) => {
                return Math.abs(monster.x - building.x) <= 3 && Math.abs(monster.y - building.y) <= 3
            })
        }, [])

    return {
      buildingsNearMonster
    }
}
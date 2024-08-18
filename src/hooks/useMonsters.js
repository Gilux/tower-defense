export const useMonsters = () => {

    const buildingsNearMonster = (monster, buildings) => {
            return buildings.filter((building) => {
                return Math.abs(monster.x - building.x) <= 3 && Math.abs(monster.y - building.y) <= 3
            })
          }


    const buildingAdjacentToMonster = (monster, buildings) => {
          return buildings.find((building) => {
              return Math.abs(monster.x - building.x) <= 1 && Math.abs(monster.y - building.y) <= 1
          })
      }

    return {
      buildingsNearMonster,
      buildingAdjacentToMonster,
    }
}
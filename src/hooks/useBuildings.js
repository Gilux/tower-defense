import {useMemo} from "react";

export const useBuildings = (currentCoins, currentEnergy, currentBuilding) => {


    const allBuildings = useMemo(() => [
        {
            name: 'Wood Castle',
            energyCost: 0,
            coinsCost: 0,
            previousBuilding: null,
            hp: 60,
            damagePerSecond: 0,
            coinsPerSecond: 0,
            energyPerSecond: 5,
            hidden: true,
            image: './wood-castle.png'
        },
        {
            name: 'Stone Castle',
            energyCost: 100,
            coinsCost: 100,
            previousBuilding: 'Wood Castle',
            hp: 120,
            damagePerSecond: 0,
            coinsPerSecond: 0,
            energyPerSecond: 10,
            image: './stone-castle.png'
        },
        {
            name: 'Silver Mine',
            energyCost: 30,
            coinsCost: 0,
            previousBuilding: null,
            hp: 30,
            damagePerSecond: 0,
            coinsPerSecond: 5,
            energyPerSecond: 0,
            image: './silver-mine.png'
        },
        {
            name: 'Gold Mine',
            energyCost: 60,
            coinsCost: 60,
            previousBuilding: 'Silver Mine',
            hp: 40,
            damagePerSecond: 0,
            coinsPerSecond: 10,
            energyPerSecond: 0,
            image: './gold-mine.png'

        },
        {
            name: 'Bow Tower',
            energyCost: 0,
            coinsCost: 30,
            previousBuilding: null,
            hp: 40,
            damagePerSecond: 5,
            coinsPerSecond: 0,
            energyPerSecond: 0,
            image: './bow-tower.png'
        },
        {
            name: 'Longbow Tower',
            energyCost: 60,
            coinsCost: 60,
            previousBuilding: 'Bow Tower',
            hp: 80,
            damagePerSecond: 10,
            coinsPerSecond: 0,
            energyPerSecond: 0,
            image: './longbow-tower.png'
        },
    ], [])

    const buildings = useMemo(
        () => {
            return allBuildings.map((building) => {
                building.buyable = true
                // on doit avoir assez de coins et d'energy
                if (building.coinsCost > currentCoins || building.energyCost > currentEnergy){
                    building.buyable = false
                    return building
                }

                // Si le batiment n'est pas une upgrade, la case doit être vide
                if (building.previousBuilding !== null && currentBuilding === null){
                    building.buyable = false
                    return building
                }

                // Si le batiment est une upgrade, la case doit contenir le previousBuilding
                const currentBuildingName = currentBuilding?.name ?? null
                if (building.previousBuilding !== currentBuildingName){
                    building.buyable = false
                }

                return building
            })
        }, [currentCoins, currentEnergy, currentBuilding, allBuildings])

    return {
        allBuildings,
        buildings
    }
}
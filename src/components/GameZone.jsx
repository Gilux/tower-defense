import {useEffect, useState} from "react";
import {GameInformations} from "./GameInformations.jsx";
import {Cell} from "./Cell.jsx";
import {useBuildings} from "../hooks/useBuildings.js";

export const GameZone = ({user, setUser, addResources, usedResources}) => {
    const rows = 21
    const cols = 29
    const center = {row: Math.ceil(rows / 2) - 1, col: Math.ceil(cols / 2) - 1}

    const [grid, setGrid] = useState(Array(cols * rows)
        .fill()
        .map((_, index) => {
            const row = Math.floor(index / cols)
            const col = Math.floor(index % cols)
            return {x: row, y: col}
        }));

    const [buildings, setBuildings] = useState([
        {
            id: Date.now(),
            name: 'Wood Castle',
            x: center.row,
            y: center.col,
            hp: 55,
        }
    ])

    const [gridWithBuildings, setGridWithBuildings] = useState([])

    useEffect(() => {
        setGridWithBuildings(grid.map((cell) => {
            return {
                ...cell,
                building: buildings.find((building) => building.x === cell.x && building.y === cell.y) ?? null
            }
        }))
    }, [grid, buildings])

    // const [monsters, setMonsters] = useState([{id: 1, row: 0, col: 0}, {id: 2, row: 19, col: 24}])

    const [buildOnCell, setBuildOnCell] = useState(false)


    const {buildings: availableBuildings} = useBuildings(user.coins, user.energy, buildOnCell?.building ?? null)
    const openBuildModal = (x, y) => {
        const cellData = gridWithBuildings.find((cell) => cell.x === x && cell.y === y) ?? null
        setBuildOnCell(cellData)
    }

    const handleChooseBuilding = (building) => {
        if (buildOnCell.building) {
            const buildingIdToUpdate = buildOnCell.building.id
            setBuildings(
                buildings.map((curBuilding) => {
                    return curBuilding.id === buildingIdToUpdate ? {
                        ...curBuilding,
                        name: building.name,
                        hp: building.hp
                    } : curBuilding
                })
            )
        } else {
            setBuildings([
                ...buildings,
                {
                    id: Date.now(),
                    name: building.name,
                    x: buildOnCell.x,
                    y: buildOnCell.y,
                    hp: building.hp,
                }
            ])
        }
        addResources(-building.coinsCost, -building.energyCost)
        console.log(building)
        usedResources(building.coinsPerSecond, building.energyPerSecond)

        setBuildOnCell(null)
    }

    return <>
        {buildOnCell && (
            <div className="build-modal">
                <header>
                    Build on {buildOnCell.x} / {buildOnCell.y}
                </header>
                <ul>
                    {availableBuildings.map(option => {
                            return !option.hidden &&
                                <li
                                    onClick={() => handleChooseBuilding(option)}
                                    key={option.name}
                                    style={{backgroundColor: `${option.buyable ? '#1555d8' : '#9f9f9f'}`}}
                                >{option.name} ({option.coinsCost} coins / {option.energyCost} energy)
                                </li>
                        }
                    )}
                </ul>
            </div>
        )}
        <div className="game_zone">
            {gridWithBuildings.map((cell, index) => (
                <Cell
                    key={`${cell.x}-${cell.y}`}
                    x={cell.x}
                    y={cell.y}
                    building={cell.building}
                    onBuildRequest={openBuildModal}
                />
            ))}
        </div>

    </>
}
import {startTransition, useCallback, useContext, useEffect, useState} from "react";
import {Cell} from "./Cell.jsx";
import {useBuildings} from "../hooks/useBuildings.js";
import { UserContext } from "../context/userContext.js";
import { Monster } from "./Monster.jsx";
import { useMonsters } from "../hooks/useMonsters.js";

export const GameZone = () => {
    const {user, setUser, addResources} = useContext(UserContext)

    const {buildingsNearMonster, buildingAdjacentToMonster} = useMonsters()

    const rows = 21
    const cols = 29
    const center = {y: Math.ceil(rows / 2) - 1, x: Math.ceil(cols / 2) - 1}

    const [grid, setGrid] = useState(Array(cols * rows)
        .fill()
        .map((_, index) => {
            const x = Math.floor(index % cols)
            const y = Math.floor(index / cols)
            return {x, y}
        }));

    const [monsters, setMonsters] = useState([
        {id: 1, x: 0, y: 0, speed: 0.01, headingX: center.x, headingY: center.y},
    ])

    const [buildings, setBuildings] = useState([
        {
            id: Date.now(),
            name: 'Wood Castle',
            x: center.x,
            y: center.y,
            hp: 60,
        },
    ])

    const [gridWithBuildings, setGridWithBuildings] = useState([])

    useEffect(() => {
        console.log('grid or buildings change')
        setGridWithBuildings(grid.map((cell) => {
            return {
                ...cell,
                building: buildings.find((building) => building.x === cell.x && building.y === cell.y) ?? null
            }
        }))
    }, [grid, buildings])

    

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('create new monster')
            setMonsters((monsters) => [
                ...monsters,
                {
                    id: monsters[monsters.length - 1]?.id + 1 || 1, // Handle cases where there are no monsters
                    x: -2,
                    y: Math.ceil(Math.random() * 30),
                    speed: 0.03,
                    headingX: center.x,
                    headingY: center.y,
                },
            ]);
        }, 5000);
    
        // Cleanup function to clear the interval when the component unmounts or re-renders
        return () => {
            // console.log('clean monsters interval');
            clearInterval(intervalId);
        };
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    

    useEffect(() => {
        // console.log("🚀 ~ buildings updated:", buildings);
    }, [buildings]);
    
    const moveMonster = useCallback((monsterId) => {
        // startTransition is used to batch updates : if there's too many monsters, React cannot follow the rhythm.
        startTransition(() => {
            setMonsters((prevMonsters) => {
                return prevMonsters.map((monster) => {
                    if (monster.id !== monsterId) return monster;
        
                    // Get the latest version of buildings using a functional update
                    let { headingX, headingY } = monster;
                    
                    console.log("🚀 ~ returnprevMonsters.map ~ buildings:", buildings)
                    const buildingsNearby = buildingsNearMonster(monster, buildings);
                    console.log("🚀 ~ returnprevMonsters.map ~ buildingsNearby:", buildingsNearby)
        
                    if (buildingsNearby.length >= 1) {
                        headingX = buildingsNearby[0].x;
                        headingY = buildingsNearby[0].y;
                    } else {
                        headingX = center.x
                        headingY = center.y
                    }
        
                    const deltaX = monster.x - headingX;
                    const deltaY = monster.y - headingY;
        
                    const newCoordinates = { x: monster.x, y: monster.y };
        
                    if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
                        if (Math.abs(deltaX) > Math.abs(deltaY)) {
                            newCoordinates.x = monster.x + monster.speed * Math.sign(deltaX) * -1;
                        } else {
                            newCoordinates.y = monster.y + monster.speed * Math.sign(deltaY) * -1;
                        }
                    }
        
                    return {
                        ...monster,
                        x: newCoordinates.x,
                        y: newCoordinates.y,
                        headingX,
                        headingY,
                    };
                });
            });
        })
    }, [buildings]);

    const attack = useCallback((monster) => {
        const adjacentBuilding = buildingAdjacentToMonster(monster, buildings) ?? null
        if(!adjacentBuilding) return

        setBuildings((prevBuildings) => {
            return prevBuildings.map((building) => {
                if(building.id !== adjacentBuilding.id) return building

                return {
                    ...building,
                    hp: building.hp - 1
                };
            });
        })
    }, [buildings, buildingAdjacentToMonster]);

    // check for dead buildings
    useEffect(() => {
        buildings.forEach((building) => {
            if(building.hp <= 0) {
                console.log('building dead')
                setBuildings((buildings) => buildings.filter((b) => b.id !== building.id ))
            }
        })
    }, [buildings])

    const [buildOnCell, setBuildOnCell] = useState(false)


    const {buildings: availableBuildings} = useBuildings(user.coins, user.energy, buildOnCell?.building ?? null)
    const openBuildModal = (x, y) => {
        const cellData = gridWithBuildings.find((cell) => cell.x === x && cell.y === y) ?? null
        setBuildOnCell(cellData)
    }

    const handleChooseBuilding = useCallback((building) => {
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

        setBuildOnCell(null)
    }, [buildings, addResources, buildOnCell])

    if(!user) {
        return <div>loading</div>
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
                                    
                                    key={option.name}
                                    style={{backgroundColor: `${option.buyable ? '#1555d8' : '#9f9f9f'}`}}
                                >
                                    <button
                                        onClick={() => handleChooseBuilding(option)}
                                        disabled={!option.buyable}
                                    >
                                        {option.name} ({option.coinsCost} coins / {option.energyCost} energy)
                                    </button>
                                </li>
                        }
                    )}
                </ul>
            </div>
        )}
        <div className="game_zone">
            <div className="grid">
                {gridWithBuildings.map((cell) => (
                    <Cell
                    key={`${cell.x}-${cell.y}`}
                    x={cell.x}
                    y={cell.y}
                    building={cell.building}
                    onBuildRequest={openBuildModal}
                    />
            ))}
            </div>
            <div className="monsters">
                <p>Monsters count : {monsters.length}</p>
                {monsters.map((m) => <Monster key={m.id} monster={m} moveMonster={moveMonster} attack={attack} /> )}
            </div>
        </div>

    </>
}
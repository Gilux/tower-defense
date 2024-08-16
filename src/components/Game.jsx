import {GameZone} from "./GameZone.jsx";
import {SelectBuilding} from "./SelectBuilding.jsx";
import {GameInformations} from "./GameInformations.jsx";

export const Game = ({user, setUser, addResources, usedResources}) => {

    return <>
        <img src="./logo.png" alt="" width={'200px'}/>
        <GameInformations user={user} setUser={setUser}/>
        <GameZone user={user} setUser={setUser} addResources={addResources} usedResources={usedResources}/>
        <SelectBuilding />
    </>
}
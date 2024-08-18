import {GameZone} from "./GameZone.jsx";
import {GameInformations} from "./GameInformations.jsx";

export const Game = () => {
    return <>
        <img src="./logo.png" alt="" width={'200px'}/>
        <GameInformations />
        <GameZone />
    </>
}
import {useEffect, useState} from "react";

export const Cell = ({x, y, onBuildRequest, building}) => {

    const handleClick = (e) => {
        onBuildRequest(x, y)
    }

    let bg = ''
    if (building) {

        switch (building.name) {
            case 'Wood Castle':
                bg = './wood-castle.png';
                break;
            case 'Stone Castle':
                bg = './stone-castle.png';
                break;
            case 'Silver Mine':
                bg = './silver-mine.png';
                break;
            case 'Gold Mine':
                bg = './gold-mine.png';
                break;
            case 'Bow Tower':
                bg = './bow-tower.png';
                break;
            case 'Longbow Tower':
                bg = './longbow-tower.png';
                break;
        }
    }

    return <>
        <div className={'cell'}
             onClick={handleClick}
        >
            {bg && (
                <img src={bg} alt={building.name} className={'img__building'}/>
            )}
        </div>

    </>
}
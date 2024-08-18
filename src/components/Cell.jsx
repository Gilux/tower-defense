import { Building } from "./Building";

export const Cell = ({x, y, onBuildRequest, building}) => {

    const handleClick = (e) => {
        onBuildRequest(x, y)
    }

    return <>
        <div className={'cell'}
             onClick={handleClick}
        >
            {building && (
                <Building building={building} />
            )}
        </div>

    </>
}
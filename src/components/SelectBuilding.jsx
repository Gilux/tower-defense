import {useState} from "react";

export const SelectBuilding = () => {
    const [types, setTypes] = useState(['Wood Castle', 'Stone Castle', 'Silver Mine', 'Gold Mine', 'Bow Tower', 'Longbow Tower'])
    const [isCheck, setIsCheck] = useState(false)

    const handleDrag = (e, type) =>{
        e.dataTransfer.setData('type', type)
    }

    return <>
        {isCheck && <>
            <div className="buildings">
                {types.map((type) => (
                    <div className="building" key={type} draggable={true} onDragStart={(e)=>handleDrag(e, type)}>
                        {type}
                    </div>
                ))}
            </div>
        </>}
        <div className="plus" onClick={()=>setIsCheck(!isCheck)}>+</div>
    </>
}
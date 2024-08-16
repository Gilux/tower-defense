import {useEffect, useState} from "react";

export const Timer = () => {
    const [time, setTime] = useState(0)

    useEffect(() => {
        let timer = setInterval(() => {
            setTime((time) => time + 1)
        }, 1000)
        return () => clearInterval(timer)
    })

    const format = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }


    return <div className="timer"><b>{format(time)}</b></div>
}
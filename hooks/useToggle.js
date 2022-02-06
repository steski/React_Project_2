import { useState } from "react";

export function useToggle(initialState, sound){
    const [value, setValue] = useState(initialState);
    const toggle = () => setValue((current) => !current);
    if(value===true){
        if(sound){
            sound.pause()
        };
    } else {
        if(sound){
            sound.play()
        };
    };
    return [value, toggle, setValue];
};
import { take } from "lodash";

export default function ship(id,length,isVertical=false,startCoordinates){


    const hitLocations = Array.from('o'.repeat(5));

    const hit = (position)=>{

        hitLocations[position]='x'

    }
    
    const isSunk = ()=>hitLocations.every((element)=> element==='x')

    const takenCells = (startPoint=startCoordinates)=>{

        let cells = [];
        for(let i = 0; i < length; i++){
            if(isVertical)
            cells.push((Number(startPoint)+i)*15);
            else
            cells.push(Number(startPoint)+i);
        }

        return cells
    }
    return{
        id,
        length,
        hit,
        isVertical,
        isSunk,
        hitLocations,
        takenCells,
        startCoordinates
  
    };

}









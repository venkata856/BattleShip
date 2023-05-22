export default function ship(id,length,isVertical=false,startCoordinates){


    const hitLocations = Array.from('o'.repeat(5));

    const hit = (position)=>{

        hitLocations[position]='x'

    }
    
    const isSunk = ()=>hitLocations.every((element)=> element==='x')

    const takenCells = (startCoordinates)=>{

        takenCells = [];

        return takenCells
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









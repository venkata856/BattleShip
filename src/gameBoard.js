import ship from "./ship";


export default function gameBoard(){
    const carrier = ship(1,5);
    const destroyer = ship(2,4);
    const guardShip = ship(3,3);
    const frigate = ship(4,2);

    return {
        ships:[carrier,destroyer,guardShip,frigate],
    }

}
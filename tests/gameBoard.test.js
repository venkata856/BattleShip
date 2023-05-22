import gameBoard from "../src/gameBoard";



describe("test gameBoard", ()=>{


   test(" createGameBoard " , ()=>{
    const board=gameBoard();

    expect(board.ships[0].length).toEqual(5);
   })

   test(" check ship sunk " , ()=>{
    const board=gameBoard();

    expect(board.ships[0].isSunk()).toBeFalsy();
   })

   test(" check damage " , ()=>{
    const board=gameBoard();

    board.ships[3].hit(0);

    expect(board.ships[3].isSunk()).toBeFalsy();
   })

   test("check second ship " , ()=>{
    const board=gameBoard();

    

    expect(board.ships[1].length).toEqual(4);
   })
})
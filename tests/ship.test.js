import ship from "../src/ship";


describe("ship testing function ", ()=> {
    test("check ship creation ",()=>{
        const carrier = ship(1,5);

        expect(carrier.length).toEqual(5);
    })

    test("check ship damage",()=>{
        const carrier = ship(1,3);
        carrier.hit(0)

        expect(carrier.isSunk()).toBeFalsy();
    })

    test("check ship sunk ",()=>{
        const carrier = ship(1,5);
        carrier.hit(0)
        carrier.hit(1)
        carrier.hit(2)
        carrier.hit(3)
        carrier.hit(4)
        

        expect(carrier.isSunk()).toBeTruthy();
    })

    test("check ship sunk ",()=>{
        const carrier = ship(1,5);
        carrier.hit(3)
        carrier.hit(1)
        carrier.hit(2)


        expect(carrier.isSunk()).toBeFalsy();
    })
})

export default function ship(id,name, length){

    let start
    let isHorizontal
    return{
        length,
        name,
        id,
        setStart(s){
            start = s;
        },

        getStartCoOrdinates(){
            return start;
        },
        setAlignment(align){

            isHorizontal = align;
        },
        getAlignment(){

            return isHorizontal;
        },

    };

}









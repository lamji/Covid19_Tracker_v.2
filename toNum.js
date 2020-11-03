export default function toNum(str){
    const arr = [...str]
    //filtering array and remove comma
    const filteredArr = arr.filter(element => element !== ",")
    //combining after filtering
    return parseInt(filteredArr.reduce((x,y) => x + y))
}

// sanitizing data or converting string to plain numbers
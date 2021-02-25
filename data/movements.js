const fs = require('fs')
const file = "./data/movements.json"
/* GET
params */
const getMovements = () => {
    const data = fs.readFileSync(file)
    const movements = JSON.parse(data)
    //console.log(movements)
    const results = movements
    //console.log(results)
    return results
}
/* GET
params year, month */
const getMovementsPerMonth = (year, month) => {
    const data = fs.readFileSync(file)
    const movements = JSON.parse(data)
    //console.log(movements)
    const results = movements.filter( (movement) => {
        const parsedDate = new Date(movement.exp_date)
        //console.log(parsedDate)
        const parsedYear = Number(parsedDate.getFullYear())
        //console.log(parsedYear)
        const parsedMonth = Number(parsedDate.getMonth()) + 1
        //console.log(parsedMonth)
        if (parsedYear == year && parsedMonth == month ) {
            //console.log(movement.id)
            return movement
        }
    })
    //console.log(results)
    return results
}
/* GET
params movement_id */
const getMovementsByMovId = (id) => {
    const data = fs.readFileSync(file)
    const movements = JSON.parse(data)
    //console.log(movements)
    const results = movements.filter( (movement) => {
        if (movement.id == id) {
            //console.log(movement.id)
            return movement
        }
    })
    //console.log(results)
    return results
}
/* POST
params type, category, description, exp_date, mount */
const insertMovement = (type, category, description, exp_date, mount) => {
    const nextId = function (){
        const movements = getMovements()
        //console.log(movements)
        let newId = 1
        if(movements.length > 0){
            newId = movements[movements.length - 1].id + 1
        }
        return newId
    }
    const movement = {
        id: nextId(),
        type: type,
        category: category,
        description: description,
        exp_date: exp_date,
        com_date: null,
        status: "PENDIENTE",
        mount: Number(mount)
    }
    let completeFile = fs.readFileSync(file)
    completeFile = JSON.parse(completeFile)
    completeFile.push(movement)
    fs.writeFileSync(file, JSON.stringify(completeFile))
}
/* PATCH
params id, type, category, description, exp_date, mount */
const updateMovementByMovId = (id, type, category, description, exp_date, mount) => {
    let movement = {
        id: id,
        type: type,
        category: category,
        description: description,
        exp_date: exp_date,
        com_date: null,
        status: "PENDIENTE",
        mount: Number(mount)
    }
    let completeFile = fs.readFileSync(file)
    completeFile = JSON.parse(completeFile)
    //console.log(completeFile)
    for (let mov of completeFile){
        //console.log(mov)
        if(mov.id == id){
            let index = completeFile.indexOf(mov)
            //console.log(index)
            completeFile.splice(index, 1, movement)
        }
    }
    fs.writeFileSync(file, JSON.stringify(completeFile))
}
/* PATCH
params id */
const computeMovementByMovId = (id) => {
    const today = new Date()
    /* let com_date = today.getFullYear() + '-' + (Number(today.getMonth()) + 1) + '-' + today.getDate() */
    let com_date = today.toISOString().slice(0,10)
    //console.log(com_date)
    const status = 'COMPUTADO'
    let movement = getMovementsByMovId(id)
    //console.log(movement)
    movement[0].com_date = com_date
    movement[0].status = status
    //console.log(movement[0])
    let completeFile = fs.readFileSync(file)
    completeFile = JSON.parse(completeFile)
    //console.log(completeFile)
    for (let mov of completeFile){
        //console.log(mov)
        if(mov.id == id){
            let index = completeFile.indexOf(mov)
            //console.log(index)
            completeFile.splice(index, 1, movement[0])
        }
    }
    fs.writeFileSync(file, JSON.stringify(completeFile))
}
/* DELETE
params id */
const deleteMovementByMovId = (id) => {
    let completeFile = fs.readFileSync(file)
    completeFile = JSON.parse(completeFile)
    //console.log(completeFile)
    for (let mov of completeFile){
        //console.log(mov)
        if(mov.id == id){
            let index = completeFile.indexOf(mov)
            //console.log(index)
            completeFile.splice(index, 1)
        }
    }
    fs.writeFileSync(file, JSON.stringify(completeFile))
}
module.exports = { getMovements, getMovementsByMovId, insertMovement, deleteMovementByMovId, updateMovementByMovId,
    getMovementsPerMonth, computeMovementByMovId }
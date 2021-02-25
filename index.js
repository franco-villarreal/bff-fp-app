const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const { getMovements, getMovementsByMovId, insertMovement, deleteMovementByMovId, updateMovementByMovId, 
    getMovementsPerMonth, computeMovementByMovId } = require('./data/movements.js')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

let response = {
    error: false,
    code: 200,
    message: ''
};

app.get('/', function (req, res) {
    response = {
        error: true,
        code: 200,
        message: '/'
    };
    res.send(response);
});
/* GET
params account_id */
app.get('/movements', function (req, res) {
    try {
        const movements = getMovements()
        response = {
            error: false,
            code: 200,
            message: movements
        }
        res.send(response);
    } catch (err) {
        response = {
            error: true,
            code: 500,
            message: err
        }
        const timestamp = new Date()
        console.log(`${timestamp} - error: \n${response.message}`)
        res.send(response);
    }
});
/* GET
params account_id */
app.get('/movements/filter/', function (req, res) {
    try {
        const movements = getMovementsPerMonth(req.query.year, req.query.month)
        response = {
            error: false,
            code: 200,
            message: movements
        }
        res.send(response);
    } catch (err) {
        response = {
            error: true,
            code: 500,
            message: err
        }
        const timestamp = new Date()
        console.log(`${timestamp} - error: \n${response.message}`)
        res.send(response);
    }
});
/* GET
params movement_id */
app.get('/movements/:id', function (req, res) {
    try {
        const movement = getMovementsByMovId(req.params.id)
        response = {
            error: false,
            code: 200,
            message: movement
        }
        res.send(response);
    } catch (err) {
        response = {
            error: true,
            code: 500,
            message: err
        }
        const timestamp = new Date()
        console.log(`${timestamp} - error: \n${response.message}`)
        res.send(response);
    }
});
/* POST
params type, category, description, mount */
app.post('/movements/create', function (req, res) {
    try {
        const movement = insertMovement(req.body.type, req.body.category, req.body.description, 
            req.body.expDate, req.body.mount)
        response = {
            error: false,
            code: 200,
            message: movement
        }
        res.send(response);
    } catch (err) {
        response = {
            error: true,
            code: 500,
            message: err
        }
        const timestamp = new Date()
        console.log(`${timestamp} - error: \n${response.message}`)
        res.send(response);
    }
});
/* PUT
params account_id, movement_id, type, category, description, exp_date, com_date, status, mount */
app.patch('/movements/:id/update', function (req, res) {
    try {
        const movement = updateMovementByMovId(req.params.id, req.body.type,
            req.body.category, req.body.description, req.body.expDate, req.body.mount)
        response = {
            error: false,
            code: 200,
            message: movement
        }
        res.send(response);
    } catch (err) {
        response = {
            error: true,
            code: 500,
            message: err
        }
        const timestamp = new Date()
        /* console.log(`${timestamp} - error: \n${response.message.sqlMessage}`) */
        console.log(`${timestamp}\n${response.message}`)
        res.send(response);
    }
});
/* PUT
params account_id */
app.patch('/movements/:id/compute', function (req, res) {
    try {
        const movement = computeMovementByMovId(req.params.id)
        response = {
            error: false,
            code: 200,
            message: movement
        }
        res.send(response);
    } catch (err) {
        response = {
            error: true,
            code: 500,
            message: err
        }
        const timestamp = new Date()
        console.log(`${timestamp} - error: \n${response.message}`)
        res.send(response);
    }
});
/* DELETE
params account_id, movement_id */
app.delete('/movements/:id/delete', function (req, res) {
    try {
        const movement = deleteMovementByMovId(req.params.id)
        response = {
            error: false,
            code: 200,
            message: movement
        }
        res.send(response);
    } catch (err) {
        response = {
            error: true,
            code: 500,
            message: err
        }
        const timestamp = new Date()
        console.log(`${timestamp} - error: \n${response.message}`)
        res.send(response);
    }
});

app.listen(3000, () => {
    const today = new Date()
    console.log(today + ' - bff-pf-app is running');
});


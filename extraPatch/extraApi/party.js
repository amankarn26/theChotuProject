const express = require('express');
const router = express.Router();

const pool = require('../database/dbfile')

router.get('/', (req, res) => {
    pool.query('SELECT * FROM party ', (error, results) => {
        if (error) {
            res.status(400).send({
                error: error.message
            });
        }
        res.status(200).json(results.rows)
    })
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM party WHERE id = $1', [id], (error, results) => {
        if (error) {
            res.status(400).send({
                error: error.message
            });
        }
        res.status(200).json(results.rows)
    })
});

router.post('/', (req, res) => {
    const { name, phone, dob, address, status } = req.body
    let role = 'cust'
    let login = 0;

    pool.query('INSERT INTO party (name, phone, dob, address, status) VALUES ($1, $2, $3, $4, $5) RETURNING id', [name, phone, dob, address, status], (error, results) => {
        if (error) {
            res.status(400).send({
                error: error.message
            });
        }
        res.status(200).json({
            success: "Customer Created.",
            result: results.rows
        })
    })

});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { status } = req.body

    pool.query(
        'UPDATE customer party status = $1 WHERE id = $2',
        [status, id],
        (error, results) => {
            if (error) {
                res.status(400).send({
                    error: error.message
                });
            }
            res.status(200).send(`Data modified with ID: ${id}`)
        }
    )
});



module.exports = router;
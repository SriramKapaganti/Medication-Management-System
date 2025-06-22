

const express = require('express');
const db = require ('../db/database');
const router = express.Router();
const app = express()
const cors = require('cors');
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
//Post Medicine Query

router.post('/',  (request, response)=>{
    const {user_id, name, dosage, frequency} = request.body
    if(!user_id || !name || !dosage || !frequency){
        response.status(400).json({error: "ALL FIELD ARE MANDATORY"})
    }

    const saveMedToDBQuery = `
        INSERT INTO
        medications(user_id, name, dosage, frequency)
        VALUES
        (?, ?, ?, ?)
    `;
    db.run(saveMedToDBQuery, [user_id, name, dosage, frequency],  (err) => {
        if(err){
            return response.status(500).json({error: err.message})
        }
        response.status(201).json({message: 'Medication Assigned' })
    });
});

//User Medication

router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;

    const getMedicineQuery = `SELECT 
                    m.id, 
                    m.name, 
                    m.dosage, 
                    m.frequency,
                    COALESCE(l.taken, 0) AS taken
                    FROM medications m
                    LEFT JOIN (
                    SELECT medication_id, taken
                    FROM medication_logs
                    WHERE date = DATE('now')
                    ) l ON m.id = l.medication_id
                    WHERE m.user_id = ?
                    `;

        db.all(getMedicineQuery, [user_id], (err, rows) => {
        if(err) return res.status(500).json({error: err.message});
        if(rows === ""){
            res.status(404).json({error: 'Medication Not Found'});
        }
        console.log(rows)
        return res.status(200).json(rows);
    });
});


//Mark medication as taken

router.post('/:medication_id/log', (request, response)=>{
    const {medication_id, user_id} = request.params
    const date = new Date().toISOString().slice(0, 10)

    const query = `
        INSERT INTO
        medication_logs (medication_id, date, taken)
        VALUES
        (?, ?, 1)
    `;

    db.run(query, [medication_id, date], function(err){
        if(err) return response.status(500).json({error: err.message})
        response.status(201).json({message: 'Medication marked as taken'})
    })
})

// DELETE MEDICINE OF USER

router.delete('/:medication_id', (req, res)=>{
    const {medication_id} = req.params
    const deleteQuery = `DELETE FROM medications WHERE id=?`
    db.run(deleteQuery, [medication_id], function(err){
        if(err){
            return res.status(500).json({error:'Failed to delete medication'})
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Medication not found' });
        }
        res.status(200).json({ message: 'Medication deleted successfully' })
    })
})



module.exports = router

const pool = require('../utils/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const registerUser = async (req, res) => {
    try{
        const { name, username, email, password } = req.body
        var pwd = await bcrypt.hash(password, 5);
        pool.query('BEGIN', err => {
            pool.query(`SELECT id FROM users WHERE email=$1`, [email], function(err, result) {
                if(result.rowCount !== 0){
                    res.status(409).json({success: false, message: 'User with this email already exists'})
                }
                else{
                    pool.query(`SELECT id FROM users WHERE username=$1`, [username], function(err, result) {
                        if(result.rowCount !== 0){
                            res.status(408).json({success: false, message: 'User with this username already exists'})
                        }
                        else{
                            pool.query(`INSERT INTO users (id, name, username, email, password) VALUES ($1, $2, $3, $4, $5)`, [uuidv4(), name, username, email, pwd], function(err, result) {
                                if(err){
                                    console.log(err)
                                }else{
                                    pool.query('COMMIT', err => {
                                        if (err) {
                                            console.error('Error committing transaction', err.stack)
                                        }
                                    })

                                    res.status(200).json({success: true, message: 'User Created', session: req.session.user})
                                }
                            })
                        }
                    })
                }
            })
        })
    }
    catch(err){
        console.log(err)
    }
}

const loginUser = async (req, res) => {
    const {username, email, password} = req.body

    try {
        let data = await pool.query(`SELECT password, username FROM users WHERE email = $1`, [email])

        if(data.rowCount === 0){
            res.status(403).json({success: false, message: 'User does not exist'})
        }
        const user = data.rows[0]

        const matches = bcrypt.compareSync(password, user.password)

        if(!matches)
            res.status(401).json({success: false, message: 'Wrong Password'})
        else{
            req.session.user = {
                id: user.id,
                username: username,
            }

            res.json({success: true, message: 'Logged In'})
        }

    } catch (error) {
        console.error(error)
        return res.sendStatus(403)
    }
};

module.exports = {
    getUsers,
    registerUser,
    loginUser
}
const jwt = require('jsonwebtoken');
require('dotenv').config();


function checkToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({msg: "Denied access!"});
    }

    try {
        const secret = process.env.SECRET;
        const decoded = jwt.verify(token, secret); 

        req.user = decoded;
        next();
    } catch(error) {
        console.log(error);

        res.status(400).json({
            msg: 'Invalid token!',
        })
    }
}

module.exports = {checkToken};

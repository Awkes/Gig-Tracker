const jwt = require('jsonwebtoken');
const { secret } = require('../../config/auth');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  
  if (!token) return res.status(403).send({ message: 'No token provided!'});

  jwt.verify(token, secret, (err, decoded) => {
    if (err) res.status(401).send({ message: 'Unauthorized!'});
    req.userId = decoded.id;
    next();
  })
}

function verifyUser(req, res, next) {
  
  next();
}

module.exports = { verifyToken, verifyUser };
module.exports = function verifyUser(id, req, res) {
  if (id !== req.userId) {
    res.status(401).send({ message: 'User is not authorized for this action.'})
    return false;
  }
  return true;
}

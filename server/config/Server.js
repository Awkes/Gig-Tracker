const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

function listen(app) {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

module.exports.Server = { listen };

const express = require('express');
const path = require('path');

const app = express();
const db = require('./config/db_config');
const PORT = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listen on port-${PORT}`);
  })
}).catch((err) => {
  console.log(`DB connection failed`);
  console.error(err)
})

const executeAbleMiddleware = require('./middleware/middleware');
executeAbleMiddleware(app);
const executeAbleRoute = require('./api/routes/route');
executeAbleRoute(app);

app.use('/upload_images', express.static(path.join(__dirname, 'upload_images')));
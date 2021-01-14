const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

require("./app/routes/userRoutes.js")(app);
require("./app/routes/accountRoutes.js")(app);

app.use('index', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

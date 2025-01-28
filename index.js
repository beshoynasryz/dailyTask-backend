import express from 'express';
import bootstrap from './src/app.controller.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

bootstrap(app, express);
app.listen(PORT, () => {
    console.log(`app listening on PORT ${PORT}!`);
});

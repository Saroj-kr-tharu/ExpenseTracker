
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Routes = require('./Route/index');
const { PORT } = require('./config/serverConfig');
const cors = require('cors');


const serverSetupAndStart = () => {
    const app = express();


     app.use(cors({
        origin: function (origin, callback) {
            const allowedOrigins = ['http://localhost:5173'];
            
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
    }));


    // middlewares
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());
    app.use('/api', Routes);


    


    app.listen(PORT, () => {
        console.log(`Server is Running at port http://localhost/${PORT}`);

    })
}


serverSetupAndStart();
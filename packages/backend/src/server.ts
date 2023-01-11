import { createExpressServer, useExpressServer } from 'routing-controllers';
import { WeatherController } from './controllers/WeatherController';
import { TestController } from './controllers/TestController';
import { port } from "./config";
import cors from "cors";
import express from 'express';

const Server = express()
Server.use(cors())
// creates express app, registers all controller routes and returns you express app instance
useExpressServer(Server,{
    // cors: true,
    routePrefix: "/api",
    classTransformer: true,
    controllers: [WeatherController, TestController], // we specify controllers we want to use
});


// run express application on port 3000
Server.listen(port, () => {
    console.log(`Server is running on ${port}`)
});
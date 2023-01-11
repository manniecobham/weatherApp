import { createExpressServer } from 'routing-controllers';
import { WeatherController } from './controllers/WeatherController';
import { port } from "./config"

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    routePrefix: "/api",
    classTransformer: true,
    controllers: [WeatherController], // we specify controllers we want to use
});

// run express application on port 3000
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});
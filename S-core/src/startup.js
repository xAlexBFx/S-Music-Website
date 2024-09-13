import { app } from './app.js'
import { connectDB } from './db.js'
import Config from './config.js';
connectDB();

const serverPort = Config.appConfig.port;
const serverIP = Config.appConfig.ip;

app.listen(serverPort, serverIP)
    console.log(`>>> API at http://${serverIP}:${serverPort}`);
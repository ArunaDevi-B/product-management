import express, { Request, Response } from "express";
import routes from './src/routes/route';
import { connectDB } from './src/config/mongoose';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// Load environment variables
dotenv.config();

const port = process.env.PORT || 9000;
const app = express();

class App {
    constructor() {
        dotenv.config();
        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.use(routes);
        connectDB();
    }

    public init(): void {
        app.get('/', (req: Request, res: Response) => {
            console.log("server health is good!");
            res.send("server health is good!");
        });

        app.listen(port, () => {
            console.log(`Server connected successfully and running on port: ${port}`);
        });
    }
}

process.on('uncaughtException', (err: Error) => {
    console.error('Uncaught exception', err);
});

const appInit = new App();
appInit.init();
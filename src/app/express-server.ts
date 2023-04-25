import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { MapsAppResponse } from "../models/maps-app-response";
import { processCommand } from "../vendor/cvat";
import { Command } from "../models/command";
import { CvatResponse } from "../models/cvat-response";

const app = express();
const port = 3000;
const corsOptions = {
    origin: "https://genshin.gamedot.org",
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err);
    }
    const response: MapsAppResponse = {
        header: {
            isSuccessful: false,
            code: 500,
            message: "",
        },
        data: {
            status: false,
            data: 0,
        },
    };

    return res.status(200).json(response);
});

app.post("/process", (req: Request, res: Response) => {
    const body: Command = req.body as Command;
    const cvatResponse: CvatResponse = processCommand(body);

    res.json(cvatResponse);
});

export const start = () => {
    app.listen(port, () => {
        console.log(`Server start on port ${port}`);
    });
};

import express, { NextFunction, Request, Response } from "express";
import { MapsAppResponse } from "../models/maps-app-response";
import { processCommand } from "../vendor/cvat";
import { Command } from "../models/command";
import { CvatResponse } from "../models/cvat-response";

const app = express();
const port = 3000;

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
    res.status(200).json(response);

    return;
});

app.get("/process", (req: Request, res: Response) => {
    const body: Command = req.body as Command;
    const cvatResponse: CvatResponse = processCommand(body);

    res.json(cvatResponse);
});

export const start = () => {
    app.listen(port, () => {
        console.log(`Listen : ${port}`);
    });
};

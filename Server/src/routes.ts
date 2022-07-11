import {
    findStations,
    findOneStation,
    createStation,
    updateStation,
    deleteStation
} from "./services/station";
import {validateMetric, validateStation} from "./validators/index";
import { Request, Response, Express } from 'express';
import {
    findMetrics
} from "./services/metric";

export function routes(app: Express) {
    app.get('/stations', (req: Request, res: Response) =>
        findStations(res));
}
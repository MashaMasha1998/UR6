import {Metric} from "../entities/metric";
// import {Station} from "../entities/station";
import {Response} from "express";

function findMetrics(res: Response) {
    Metric.find().then(metrics => {
        res.send(metrics);
    }).catch(err => console.error(err));
}

// function createMetric(req: Request, res: Response) {
//     Station.findOne(req.params.id).then(station => {
//         if (station != null) {
//             const metric = Metric.merge(new Metric(), req.body);
//             metric.station = station;
//             return metric.save().then(metric => {
//                 res.send(metric);
//             });
//         } else
//             res.sendStatus(404);
//     }).catch(err => console.error(err));
// };

export {
    findMetrics
}
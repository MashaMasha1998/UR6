import {Station} from "../entities/station";
import {Response} from "express";

function findStations(res: Response) {
    Station.find().then(stations => {
        res.send(stations);
    }).catch(err => console.error(err));
}

function findOneStation(id: number, res: Response) {
    Station.findOne(id).then(station => {
        if (station != null)
            res.send(station);
        else
            res.sendStatus(404);
    }).catch(err => console.error(err));
}

function createStation(stationBody: Object, res: Response) {
    const station = new Station();
    Station.merge(station, stationBody);
    station.save().then(station => {
        res.send(station);
    }).catch(err => console.error(err));
}

function updateStation(id: number, stationBody: Object, res: Response) {
    Station.findOne(id).then(station => {
        if (station != null) {
            Station.merge(station, stationBody);
            return station.save().then(station => {
                res.send(station);
            })
        }
        res.sendStatus(404);
    }).catch(err => console.error(err));
}

function deleteStation(id: number, res: Response) {
    Station.findOne(id).then(station => {
        if (station != null)
            return station.remove().then(() => {
                res.sendStatus(204);
            });
        res.sendStatus(404);
    }).catch(err => console.error(err));
}

export {
    findStations,
    findOneStation,
    createStation,
    updateStation,
    deleteStation
}
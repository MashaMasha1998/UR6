import { BaseEntity, Column, Entity, getConnectionManager, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Request, Response } from 'express';
import * as bp from "body-parser";

const ex = require('express');

const application = ex();
const cors = require('cors');

application.use(ex.json());

application.use(cors());

application.use(bp.json())

application.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

@Entity('stations')
class Station extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar', { length: 200})
    address: string;
    
    @Column('boolean')
    status: boolean;

    @OneToMany(() => Metric, metric => metric.station, {
        onDelete: 'CASCADE'
    })
    metrics: Metric[];
}


    @Entity("metrics")
    export class Metric extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('double')
    value: number;

    @ManyToOne(() => Station, station => station.metrics, {
        onDelete: 'CASCADE'
    })

    @JoinColumn({ name: 'station_id' })
    station: Station;
   }


const connection = getConnectionManager().create ({
    host: 'localhost',
    username: 'root',
    password: 'MashaMasha/07041998',
    database: 'test1',
    synchronize: true,
    type: 'mysql',
    entities: [Station, Metric]
});

function validate(req: Request, res: Response, next) {
    const station = req.body;
    if (station.hasOwnProperty('address') && station.hasOwnProperty('status')) {
        next();
    } else {
        res.sendStatus(400);
    }
}

connection.connect().catch(err => console.error(err)); 

application.get('/stations', (req: Request, res: Response) => {
        Station.find().then(stations => {
            res.send(stations);
        }).catch(err => console.error(err));
    });

application.get('/stations/:id', (req: Request, res: Response) => {
    Station.findOne(req.params.id).then(station => {
        if (station != null)
           res.send(station);
        else
           res.sendStatus(404);
    }).catch(err => console.error(err));
  });
    
application.post('/stations', (req: Request, res: Response) => {
    const station: Station = Station.merge(new Station(), req.body);
    station.save().then(station => {
        res.send(station);
    }).catch(err => console.error(err));
});   

application.delete('/stations/:id', validate, (req: Request, res: Response) => { 
    Station.findOne(req.params.id).then(station => {
        if (station != null) 
           return station.remove().then(() => {
            res.sendStatus(204);
           });
           res.sendStatus(404);
    }).catch(err => console.error(err));
  });

application.put('/stations/:id', (req: Request, res: Response) => { 
    Station.findOne(req.params.id).then(station => {
        if (station != null)
           Station.merge(station, req.body)
           return station.save().then(() => {
            res.send(station);
           });
           res.sendStatus(404);
    }).catch(err => console.error(err));
  });

  application.post('/stations/:id/metrics', (req: Request, res: Response) => {
    Station.findOne(req.params.id).then(station => {
        if (station != null) {
            const metric = Metric.merge(new Metric(), req.body);
           metric.station = station;
            return metric.save().then(metric => {
                res.send(metric);
            });
        } else
            res.sendStatus(404);
    }).catch(err => console.error(err));
});

// application.get('/metrics', (req: Request, res: Response) => {
//     getRepository(Metric)
//     .createQueryBuilder('metric')
//     .leftJoinAndSelect('metric.station', 'station')
//     .where('station.status = true')
//     .getMany().then(metric => {
//         console.log(metric);
//         res.send(metric);
//     }).catch(err => console.error(err));
// });

// application.get('/metrics/avg', (req: Request, res: Response) => {
//     getRepository(Metric)
//     .createQueryBuilder('metric')
//     .select('avg(metric.value)')
//     .leftJoinAndSelect('metric.station', 'station')
//     .where('station.status = true')
//     .groupBy('station.id')
//     .getRawMany().then(metrics => {
//         console.log(metrics);
//         res.send(metrics);
//     }).catch(err => console.error(err));
// });

application.listen(8080, () => console.log("Good Lesson"));
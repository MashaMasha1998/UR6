import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Station } from "./station";

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
stations: Station [];
}
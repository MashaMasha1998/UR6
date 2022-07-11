import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Metric } from "./metric";

@Entity('stations')
export class Station extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar', { length: 200})
    address: string;
    
    @Column('boolean')
    status: boolean;

    @OneToMany(() => Metric, metric => metric.stations, {
        onDelete: 'CASCADE'
    })
    metrics: Metric[];
}

   
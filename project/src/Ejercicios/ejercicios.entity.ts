import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RutinaEntity} from "../Rutina/rutina.entity";

@Entity('ejercicio')
export class EjercicioEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 500 })
    nombreEjercicio: string;

    @Column({length: 500})
    descripcionEjercicio: string;

    @Column({ length: 2000 })
    urlImg: string;

    @ManyToOne(
        type => RutinaEntity,
        rutina => rutina.ejercicios)
    rutinaId: RutinaEntity;
}
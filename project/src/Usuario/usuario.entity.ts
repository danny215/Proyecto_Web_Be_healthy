import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RutinaEntity} from "../Rutina/rutina.entity";
import {NutricionEntity} from "../Nutricion/nutricion.entity";

@Entity('usuario')
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 500 })
    usuario: string;

    @Column({ length: 500 })
    contrasena: string;

    @Column({ length: 2000 })
    urlImg: string;

    @OneToMany(
        type => RutinaEntity,
        rutinaU => rutinaU.usuarioId)
    rutinas: RutinaEntity [];

    @OneToMany(
        type => NutricionEntity,
        nutricionU => nutricionU.usuarioId)
    nutricionU: NutricionEntity [];
}
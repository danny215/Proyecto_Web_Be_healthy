import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {EjercicioEntity} from "../Ejercicios/ejercicios.entity";

@Entity('rutina')
export class RutinaEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 500 })
    tipoEjercicio: string;

    @Column()
    peso: number;


    @Column({ length: 2000 })
    urlImg: string;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.rutinas)
    usuarioId: UsuarioEntity;


    @OneToMany(
        type => EjercicioEntity,
        ejercicios => ejercicios.rutinaId)
    ejercicios: RutinaEntity [];
}
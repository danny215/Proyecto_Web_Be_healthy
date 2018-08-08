import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {AlimentoEntity} from "../Alimentos/alimentos.entity";

@Entity('nutricion')
export class NutricionEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 500 })
    tipoAlimento: string;

    @Column({ length: 2000 })
    urlImg: string;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.nutricionU)
    usuarioId: UsuarioEntity;


    @OneToMany(
        type => AlimentoEntity,
        alimentos => alimentos.nutricionId)
    dieta: NutricionEntity [];
}
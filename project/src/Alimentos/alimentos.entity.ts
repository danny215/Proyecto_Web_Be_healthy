import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {NutricionEntity} from "../Nutricion/nutricion.entity";

@Entity('alimento')
export class AlimentoEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 500 })
    nombreAlimento: string;

    @Column()
    cantCalorias: number;

    @Column()
    cantProteinas: number;

    @Column({ length: 2000 })
    urlImg: string;

    @ManyToOne(
        type => NutricionEntity,
        nutricion => nutricion.dieta)
    nutricionId: NutricionEntity;
}
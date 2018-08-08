import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EjercicioEntity} from "./ejercicios.entity";
import {Like, Repository} from "typeorm";
import {RutinaEntity} from "../Rutina/rutina.entity";

@Injectable()
export class EjerciciosService {

    listaEjercicios = [
        {
            'id': 1,
            'nombreEjercicio': 'Press Militar',
            'descripcionEjercicio': '4 series de 8 repeticiones',
            'urlImg': 'https://www.gimnasioweb.com/imagenes/entradas/press-militar-sentado.jpg',
            'rutinaId': 1
        },
        {
            'id': 2,
            'nombreEjercicio': 'Sentadillas',
            'descripcionEjercicio': '3 series de 10 repeticiones',
            'urlImg': 'https://www.cambiatufisico.com/wp-content/uploads/Sentadilla-Profunda.jpg',
            'rutinaId': 3
        },
        {
            'id': 3,
            'nombreEjercicio': 'Press de banca',
            'descripcionEjercicio': '4 series de 10 repeticiones',
            'urlImg': 'https://mundoentrenamiento.com/wp-content/uploads/2017/11/Press-de-banca-agarre-cerrado.jpg',
            'rutinaId': 5
        },
        {
            'id': 4,
            'nombreEjercicio': 'Pectoral contractor',
            'descripcionEjercicio': '4 series de 12 repeticiones',
            'urlImg': 'https://www.gimnasioweb.com/imagenes/entradas/contractora.jpg',
            'rutinaId': 8
        },
        {
            'id': 5,
            'nombreEjercicio': 'Curl martillo',
            'descripcionEjercicio': '4 series de 8 repeticiones',
            'urlImg': 'https://www.cambiatufisico.com/wp-content/uploads/2011/03/Curl-con-mancuerna-alterno-agarre-martillo.jpg',
            'rutinaId': 8
        },
        {
            'id': 6,
            'nombreEjercicio': 'Curl concentrado en banco',
            'descripcionEjercicio': '4 series de 10 repeticiones',
            'urlImg': 'https://www.cambiatufisico.com/wp-content/uploads/2011/03/Curl-con-mancuernas-alterno-en-banco-inclinado.jpg',
            'rutinaId': 6
        },
        {
            'id': 7,
            'nombreEjercicio': 'Extension vertical con mancuerna',
            'descripcionEjercicio': '3 series de 10 repeticiones',
            'urlImg': 'http://www.musculaciontotal.com/wp-content/uploads/2014/10/extension-vertical-para-entrenar-triceps.jpg',
            'rutinaId': 7
        },
        {
            'id': 8,
            'nombreEjercicio': 'Press en polea',
            'descripcionEjercicio': '4 series de 8 repeticiones',
            'urlImg': 'https://www.sportlife.es/media/cache/big/upload/images/article/14069/article-ejercicios-triceps-gimnasio-595a0d67b5877.jpg',
            'rutinaId': 2
        },
        {
            'id': 9,
            'nombreEjercicio': 'Pull ups',
            'descripcionEjercicio': '3 series de 8 repeticiones',
            'urlImg': 'https://javierchirinos.com/wp-content/uploads/2016/10/wide-grip-pull-up-exercise_opt.jpg',
            'rutinaId': 4
        },
        {
            'id': 10,
            'nombreEjercicio': 'Polea al pecho',
            'descripcionEjercicio': '4 series de 8 repeticiones',
            'urlImg': 'https://i0.wp.com/cronosfit.com/wp-content/uploads/2013/11/Polea-al-Pecho-para-desarrollar-la-espalda.jpg?resize=500%2C363&ssl=1',
            'rutinaId': 1
        },
        {
            'id': 11,
            'nombreEjercicio': 'Crunch con cable',
            'descripcionEjercicio': '4 series de 12 repeticiones',
            'urlImg': 'https://www.mipielsana.com/wp-content/uploads/2012/04/Cable-Crunch.jpg',
            'rutinaId': 2
        },
        {
            'id': 12,
            'nombreEjercicio': 'Elevacion de piernas',
            'descripcionEjercicio': '3 series de 12 repeticiones',
            'urlImg': 'https://ejerciciosencasa.es/wp-content/uploads/2013/11/Elev-de-piernas.jpg',
            'rutinaId': 5
        },
    ];

    constructor(@InjectRepository(EjercicioEntity)
                private readonly ejercicioRepository: Repository<EjercicioEntity>) {
    }

    crearEjercicios() {
        for (var ejercicios in this.listaEjercicios) {
            const ejercicio = new EjercicioEntity();
            ejercicio.id = this.listaEjercicios[ejercicios].id;
            ejercicio.nombreEjercicio = this.listaEjercicios[ejercicios].nombreEjercicio;
            ejercicio.descripcionEjercicio = this.listaEjercicios[ejercicios].descripcionEjercicio;
            ejercicio.urlImg = this.listaEjercicios[ejercicios].urlImg;
            const rutina = new RutinaEntity();
            rutina.id = this.listaEjercicios[ejercicios].rutinaId;
            ejercicio.rutinaId = rutina;
            this.ejercicioRepository.save(ejercicio);
        }
        return this.ejercicioRepository.find();
    }

    async traerTodos(): Promise<EjercicioEntity[]> {
        return await this.ejercicioRepository.find();
    }

    async buscar(parametroBusqueda) {

        return await this.ejercicioRepository.find({nombreEjercicio: Like("%" + parametroBusqueda + "%")});
    }

    async traerEjerciciosPorRutina(rutinaID): Promise<EjercicioEntity[]> {
        return await this.ejercicioRepository.find({where: {rutinaId: rutinaID}});
    }

    async traerEjercicioPorId(idEjercicio): Promise<EjercicioEntity[]> {
        return await this.ejercicioRepository.find({where: {id: idEjercicio}});
    }

}
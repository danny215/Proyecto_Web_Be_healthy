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
            'nombreEjercicio': 'Messi',
            'descripcionEjercicio': 'Lionel Messi',
            'urlImg': 'https://www.diariogol.com/uploads/s1/57/29/84/9/leo-messi-dice-no_15_970x597.jpeg',
            'rutinaId': 1
        },
        {
            'id': 2,
            'nombreEjercicio': 'Ronaldo',
            'descripcionEjercicio': 'Cristiano Ronaldo',
            'urlImg': 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2018/07/18/15319267746680.jpg',
            'rutinaId': 3
        },
        {
            'id': 3,
            'nombreEjercicio': 'Valencia',
            'descripcionEjercicio': 'Antonio Valencia',
            'urlImg': 'https://s.hs-data.com/bilder/spieler/gross/25587.jpg',
            'rutinaId': 5
        },
        {
            'id': 4,
            'nombreEjercicio': 'Neymar',
            'descripcionEjercicio': 'Neymar da Silva',
            'urlImg': 'https://files.antena2.com.co/antena2/public/styles/imagen_despliegue/public/2018-07/neymar_psg_afp_0_0_0.jpg?itok=LjsU26K4',
            'rutinaId': 8
        },
        {
            'id': 5,
            'nombreEjercicio': 'Mbappe',
            'descripcionEjercicio': 'Kylian Mbappé',
            'urlImg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kylian_Mbapp%C3%A9_Russia_2018.jpg/245px-Kylian_Mbapp%C3%A9_Russia_2018.jpg',
            'rutinaId': 8
        },
        {
            'id': 6,
            'nombreEjercicio': 'Aguero',
            'descripcionEjercicio': 'Sergio Aguero',
            'urlImg': 'http://static.t13.cl/images/sizes/1200x675/1520791709-aguero.jpg',
            'rutinaId': 6
        },
        {
            'id': 7,
            'nombreEjercicio': 'Neuer',
            'descripcionEjercicio': 'Manuel Neuer',
            'urlImg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20180602_FIFA_Friendly_Match_Austria_vs._Germany_Manuel_Neuer_850_0723.jpg/245px-20180602_FIFA_Friendly_Match_Austria_vs._Germany_Manuel_Neuer_850_0723.jpg',
            'rutinaId': 7
        },
        {
            'id': 8,
            'nombreEjercicio': 'Ramos',
            'descripcionEjercicio': 'Sergio Ramos',
            'urlImg': 'https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/03/10/Recortada/930069748_20180310155538-kkSD-U441415399549d6H-992x558@LaVanguardia-Web.jpg',
            'rutinaId': 2
        },
        {
            'id': 9,
            'nombreEjercicio': 'Bacca',
            'descripcionEjercicio': 'Carlos Bacca',
            'urlImg': 'https://futbolete.com/wp-content/uploads/2016/11/carlos-bacca-milan-pescara.jpg',
            'rutinaId': 4
        },
        {
            'id': 10,
            'nombreEjercicio': 'Suarez',
            'descripcionEjercicio': 'Luis Suarez',
            'urlImg': 'https://www.donbalon.com/assets/images/noticias/78955_636676956570340017.jpg',
            'rutinaId': 1
        },
        {
            'id': 11,
            'nombreEjercicio': 'Navas',
            'descripcionEjercicio': 'Keylor Navas',
            'urlImg': 'https://cdn.futbolperuano.com/sdi/2018/07/19/keylor-navas-asi-se-despide-del-real-madrid-656561.jpg',
            'rutinaId': 2
        },
        {
            'id': 12,
            'nombreEjercicio': 'Rooney',
            'descripcionEjercicio': 'Wayne Rooney',
            'urlImg': 'https://cdn.images.express.co.uk/img/dynamic/67/590x/Wayne-Rooney-807732.jpg',
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
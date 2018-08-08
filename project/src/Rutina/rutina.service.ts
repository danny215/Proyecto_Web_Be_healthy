import { Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RutinaEntity} from "./rutina.entity";
import {Like, Repository} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";


@Injectable()
export class RutinaService {


    listaRutinas = [
        {'id': 1, 'tipoEjercicio': 'piernas', 'peso': 65, 'urlImg': 'https://http2.mlstatic.com/musculos-de-la-tabla-de-la-pierna-laminado-anatomia-por-anat-D_NQ_NP_695910-MCO26536156556_122017-F.jpg', 'usuarioId': 3},
        {'id': 2, 'tipoEjercicio': 'pecho', 'peso': 60, 'urlImg': 'http://images.slideplayer.es/27/9150743/slides/slide_88.jpg', 'usuarioId': 8},
        {'id': 3, 'tipoEjercicio': 'biceps', 'peso': 50, 'urlImg': 'https://www.cambiatufisico.com/wp-content/uploads/anatomia-biceps1.jpg', 'usuarioId': 2},
        {'id': 4, 'tipoEjercicio': 'hombros', 'peso': 40, 'urlImg': 'https://i.pinimg.com/originals/13/7a/13/137a135013730ceddbb88f636f5448ad.jpg', 'usuarioId': 6},
        {'id': 5, 'tipoEjercicio': 'triceps', 'peso': 35, 'urlImg': 'https://es.iliveok.com/sites/default/files/trehglavaya-myshca-plecha-triceps-plecha.jpg', 'usuarioId': 4},
        {'id': 6, 'tipoEjercicio': 'espalda', 'peso': 144, 'urlImg': 'https://www.calistenia.net/wp-content/uploads/2018/02/Musculos-Espalda-421x336.gif', 'usuarioId': 7},
        { 'id': 7, 'tipoEjercicio': 'abdomen', 'peso': 60, 'urlImg': 'https://i2.wp.com/gymworld.es/wp-content/uploads/2017/05/abdominal-diagram-with-ribs-tag-rib-cage-muscle-anatomy-human-anatomy-diagram1.jpg?fit=1667%2C1279', 'usuarioId': 5},
        { 'id': 8, 'tipoEjercicio': 'PSG', 'peso': 29, 'urlImg': 'https://upload.wikimedia.org/wikipedia/fr/thumb/8/86/Paris_Saint-Germain_Logo.svg/768px-Paris_Saint-Germain_Logo.svg.png', 'usuarioId': 1}
    ];

    constructor(@InjectRepository(RutinaEntity)
                private readonly rutinaRepository: Repository<RutinaEntity>){
    }

    crearRutina() {
        for(var rutinas in this.listaRutinas) {
            const rutina = new RutinaEntity();
            rutina.id = this.listaRutinas[rutinas].id;
            rutina.tipoEjercicio = this.listaRutinas[rutinas].tipoEjercicio;
            rutina.peso =this.listaRutinas[rutinas].peso;
            rutina.urlImg =  this.listaRutinas[rutinas].urlImg;
            const usuario = new UsuarioEntity();
            usuario.id = this.listaRutinas[rutinas].usuarioId;
            rutina.usuarioId = usuario;
            this.rutinaRepository.save(rutina);
        }
        return this.rutinaRepository.find();
    }

    async traerTodos(): Promise<RutinaEntity[]> {
        return await this.rutinaRepository.find();
    }

    async buscar(parametroBusqueda) {

        return await this.rutinaRepository.find({ tipoEjercicio: Like("%" + parametroBusqueda + "%") });
    }

    async traerRutinaPorUsuario(usuarioID): Promise<RutinaEntity[]> {
        return await this.rutinaRepository.find({where: {usuarioId: usuarioID}});
    }


}

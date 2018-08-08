import { Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RutinaEntity} from "./rutina.entity";
import {Like, Repository} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";


@Injectable()
export class RutinaService {


    listaRutinas = [
        {'id': 1, 'tipoEjercicio': 'FC Bacerlona', 'peso': 22, 'urlImg': 'https://upload.wikimedia.org/wikipedia/commons/4/47/Barcelona_fc_Logo.png', 'usuarioId': 3},
        {'id': 2, 'tipoEjercicio': 'Real Madrid', 'peso': 24, 'urlImg': 'https://vignette.wikia.nocookie.net/inciclopedia/images/4/4d/Real_madrid_logo.png/revision/latest?cb=20081102004028', 'usuarioId': 8},
        {'id': 3, 'tipoEjercicio': 'Juventus', 'peso': 22, 'urlImg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Juventus_FC_2017_logo.svg/2000px-Juventus_FC_2017_logo.svg.png', 'usuarioId': 2},
        {'id': 4, 'tipoEjercicio': 'Milan', 'peso': 21, 'urlImg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/2000px-Logo_of_AC_Milan.svg.png', 'usuarioId': 6},
        {'id': 5, 'tipoEjercicio': 'Manchester United', 'peso': 68, 'urlImg': 'http://pngimg.com/uploads/manchester_united/manchester_united_PNG21.png', 'usuarioId': 4},
        {'id': 6, 'tipoEjercicio': 'Manchester City', 'peso': 20, 'urlImg': 'http://pluspng.com/img-png/manchester-city-logo-png-manchester-city-supporters-club-logo-410.png', 'usuarioId': 7},
        { 'id': 7, 'tipoEjercicio': 'FC Bayern Munich', 'peso': 11, 'urlImg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png', 'usuarioId': 5},
        { 'id': 8, 'tipoEjercicio': 'PSG', 'peso': 2, 'urlImg': 'https://upload.wikimedia.org/wikipedia/fr/thumb/8/86/Paris_Saint-Germain_Logo.svg/768px-Paris_Saint-Germain_Logo.svg.png', 'usuarioId': 1}
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

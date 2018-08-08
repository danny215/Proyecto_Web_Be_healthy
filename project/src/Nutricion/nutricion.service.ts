import { Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {NutricionEntity} from "./nutricion.entity";
import {Like, Repository} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";



@Injectable()
export class NutricionService {


    listaDieta = [
        {'id': 1, 'tipoAlimento': 'FC Bacerlona',  'urlImg': 'https://upload.wikimedia.org/wikipedia/commons/4/47/Barcelona_fc_Logo.png', 'usuarioId': 3},
        {'id': 2, 'tipoAlimento': 'Real Madrid', 'urlImg': 'https://vignette.wikia.nocookie.net/inciclopedia/images/4/4d/Real_madrid_logo.png/revision/latest?cb=20081102004028', 'usuarioId': 8},
        {'id': 3, 'tipoAlimento': 'Juventus',  'urlImg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Juventus_FC_2017_logo.svg/2000px-Juventus_FC_2017_logo.svg.png', 'usuarioId': 2},
        {'id': 4, 'tipoAlimento': 'Milan', 'urlImg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/2000px-Logo_of_AC_Milan.svg.png', 'usuarioId': 6},
        {'id': 5, 'tipoAlimento': 'Manchester United', 'urlImg': 'http://pngimg.com/uploads/manchester_united/manchester_united_PNG21.png', 'usuarioId': 4},
        {'id': 6, 'tipoAlimento': 'Manchester City', 'urlImg': 'http://pluspng.com/img-png/manchester-city-logo-png-manchester-city-supporters-club-logo-410.png', 'usuarioId': 7},
        { 'id': 7, 'tipoAlimento': 'FC Bayern Munich',  'urlImg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png', 'usuarioId': 5},
        { 'id': 8, 'tipoAlimento': 'PSG',  'urlImg': 'https://upload.wikimedia.org/wikipedia/fr/thumb/8/86/Paris_Saint-Germain_Logo.svg/768px-Paris_Saint-Germain_Logo.svg.png', 'usuarioId': 1}
    ];

    constructor(@InjectRepository(NutricionEntity)
                private readonly nutricionRepository: Repository<NutricionEntity>){
    }

    crearDieta() {
        for(var nutricion in this.listaDieta) {
            const nutriciones = new NutricionEntity();
            nutriciones.id = this.listaDieta[nutricion].id;
            nutriciones.tipoAlimento = this.listaDieta[nutricion].tipoAlimento;
            nutriciones.urlImg =  this.listaDieta[nutricion].urlImg;
            const usuario = new UsuarioEntity();
            usuario.id = this.listaDieta[nutricion].usuarioId;
            nutriciones.usuarioId = usuario;
            this.nutricionRepository.save(nutriciones);
        }
        return this.nutricionRepository.find();
    }

    async traerTodos(): Promise<NutricionEntity[]> {
        return await this.nutricionRepository.find();
    }

    async buscar(parametroBusqueda) {

        return await this.nutricionRepository.find({tipoAlimento: Like("%" + parametroBusqueda + "%") });
    }

    async traerNutricionPorUsuario(usuarioID): Promise<NutricionEntity[]> {
        return await this.nutricionRepository.find({where: {usuarioId: usuarioID}});
    }


}

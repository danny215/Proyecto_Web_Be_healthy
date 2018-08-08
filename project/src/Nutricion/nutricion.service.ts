import { Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {NutricionEntity} from "./nutricion.entity";
import {Like, Repository} from "typeorm";
import {UsuarioEntity} from "../Usuario/usuario.entity";



@Injectable()
export class NutricionService {


    listaDieta = [
        {'id': 1, 'tipoAlimento': 'frutas',  'urlImg': 'http://www.extra.ec/documents/10157/0/768x480/0c24/768d432/none/5419931/EUFU/image_content_23690544_20170915124641.jpg', 'usuarioId': 3},
        {'id': 2, 'tipoAlimento': 'cereales', 'urlImg': 'https://biotrendies.com/wp-content/uploads/2015/07/que-cereales-tienen-mas-fibra.jpg', 'usuarioId': 8},
        {'id': 3, 'tipoAlimento': 'legumbres',  'urlImg': 'http://biografiadeunplato.com/wp-content/uploads/2016/10/Ingredientes-legumbres.jpg', 'usuarioId': 2},
        {'id': 4, 'tipoAlimento': 'tuberculos', 'urlImg': 'https://www.jardineriaon.com/wp-content/uploads/2017/10/tuberculos.jpg', 'usuarioId': 6},
        {'id': 5, 'tipoAlimento': 'carne', 'urlImg': 'https://www.curiosfera.com/wp-content/uploads/2016/07/Qu%C3%A9-es-la-carne-magra-y-cu%C3%A1les-son.jpg', 'usuarioId': 4},
        {'id': 6, 'tipoAlimento': 'pescado', 'urlImg': 'https://rutadosfaros.gal/wp-content/uploads/2018/06/Bergondo-Restaurante-San-Isidro-Parrillada.jpg', 'usuarioId': 7},
        { 'id': 7, 'tipoAlimento': 'lacteos',  'urlImg': 'https://saludalmaximo.com/wp-content/uploads/2017/11/alimentos-lacteos.jpg', 'usuarioId': 5},
        { 'id': 8, 'tipoAlimento': 'verduras',  'urlImg': 'http://www.laprensa.hn/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=TJKwYGnYX91fUZPggJ$avs$daE2N3K4ZzOUsqbU5sYtPuSdFIUzihIvllVyZvEtE6FB40xiOfUoExWL3M40tfzssyZqpeG_J0TFo7ZhRaDiHC9oxmioMlYVJD0A$3RbIiibgT65kY_CSDiCiUzvHvODrHApbd6ry6YGl5GGOZrs-&CONTENTTYPE=image/jpeg', 'usuarioId': 1}
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

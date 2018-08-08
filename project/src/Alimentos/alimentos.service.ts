import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AlimentoEntity} from "./alimentos.entity";
import {Like, Repository} from "typeorm";
import {NutricionEntity} from "../Nutricion/nutricion.entity";

@Injectable()
export class AlimentosService {

    listaAlimentos = [
        {
            'id': 1,
            'nombreAlimento': 'Cereza',
            'cantCalorias': 48,
            'cantProteinas': 0.8,
            'urlImg': 'https://freshshop.es/33-thickbox_default/comprar-cerezas-online.jpg',
            'nutricionId': 1
        },
        {
            'id': 2,
            'nombreAlimento': 'Limon',
            'cantCalorias': 14,
            'cantProteinas': 0.6,
            'urlImg': 'https://misremedios.com/wp-content/uploads/2015/10/Limon.jpg',
            'nutricionId': 3
        },
        {
            'id': 3,
            'nombreAlimento': 'Maiz',
            'cantCalorias': 363,
            'cantProteinas': 9.2,
            'urlImg': 'http://delmaiz.info/wp-content/uploads/2017/10/portada-maiz-dulce-680x355.jpg',
            'nutricionId': 5
        },
        {
            'id': 4,
            'nombreAlimento': 'Trigo',
            'cantCalorias': 361,
            'cantProteinas': 13.1,
            'urlImg': 'https://www.buenasalud.net/wp-content/uploads/2012/09/Trigo-el-rey-de-los-cereales.jpg',
            'nutricionId': 8
        },
        {
            'id': 5,
            'nombreAlimento': 'Acelga',
            'cantCalorias': 25,
            'cantProteinas': 2.4,
            'urlImg': 'https://biotrendies.com/wp-content/uploads/2015/06/Acelga.jpg',
            'nutricionId': 8
        },
        {
            'id': 6,
            'nombreAlimento': 'Lechuga',
            'cantCalorias': 19,
            'cantProteinas': 1.8,
            'urlImg': 'https://static1.squarespace.com/static/552cc4f2e4b08f5bedcf026a/t/5562e245e4b022cec2207406/1432543818672/lechuga+batvia.jpg',
            'nutricionId': 6
        },
        {
            'id': 7,
            'nombreAlimento': 'Papa',
            'cantCalorias': 80,
            'cantProteinas': 2.1,
            'urlImg': 'https://biotrendies.com/wp-content/uploads/2015/06/patata.jpg',
            'nutricionId': 7
        },
        {
            'id': 8,
            'nombreAlimento': 'Zanahoria',
            'cantCalorias': 37,
            'cantProteinas': 1.2,
            'urlImg': 'https://biotrendies.com/wp-content/uploads/2015/07/zanahoria.jpg',
            'nutricionId': 2
        },
        {
            'id': 9,
            'nombreAlimento': 'Pechuga de pollo',
            'cantCalorias': 108,
            'cantProteinas': 22.4,
            'urlImg': 'https://www.samos-deli.com/wp-content/uploads/2016/04/pechuga-de-pollo.jpg',
            'nutricionId': 4
        },
        {
            'id': 10,
            'nombreAlimento': 'Atun',
            'cantCalorias': 158,
            'cantProteinas': 21.5,
            'urlImg': 'http://www.eluniversal.com.mx/sites/default/files/styles/f03-651x400/public/2018/05/18/atun_atunenlata.jpg?itok=rVPoRJ5R',
            'nutricionId': 1
        },
        {
            'id': 11,
            'nombreAlimento': 'Leche',
            'cantCalorias': 63,
            'cantProteinas': 3.2,
            'urlImg': 'https://okdiario.com/img/2017/04/10/acidez-estomago-portada-1-1-655x368.jpg',
            'nutricionId': 2
        },
        {
            'id': 12,
            'nombreAlimento': 'Remolacha',
            'cantCalorias': 42,
            'cantProteinas': 1.5,
            'urlImg': 'https://mejorconsalud.com/wp-content/uploads/2017/06/remolacha.jpg',
            'nutricionId': 5
        },
    ];

    constructor(@InjectRepository(AlimentoEntity)
                private readonly alimentoRepository: Repository<AlimentoEntity>) {
    }

    crearAlimentos() {
        for (var alimentos in this.listaAlimentos) {
            const alimento = new AlimentoEntity();
            alimento.id = this.listaAlimentos[alimentos].id;
            alimento.nombreAlimento = this.listaAlimentos[alimentos].nombreAlimento;
            alimento.cantCalorias = this.listaAlimentos[alimentos].cantCalorias;
            alimento.cantProteinas = this.listaAlimentos[alimentos].cantProteinas;
            alimento.urlImg = this.listaAlimentos[alimentos].urlImg;
            const dieta = new NutricionEntity();
            dieta.id = this.listaAlimentos[alimentos].nutricionId;
            alimento.nutricionId = dieta;
            this.alimentoRepository.save(alimento);
        }
        return this.alimentoRepository.find();
    }

    async traerTodos(): Promise<AlimentoEntity[]> {
        return await this.alimentoRepository.find();
    }

    async buscar(parametroBusqueda) {

        return await this.alimentoRepository.find({nombreAlimento: Like("%" + parametroBusqueda + "%")});
    }

    async traerAlimentosPorNutricion(nutricionId): Promise<AlimentoEntity[]> {
        return await this.alimentoRepository.find({where: {nutricionId: nutricionId}});
    }

    async traerAlimentoPorId(idAlimentos): Promise<AlimentoEntity[]> {
        return await this.alimentoRepository.find({where: {id: idAlimentos}});
    }

}
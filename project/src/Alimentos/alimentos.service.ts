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
            'nombreAlimento': 'Messi',
            'cantCalorias': 23,
            'cantProteinas': 24,
            'urlImg': 'https://www.diariogol.com/uploads/s1/57/29/84/9/leo-messi-dice-no_15_970x597.jpeg',
            'nutricionId': 1
        },
        {
            'id': 2,
            'nombreAlimento': 'Messi',
            'cantCalorias': 23,
            'cantProteinas': 24,
            'urlImg': 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2018/07/18/15319267746680.jpg',
            'nutricionId': 3
        },
        {
            'id': 3,
            'nombreAlimento': 'Messi',
            'cantCalorias': 23,
            'cantProteinas': 24,
            'urlImg': 'https://s.hs-data.com/bilder/spieler/gross/25587.jpg',
            'nutricionId': 5
        },
        {
            'id': 4,
            'nombreAlimento': 'Messi',
            'cantCalorias': 23,
            'cantProteinas': 24,
            'urlImg': 'https://files.antena2.com.co/antena2/public/styles/imagen_despliegue/public/2018-07/neymar_psg_afp_0_0_0.jpg?itok=LjsU26K4',
            'nutricionId': 8
        },
        {
            'id': 5,
            'nombreAlimento': 'Messi',
            'cantCalorias': 23,
            'cantProteinas': 24,
            'urlImg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kylian_Mbapp%C3%A9_Russia_2018.jpg/245px-Kylian_Mbapp%C3%A9_Russia_2018.jpg',
            'nutricionId': 8
        },
        {
            'id': 6,
            'nombreAlimento': 'Messi',
            'cantCalorias': 23,
            'cantProteinas': 24,
            'urlImg': 'http://static.t13.cl/images/sizes/1200x675/1520791709-aguero.jpg',
            'nutricionId': 6
        },
        {
            'id': 7,
            'nombreAlimento': 'Messi',
            'cantCalorias': 23,
            'cantProteinas': 24,
            'urlImg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20180602_FIFA_Friendly_Match_Austria_vs._Germany_Manuel_Neuer_850_0723.jpg/245px-20180602_FIFA_Friendly_Match_Austria_vs._Germany_Manuel_Neuer_850_0723.jpg',
            'nutricionId': 7
        },
        {
            'id': 8,
            'nombreAlimento': 'Messi',
            'cantCalorias': 23,
            'cantProteinas': 24,
            'urlImg': 'https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/03/10/Recortada/930069748_20180310155538-kkSD-U441415399549d6H-992x558@LaVanguardia-Web.jpg',
            'nutricionId': 2
        },
        {
            'id': 9,
            'nombreAlimento': 'Messi',
            'cantCalorias': 23,
            'cantProteinas': 24,
            'urlImg': 'https://futbolete.com/wp-content/uploads/2016/11/carlos-bacca-milan-pescara.jpg',
            'nutricionId': 4
        },
        {
            'id': 10,
            'nombreAlimento': 'Messi',
            'cantCalorias': 23,
            'cantProteinas': 24,
            'urlImg': 'https://www.donbalon.com/assets/images/noticias/78955_636676956570340017.jpg',
            'nutricionId': 1
        },
        {
            'id': 11,
            'nombreAlimento': 'Messi',
            'cantCalorias': 23,
            'cantProteinas': 24,
            'urlImg': 'https://cdn.futbolperuano.com/sdi/2018/07/19/keylor-navas-asi-se-despide-del-real-madrid-656561.jpg',
            'nutricionId': 2
        },
        {
            'id': 12,
            'nombreAlimento': 'Messi',
            'cantCalorias': 23,
            'cantProteinas': 24,
            'urlImg': 'https://cdn.images.express.co.uk/img/dynamic/67/590x/Wayne-Rooney-807732.jpg',
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
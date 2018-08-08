import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {Like, Repository} from "typeorm";

@Injectable()
export class UsuarioService {

    listaUsuarios = [
        {'id': 1, 'usuario': 'Wilson', 'contrasena': '12345', 'urlImg': 'https://scontent.fuio1-1.fna.fbcdn.net/v/t1.0-9/24176652_1659653547418187_3621194512196575998_n.jpg?_nc_cat=0&_nc_eui2=AeF8d-ZEiH4Hr5tWH4_W1aQxnUvDHnZoLpEYhbLVFGwJTOYVOmabiLfP6GgS17FaEpR97eFrDrYs0ankmlkMKabjmkWQP_Cx1HluWtJR82szcQ&oh=96a900ba324c48ea23e5101f4c6e64ea&oe=5BCBF3C2'},
        {'id': 2, 'usuario': 'Carlos', 'contrasena': '12345', 'urlImg': 'https://scontent.fuio1-1.fna.fbcdn.net/v/t1.0-9/36341536_1826826837382787_5159984622926299136_n.jpg?_nc_cat=0&_nc_eui2=AeHzzbTWNIzyRElupxr4_KrxgKWKwVyhZPBZ_E6kcteQdjFJ1anBC16rD6GbWY2andYcwJOB_1BlJ2k5E4QkY9AechXLgg0Go-y9pARJl70TQw&oh=fd0a985c273c4ae114e64ba76e15adb4&oe=5C0F8632'},
        {'id': 3, 'usuario': 'Dennis', 'contrasena': '12345', 'urlImg': 'https://scontent.fuio1-1.fna.fbcdn.net/v/t1.0-9/37044869_1945348048838190_4458520024293834752_n.jpg?_nc_cat=0&_nc_eui2=AeENP4AxjpzAjNsqxlb5jX_NAIdC9jUpJMvP0bwAQW9xcojltZDSKdX4U7OMSE1AFNYlfdyA8huM73wLzhVSpwCoqxzV9jv9Hh9bQutRzkeP2g&oh=578353fa36932894641ecd8e59a5b81e&oe=5BC7B0E3'},
        {'id': 4, 'usuario': 'Genesis', 'contrasena': '12345', 'urlImg': 'https://scontent.fuio1-1.fna.fbcdn.net/v/t1.0-9/35654389_227092348070343_8645280721692262400_n.jpg?_nc_cat=0&_nc_eui2=AeE9QaAEf9LZtNyPqze_O2Ki-y8-b8WpLijWFLd3IKJy7TWU9StDjePkCBkAJOs0QBJz8nhKNbdOMo-1KC21_lAU55hFyKKmvZFrs5Mz3U62BQ&oh=68e2d094e4e091f987371e680db6783a&oe=5BC5BCA5'},
        {'id': 5, 'usuario': 'Danny', 'contrasena': '12345', 'urlImg': 'https://scontent.fuio1-1.fna.fbcdn.net/v/t1.0-9/25152304_741195719403358_8692478320055126854_n.jpg?_nc_cat=0&_nc_eui2=AeF8ifUiaxEFWVGb2c5zLVdjbaMmRv7mcLZCQRxC_TpYMHAykKiCIpZSmzhlExpvbrLYwIeNJPML7DUn567VXbb8zD7deHREiL0tIpFQCFDHTw&oh=8093f848a5c17d7497887377abefbb15&oe=5BD7D82A'},
        {'id': 6, 'usuario': 'Paul', 'contrasena': '12345', 'urlImg': 'https://scontent.fuio1-1.fna.fbcdn.net/v/t1.0-9/13322105_1042489602452926_5040670267103251400_n.jpg?_nc_cat=0&_nc_eui2=AeGGA7gbWVF3U8ZJy7z-mb7ZtR74f21YZAKDqFCA9ApxqRg3cLCAFacNodqr1YnBVGa8dyRU3fqAJG8px3Lt36MjbM8m-_itZ3gaT63FsiE2ZQ&oh=8efa3e6818859c273cb948b9bf0a6fba&oe=5BE56436'},
        {'id': 7, 'usuario': 'Isa', 'contrasena': '12345', 'urlImg': 'https://scontent.fuio1-1.fna.fbcdn.net/v/t1.0-9/20882597_1359808687473634_1084828130344189731_n.jpg?_nc_cat=0&_nc_eui2=AeHX3DI9_rrkYf2IMz944Hi28dzUdNfum8yUPAUZ7Q5KCcR2FNXnt2snlGTXXBHe3ga9-nO0bP1AUD2FHimnR-3-HkN1z0gUWiMaZ5h50zop6w&oh=986c2ec3f4b41337ebae5f7fc10eeead&oe=5BD5CA3A'},
        {'id': 8, 'usuario': 'Jessenia', 'contrasena': '12345', 'urlImg': 'https://scontent.fuio1-1.fna.fbcdn.net/v/t1.0-9/37553551_2207772046125062_3647195754277109760_n.jpg?_nc_cat=0&_nc_eui2=AeE2hs4x9nCRrT2c1mduu8eSqLGxgmXEzqKgjd5AWdAPlHI8ob5EyEQRg-ON48x_zn6xKUPRbz88gv25gVoJan3XrwULFdvT9R_mbKXypTw3Tw&oh=7c02c6deb3b45e0ec070b615b799e6e1&oe=5BD1B9D6'}
    ];

    constructor(@InjectRepository(UsuarioEntity)
                private readonly usuarioRepository: Repository<UsuarioEntity>){
    }

    crearUsuario() {
        for(var usuarios in this.listaUsuarios) {
            const usuario = new UsuarioEntity();
            usuario.id = this.listaUsuarios[usuarios].id;
            usuario.usuario = this.listaUsuarios[usuarios].usuario;
            usuario.contrasena = this.listaUsuarios[usuarios].contrasena;
            usuario.urlImg = this.listaUsuarios[usuarios].urlImg;
            this.usuarioRepository.save(usuario);
        }
        return this.usuarioRepository.find();
    }

    async traerTodos(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find();
    }

    async obtenerUsuarioPorNombre(nombreArgumento) {
        return await this.usuarioRepository.
        createQueryBuilder("usuario").where("usuario.usuario = :usuario", { usuario: nombreArgumento }).getOne();
    }

    async buscar(parametroBusqueda) {

        return await this.usuarioRepository.find({ usuario: Like("%" + parametroBusqueda + "%") });
    }

    async obtenerUsuarioPorId(idUsuario) {
        return await this.usuarioRepository.find({where: {id: idUsuario}})
    }
}
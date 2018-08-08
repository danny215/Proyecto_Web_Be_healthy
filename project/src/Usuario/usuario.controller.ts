import {Body, Controller, Get, Param, Post, Put, Req, Res} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {NotFoundException} from "../exceptions/NotFound.exception";

@Controller('usuario')
export class UsuarioController {

    constructor(private _usuarioService: UsuarioService) {}

    @Get()
    async listarTodos(
        @Res() response,
        @Req() request,
    ) {
        const usuarios = await this._usuarioService.traerTodos();
        return response.send(usuarios);
    }
    @Get('/:paramBusqueda')
    async buscar(
        @Param() paramParams,
        @Res() response
    ) {
        const usuarios = await this._usuarioService.buscar(paramParams.paramBusqueda);
        return response.send(usuarios);
    }
    @Get('/:nombreArgumento/:contrasena')
    async buscarPorNombre(
        @Param() paramParams,
        @Res() response
    ) {
        let usuario = await this._usuarioService.obtenerUsuarioPorNombre(paramParams.nombreArgumento);

        if (usuario.contrasena === paramParams.contrasena) {
            return response.send(
                {respuesta: 'Aceptado',
                id: usuario.id });
        } else {
            throw new NotFoundException(
                'Los datos son incorrectos',
                'error',
                4
            )
        }
    }
    @Get('por/id/:idUsuario')
    async obtenerUsuarioPorId(
        @Param() paramParams,
        @Res() response
    ) {
        const usuario = await this._usuarioService.obtenerUsuarioPorId(paramParams.idUsuario);
        return response.send(usuario);
    }
    @Post()
    async crearUsuariosBase() {
        const usuarios = this._usuarioService.crearUsuario();
        return usuarios;
    }
}
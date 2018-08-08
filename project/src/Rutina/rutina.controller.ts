import {Body, Controller, Get, Param, Post, Put, Req, Res} from "@nestjs/common";
import {RutinaService} from "./rutina.service";
import {RutinaEntity} from "./rutina.entity";

@Controller('Rutina')
export class RutinaController {

    constructor(private _rutinaService: RutinaService) {}

    @Get()
    async listarTodos(
        @Res() response,
        @Req() request,
    ) {
        const rutinas = await this._rutinaService.traerTodos();
        return response.send(rutinas);
    }

    @Get('/:paramBusqueda')
    async buscar(
        @Param() paramParams,
        @Res() response
    ) {
        const usuarios = await this._rutinaService.buscar(paramParams.paramBusqueda);
        return response.send(usuarios);
    }

    @Get('/porUsuario/:idUsuario')
    async obtenerRutinaPorUsuario(
        @Param() paramParams,
        @Res() response
    ) {
        const usuarios = await this._rutinaService.traerRutinaPorUsuario(paramParams.idUsuario);
        return response.send(usuarios);
    }

    @Post()
    async crearRutinaBase() {
        const rutinas = this._rutinaService.crearRutina();
        return rutinas;
    }


}
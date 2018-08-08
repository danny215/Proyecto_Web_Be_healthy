import {Body, Controller, Get, Param, Post, Put, Req, Res} from "@nestjs/common";
import {NutricionService} from "./nutricion.service";
import {NutricionEntity} from "./nutricion.entity";

@Controller('Nutricion')
export class NutricionController {

    constructor(private _nutricionService: NutricionService) {}

    @Get()
    async listarTodos(
        @Res() response,
        @Req() request,
    ) {
        const nutricion = await this._nutricionService.traerTodos();
        return response.send(nutricion);
    }

    @Get('/:paramBusqueda')
    async buscar(
        @Param() paramParams,
        @Res() response
    ) {
        const usuarios = await this._nutricionService.buscar(paramParams.paramBusqueda);
        return response.send(usuarios);
    }

    @Get('/porUsuario/:idUsuario')
    async obtenerNutricionPorUsuario(
        @Param() paramParams,
        @Res() response
    ) {
        const usuarios = await this._nutricionService.traerNutricionPorUsuario(paramParams.idUsuario);
        return response.send(usuarios);
    }

    @Post()
    async crearNutricionBase() {
        const nutricions = this._nutricionService.crearDieta();
        return nutricions;
    }


}
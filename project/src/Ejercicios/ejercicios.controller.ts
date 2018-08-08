import {Body, Controller, Get, Param, Post, Put, Req, Res} from "@nestjs/common";
import {EjerciciosService} from "./ejercicios.service";
import {EjercicioEntity} from "./ejercicios.entity";

@Controller('Ejercicios')
export class EjerciciosController {

    constructor(private _ejerciciosService: EjerciciosService) {
    }

    @Get()
    async listarTodos(
        @Res() response,
        @Req() request,
    ) {
        const ejercicios = await this._ejerciciosService.traerTodos();
        return response.send(ejercicios);
    }

    @Get('/:paramBusqueda')
    async buscar(
        @Param() paramParams,
        @Res() response
    ) {
        const usuarios = await this._ejerciciosService.buscar(paramParams.paramBusqueda);
        return response.send(usuarios);
    }

    @Get('porRutina/:idRutina')
    async obtenerEjerciciosPorRutina(
        @Param() paramParams,
        @Res() response
    ) {
        const ejercicios = await this._ejerciciosService.traerEjerciciosPorRutina(paramParams.idRutina);
        return response.send(ejercicios);
    }

    @Get('por/id/:idEjercicio')
    async obtenerEjercicioPorId(
        @Param() paramParams,
        @Res() response
    ) {
        const ejercicio = await this._ejerciciosService.traerEjercicioPorId(paramParams.idEjercicio);
        return response.send(ejercicio);
    }

    @Post()
    async crearEjerciciosBase() {
        const ejercicios = this._ejerciciosService.crearEjercicios();
        return ejercicios;
    }

}
import {Body, Controller, Get, Param, Post, Put, Req, Res} from "@nestjs/common";
import {AlimentosService} from "./alimentos.service"
import {AlimentoEntity} from "./alimentos.entity";

@Controller('Alimentos')
export class AlimentosController {

    constructor(private _alimentosService: AlimentosService) {
    }

    @Get()
    async listarTodos(
        @Res() response,
        @Req() request,
    ) {
        const alimentos = await this._alimentosService.traerTodos();
        return response.send(alimentos);
    }

    @Get('/:paramBusqueda')
    async buscar(
        @Param() paramParams,
        @Res() response
    ) {
        const usuarios = await this._alimentosService.buscar(paramParams.paramBusqueda);
        return response.send(usuarios);
    }

    @Get('porNutricion/:idNutricion')
    async obtenerAlimentosPorNutricion(
        @Param() paramParams,
        @Res() response
    ) {
        const alimentos = await this._alimentosService.traerAlimentosPorNutricion(paramParams.idNutricion);
        return response.send(alimentos);
    }

    @Get('por/id/:idAlimento')
    async obtenerAlimentoPorId(
        @Param() paramParams,
        @Res() response
    ) {
        const alimento = await this._alimentosService.traerAlimentoPorId(paramParams.idAlimento);
        return response.send(alimento);
    }

    @Post()
    async crearAlimentosBase() {
        const alimentos = this._alimentosService.crearAlimentos();
        return alimentos;
    }

}
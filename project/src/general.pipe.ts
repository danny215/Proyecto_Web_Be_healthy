import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';

import * as Joi from 'joi';
import {InvalidException} from "./exceptions/Invalid.exception";

@Injectable()
export class GeneralPipe implements PipeTransform {

    constructor(private readonly schema) {}
    transform(
        valorEnBrutoDelRequest: any,
        metadatosDeLosDecoradoresDelNestjs: ArgumentMetadata) {

        const {
            error
        } = Joi.validate(
            valorEnBrutoDelRequest,
            this.schema
        );
        if (error) {
            throw new InvalidException(
                'Peticion invalida',
                error,
                4
            );
        }
        return valorEnBrutoDelRequest;
    }
}
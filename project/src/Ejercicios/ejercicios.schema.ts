import * as Joi from 'joi';

export const EJERCICIOS_SCHEMA = Joi
    .object()
    .keys({
        id: Joi
            .number()
            .integer()
            .required(),
        nombreEjercicio: Joi
            .string()
            .required()
            .regex(/^[a-zA-Z ]{3,30}$/)
            .min(3)
            .max(30),
        descripcionEjercicio: Joi
            .string()
            .required()
            .regex(/^[a-zA-Z ]{3,150}$/)
            .min(3)
            .max(150),
        rutinaId: Joi
            .number()
            .integer()
            .required(),
        }
    )
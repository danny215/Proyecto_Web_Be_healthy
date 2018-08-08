import * as Joi from 'joi';

export const RUTINA_SCHEMA = Joi
    .object()
    .keys({
            id: Joi
                .number()
                .integer()
                .required(),
            tipoEjercicio: Joi
                .string()
                .required()
                .regex(/^[a-zA-Z ]{3,30}$/)
                .min(3)
                .max(30),
            peso: Joi
                .number()
                .integer()
                .required(),

        }
    )
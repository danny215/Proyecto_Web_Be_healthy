import * as Joi from 'joi';

export const NUTRICION_SCHEMA = Joi
    .object()
    .keys({
            id: Joi
                .number()
                .integer()
                .required(),
            tipoAlimento: Joi
                .string()
                .required()
                .regex(/^[a-zA-Z ]{3,30}$/)
                .min(3)
                .max(30),

        }
    )
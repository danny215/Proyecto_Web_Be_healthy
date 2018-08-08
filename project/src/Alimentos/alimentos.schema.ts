import * as Joi from 'joi';

export const ALIMENTOS_SCHEMA = Joi
    .object()
    .keys({
            id: Joi
                .number()
                .integer()
                .required(),
            nombreAlimento: Joi
                .string()
                .required()
                .regex(/^[a-zA-Z ]{3,30}$/)
                .min(3)
                .max(30),
            cantCalorias: Joi
                .number()
                .integer()
                .required(),
             cantProteinas: Joi
                 .number()
                 .integer()
                 .required(),
            nutricionId: Joi
                .number()
                .integer()
                .required(),
        }
    )
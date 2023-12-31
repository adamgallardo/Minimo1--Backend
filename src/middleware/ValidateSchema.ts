import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';
import { IUser } from '../models/User';
import { ISchedule } from '../models/Schedule';
import { IAsignatura } from '../models/Asignatura';
import { IValoration } from '../models/Valoration';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            name: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email().required(),
            asignatura: Joi.array().items(Joi.string().length(24).hex())
        }),
        update: Joi.object<IUser>({
            name: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email().required()
        })
    },
    schedule: {
        create: Joi.object<ISchedule>({
            name: Joi.string().required(),
            clase: Joi.string().required(),
            start: Joi.number().required(),
            duration: Joi.number().required()
        }),
        update: Joi.object<ISchedule>({
            name: Joi.string().required(),
            clase: Joi.string().required(),
            start: Joi.number().required(),
            duration: Joi.number().required()
        })
    },
    asignatura: {
        create: Joi.object<IAsignatura>({
            name: Joi.string().required() /* ,
            schedule: Joi.array().required() */
        }),
        update: Joi.object<IAsignatura>({
            name: Joi.string().required(),
            schedule: Joi.array().required()
        })
    },
    valoration: {
        create: Joi.object<IValoration>({
            name: Joi.string().required(),
            mark: Joi.number().required(),
            user: Joi.string().length(24).hex().required(),
            participation: Joi.boolean().required()
        }),
        update: Joi.object<IValoration>({
            name: Joi.string().required(),
            mark: Joi.number().required(),
            user: Joi.string().length(24).hex(),
            participation: Joi.boolean().required()
        })
    }
};

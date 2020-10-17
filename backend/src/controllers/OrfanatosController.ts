import { Request, Response } from "express";
import { getRepository } from "typeorm";
import orfanatosView from '../views/orfanatos_view';
import * as Yup from 'yup';

import Orfanatos from "../models/Orfanatos";

export default {

    async index(request: Request, response: Response){
        const orfanatosRepository = getRepository(Orfanatos);

        const orfanatos = await orfanatosRepository.find({
            relations: ['images']
        });

        return response.json(orfanatosView.renderMany(orfanatos));
    },

    async show(request: Request, response: Response){

        const { id } = request.params;

        const orfanatosRepository = getRepository(Orfanatos);

        const orfanato = await orfanatosRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orfanatosView.render(orfanato));
    },

    async create(request: Request, response: Response){ 

        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends} = request.body;

        const orfanatosRepository = getRepository(Orfanatos);

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name, 
            latitude,
            longitude, 
            about, 
            instructions,
            opening_hours,
            open_on_weekends,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const orfanato = orfanatosRepository.create(data);

        await orfanatosRepository.save(orfanato)



        return response.status(201).json(orfanato)
    }
};
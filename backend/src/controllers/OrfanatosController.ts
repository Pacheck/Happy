import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orfanatos from "../models/Orfanatos";

export default {

    async index(request: Request, response: Response){
        const orfanatosRepository = getRepository(Orfanatos);

        const orfanatos = await orfanatosRepository.find();

        return response.json(orfanatos);
    },

    async show(request: Request, response: Response){

        const { id } = request.params;

        const orfanatosRepository = getRepository(Orfanatos);

        const orfanato = await orfanatosRepository.findOneOrFail(id);

        return response.json(orfanato);
    },

    async create(request: Request, response: Response){ 

        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends} = request.body;

        const orfanatosRepository = getRepository(Orfanatos);

        const orfanato = orfanatosRepository.create({
            name, 
            latitude,
            longitude, 
            about, 
            instructions,
            opening_hours,
            open_on_weekends
        });

        await orfanatosRepository.save(orfanato)



        return response.status(201).json(orfanato)
    }
};
import { Router } from "express";
import multer from 'multer';

import uploadConfig from './config/upload'
import OrfanatosController from './controllers/OrfanatosController';

const routes = Router();
const upload = multer(uploadConfig);


routes.get('/orfanatos', OrfanatosController.index);

routes.get('/orfanatos/:id', OrfanatosController.show);

routes.post('/orfanatos', upload.array('images'), OrfanatosController.create);

// {
// 	"name" : "Lar dos guri",
// 	"latitude": -7.9344978,
// 	"longitude": -14.4107581,
// 	"about": "Sobre o orfanato",
// 	"instructions": "venha visitar caraio",
// 	"opening_hours": "das 9h até 00h",
// 	"open_on_weekends": false
// }

export default routes;
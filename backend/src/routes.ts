import { Router } from "express";

import OrfanatosController from './controllers/OrfanatosController';

const routes = Router();



routes.get('/orfanatos', OrfanatosController.index);

routes.get('/orfanatos/:id', OrfanatosController.show);


routes.post('/orfanatos', OrfanatosController.create);


export default routes;
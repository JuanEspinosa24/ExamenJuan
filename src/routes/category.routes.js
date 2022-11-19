import { Router } from 'express';
import catCtrl from '../controllers/category.controller.js';
import { upload } from '../middleware/imgUpload.js';

const route=Router();

route.get('/',catCtrl.listar);
route.get('/:id',catCtrl.listOne);
route.delete('/:id',catCtrl.delete);
route.put("/:id", upload.single("img"), catCtrl.update);
route.post("/", upload.single("img"), catCtrl.add);

//FALTA VALIDAR PARA QUE NO HAYAN CAMPOS Vacios

export default route;

//jmm
// finalizado
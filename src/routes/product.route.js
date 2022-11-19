import { Router } from 'express';
import productCtrl from '../controllers/product.controller.js';
import { upload } from '../middleware/imgUpload.js';

const route=Router();

route.get('/',productCtrl.listar);
route.get('/:id',productCtrl.listOne);
route.delete('/:id',productCtrl.delete);
route.put("/:id", upload.single("img"), productCtrl.update);
route.post("/", upload.single("img"), productCtrl.add);

export default route;

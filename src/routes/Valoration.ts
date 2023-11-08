import express from 'express';
import controller from '../controllers/Valoration';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.valoration.create), controller.createValoration);
router.get('/:valorationId', controller.readValoration);
router.get('/', controller.dameTodo);
router.get('/:page/:limit', controller.readAll);
router.put('/:valorationId', ValidateSchema(Schemas.valoration.update), controller.updateValoration);
router.delete('/:valorationId', controller.deleteValoration);

export = router;
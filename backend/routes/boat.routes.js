import express from 'express';
import { 
    getBoats, 
    getBoat, 
    createBoat, 
    updateBoat, 
    deleteBoat 
} from '../controllers/boat.controller.js';

const router = express.Router();

router.get('/', getBoats);
router.get('/:id', getBoat);
router.post('/', createBoat);
router.put('/:id', updateBoat);
router.delete('/:id', deleteBoat);

export default router;

import express from 'express';
import { 
    getReservations, 
    getReservation, 
    createReservation, 
    updateReservation, 
    deleteReservation 
} from '../controllers/reservation.controller.js';

const router = express.Router();

router.get('/', getReservations);
router.get('/:id', getReservation);
router.post('/', createReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router;

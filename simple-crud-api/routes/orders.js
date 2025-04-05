import express from 'express';

import validateToken from '../middleware/validateTokenHandler.js';
import { AddToCartController, cart } from '../controllers/CartController.js';

const router = express.Router();
router.post('/add-to-cart', validateToken, AddToCartController);
router.get('/cart', validateToken, cart);


export default router;
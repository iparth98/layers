import express from 'express';

import { signup, login, currentUser } from "../controllers/userController.js";
import validateToken from '../middleware/validateTokenHandler.js';
import validateAdmin from "../middleware/validateAdminHandler.js";
import { getVendors, createVendor, updateVendor, activateVendor, getvendorProducts } from '../controllers/users/vendorController.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/current-user', validateToken, currentUser);

// only admin users can access given below routes
router.get('/vendor/', validateAdmin, getVendors);
router.post('/vendor/activate', validateAdmin, activateVendor);
router.put('/vendor/:id', validateAdmin, updateVendor);
router.post('/vendor/create', validateAdmin, createVendor);

// open api endpoint
router.get('/vendor/:id/products/', getvendorProducts);

export default router;
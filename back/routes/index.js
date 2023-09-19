import express from 'express';

import Product from "./products.routes.js"
import Users from "./users.routes.js"
const router = express.Router();

router.get('/products',Product);
router.get('/users',Users);

export default router;

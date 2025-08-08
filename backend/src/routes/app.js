import express from 'express';
import app from '../controllers/app.js'
import validate from '../middlewares/validateRequest.js';
import request from './schemas/app.js';

const router = express.Router();

router.post('/',  validate(request.register), app.create);
router.get('/:id',  app.getOne );

export default router; 
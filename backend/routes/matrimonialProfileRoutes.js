import express, { query } from 'express';
import {
  getMatrimonialProfile,
  createMatrimonialProfile,
  updateMatrimonialProfile,
  deleteMatrimonialProfile
} from '../controllers/matrimonialProfileController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validator.js';
import {body, check, param} from 'express-validator';

const router = express.Router();

const validator = {

  // getMatrimonialProfile: [
  //   check('limit').optional().isNumeric().withMessage('Limit parameter must be a number').custom(value => {
  //     if(value < 0) throw new Error('Value should not be less than Zero');
  //     return true;
  //   }),
  //   check('skip').optional().isNumeric().withMessage('skip parameter must be a number').custom(value => {
  //     if(value < 0) throw new Error('Value should not be less than Zero');
  //     return true;
  //   }),
  //   check('search').optional().trim().escape()
  // ],

  createMatrimonialProfile: [
    check('fullName').trim().notEmpty().withMessage('Name is required').escape(),
  ],

  getMatrimonialProfile: [
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format')
  ],

  deleteMatrimonialProfile: [
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format')
  ],
  updateMatrimonialProfile: [
    check('name').trim().notEmpty().withMessage('Name is required').escape(),
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format')
  ]
}

router.route('/')
  .post(validator.createMatrimonialProfile, validateRequest, protect, createMatrimonialProfile);
router
  .route('/:id')
  .get(validator.getMatrimonialProfile, validateRequest, getMatrimonialProfile)
  .put(validator.updateMatrimonialProfile, validateRequest, protect, admin, updateMatrimonialProfile)
  .delete(validator.deleteMatrimonialProfile, validateRequest, protect, admin, deleteMatrimonialProfile);

export default router;

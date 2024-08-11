import express, { query } from 'express';
import {
  getMatrimonialProfile,
  createMatrimonialProfile,
  updateMatrimonialProfile,
  deleteMatrimonialProfile,
  getMatrimonialAllProfile,
  getMatrimonialAllProfiles
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
      /*check('image').trim().notEmpty().withMessage('Image  is required').escape(),
      check('email').trim().notEmpty().withMessage('Email  is required').escape(),
      check('fullName').trim().notEmpty().withMessage('FullName  is required').escape(),
      check('gender').trim().notEmpty().withMessage('Gender  is required').escape(),
      check('birthDate').trim().notEmpty().withMessage('BirthDate  is required').escape(),
      check('birthTime').trim().notEmpty().withMessage('BirthTime  is required').escape(),
      check('birthPlace').trim().notEmpty().withMessage('BirthPlace  is required').escape(),
      check('height').trim().notEmpty().withMessage('Height  is required').escape(),
      check('weight').trim().notEmpty().withMessage('Weight  is required').escape(),
      check('interests').trim().notEmpty().withMessage('Interests  is required').escape(),
      check('currentMaritalStatus').trim().notEmpty().withMessage('Current Marital Status is required').escape(),
      check('currentAddressOfCandidate').trim().notEmpty().withMessage('Current Address Of Candidate is required').escape(),
      check('currentCountryOfCandidate').trim().notEmpty().withMessage('Current Country Of Candidate is required').escape(),
      check('currentAddressOfFamily').trim().notEmpty().withMessage('Current Address Of Family is required').escape(),
      check('contactNumber').trim().notEmpty().withMessage('Contact Number  is required').escape(),
      check('immigrationStatusOfCandidate').trim().notEmpty().withMessage('Immigration Status Of Candidate is required').escape(),
      check('highestEducationOfCandidate').trim().notEmpty().withMessage('Highest Education Of Candidate is required').escape(),
      check('professionalDetailsOfCandidate').trim().notEmpty().withMessage('Professional Details Of Candidate is required').escape(),
      check('fatherFullName').trim().notEmpty().withMessage('Father FullName  is required').escape(),
      check('fatherContactNumber').trim().notEmpty().withMessage('Father ContactNumber  is required').escape(),
      check('motherFullName').trim().notEmpty().withMessage('Mother FullName  is required').escape(),
      check('fatherNativeTown').trim().notEmpty().withMessage('Father NativeTown  is required').escape(),
      check('motherNativeTown').trim().notEmpty().withMessage('Mother NativeTown  is required').escape(),
      check('maternalUncleName').trim().notEmpty().withMessage('Maternal UncleName  is required').escape(),
      check('detailsOfMosal').trim().notEmpty().withMessage('Details of mosal is required').escape(),
      check('believeInKundli').trim().notEmpty().withMessage('Believe In Kundli is required').escape(),
      check('expectationFromLifePartner').trim().notEmpty().withMessage('Expectation From Life Partner is required').escape(),
      check('correctInformation').trim().notEmpty().withMessage('Correct Information is required').escape()*/
  ],

  getMatrimonialProfile: [
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format')
  ],

  getMatrimonialAllProfiles: [
    check('limit').optional().isNumeric().withMessage('Limit parameter must be a number').custom(value => {
      if(value < 0) throw new Error('Value should not be less than Zero');
      return true;
    }),
    check('skip').optional().isNumeric().withMessage('skip parameter must be a number').custom(value => {
      if(value < 0) throw new Error('Value should not be less than Zero');
      return true;
    }),
    check('isMyPanel').optional().trim().escape()
  ],

  deleteMatrimonialProfile: [
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format')
  ],
  updateMatrimonialProfile: [
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format'),
    check('fullName').trim().notEmpty().withMessage('Name is required').escape()
  ]
}

router.route('/')
  .post(validator.createMatrimonialProfile, validateRequest, protect, createMatrimonialProfile)
  .get(validator.getMatrimonialAllProfiles, validateRequest, getMatrimonialAllProfiles);
router.route('/my-panel')
    // .post(validator.createMatrimonialProfile, validateRequest, protect, createMatrimonialProfile)
    .get(validator.getMatrimonialAllProfiles, validateRequest, getMatrimonialAllProfiles);
router
  .route('/:id')
  .get(validator.getMatrimonialProfile, validateRequest, getMatrimonialProfile)
  .put(validator.updateMatrimonialProfile, validateRequest, protect, updateMatrimonialProfile)
  .delete(validator.deleteMatrimonialProfile, validateRequest, protect, deleteMatrimonialProfile);

export default router;

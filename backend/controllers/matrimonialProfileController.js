import MatrimonialProfile from '../models/matrimonialProfileModel.js';
import { deleteFile } from '../utils/file.js';
import jwt from "jsonwebtoken";


// @desc     Fetch All Products
// @method   GET
// @endpoint /api/v1/matrimonialProfile?limit=2&skip=0
// @access   Public
const getMatrimonialAllProfiles = async (req, res, next) => {
  try {
    const total = await MatrimonialProfile.countDocuments();
    const maxLimit = process.env.PAGINATION_MAX_LIMIT;
    const maxSkip = total === 0 ? 0 : total - 1;
    const limit = Number(req.query.limit) || maxLimit;
    const skip = Number(req.query.skip) || 0;
    const search = req.query.search || '';
    const isMyPanel = convertToBoolean(req.query.isMyPanel);

    const token = req.cookies.jwt; // Assuming your JWT is stored in a cookie named 'jwt'
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret
    const userId = decoded.userId; // Assuming your JWT payload contains the userId

    const query = { fullName: { $regex: search, $options: 'i' } };

    if (isMyPanel) {
      query.user = userId;
    }

    const matrimonialProfiles = await MatrimonialProfile.find(query)
        .limit(limit > maxLimit ? maxLimit : limit)
        .skip(skip > maxSkip ? maxSkip : skip < 0 ? 0 : skip);

    if (!matrimonialProfiles || matrimonialProfiles.length === 0) {
      res.statusCode = 404;
      throw new Error('Matrimonial profiles not found!');
    }

    res.status(200).json({
      matrimonialProfiles,
      total,
      maxLimit,
      maxSkip,
      isMyPanel
    });
  } catch (error) {
    next(error);
  }
};

// @desc     Fetch all MatrimonialProfile
// @method   GET
``// @endpoint /api/v1/MatrimonialProfile/
// @access   Public
const getMatrimonialAllProfile = async (req, res, next) => {

  try {
    // const matrimonialProfiles = await MatrimonialProfile.find({ user: req.user._id});
    const matrimonialProfiles = await MatrimonialProfile.find();

    if (!matrimonialProfiles || matrimonialProfiles.length === 0) {
      res.statusCode = 404;
      throw new Error('No matrimonial profiles found!');
    }
    res.status(200).json(matrimonialProfiles);
  } catch (error) {
    next(error);
  }
};


// @desc     Fetch Single Product
// @method   GET
// @endpoint /api/v1/MatrimonialProfile/:id
// @access   Public
const getMatrimonialProfile = async (req, res, next) => {

  try {
    const { id: matrimonialProfileId } = req.params;

    const matrimonialProfile = await MatrimonialProfile.findById(matrimonialProfileId);


    if (!matrimonialProfile) {
      res.statusCode = 404;
      throw new Error('Matrimonial Profile not found!');
    }

    res.status(200).json(matrimonialProfile);
  } catch (error) {
    next(error);
  }
};

// @desc     Create MatrimonialProfile
// @method   POST
// @endpoint /api/v1/MatrimonialProfile
// @access   Private/Admin
const createMatrimonialProfile = async (req, res, next) => {
  try {
    const { image, email, fullName, gender, birthDate, birthTime, birthPlace, height, weight, interests, currentMaritalStatus, currentAddressOfCandidate, currentCountryOfCandidate, currentAddressOfFamily, contactNumber, immigrationStatusOfCandidate, highestEducationOfCandidate, professionalDetailsOfCandidate, fatherFullName, fatherContactNumber, motherFullName, fatherNativeTown, motherNativeTown, detailsOfSiblings, maternalUncleName, detailsOfMosal, believeInKundli, expectationFromLifePartner, dietPreference, lifestyleHabits, correctInformation } =
      req.body;
    // console.log(req.file);
    const matrimonialProfile = new MatrimonialProfile({
      user: req.user._id,
      image,
      email,
      fullName,
      gender,
      birthDate,
      birthTime,
      birthPlace,
      height,
      weight,
      interests,
      currentMaritalStatus,
      currentAddressOfCandidate,
      currentCountryOfCandidate,
      currentAddressOfFamily,
      contactNumber,
      immigrationStatusOfCandidate,
      highestEducationOfCandidate,
      professionalDetailsOfCandidate,
      fatherFullName,
      fatherContactNumber,
      motherFullName,
      fatherNativeTown,
      motherNativeTown,
      detailsOfSiblings,
      maternalUncleName,
      detailsOfMosal,
      believeInKundli,
      expectationFromLifePartner,
      dietPreference,
      lifestyleHabits,
      correctInformation,
    });
    const createdMatrimonialProfile = await matrimonialProfile.save();

    res.status(200).json({ message: 'Matrimonial created', createdMatrimonialProfile });
  } catch (error) {
    next(error);
  }
};

// @desc     Update MatrimonialProfile
// @method   PUT
// @endpoint /api/v1/matrimonialProfile/:id
// @access   Private/Admin
const updateMatrimonialProfile = async (req, res, next) => {
  try {
    const {
      image,
      email,
      fullName,
      gender,
      birthDate,
      birthTime,
      birthPlace,
      height,
      weight,
      interests,
      currentMaritalStatus,
      currentAddressOfCandidate,
      currentCountryOfCandidate,
      currentAddressOfFamily,
      contactNumber,
      immigrationStatusOfCandidate,
      highestEducationOfCandidate,
      professionalDetailsOfCandidate,
      fatherFullName,
      fatherContactNumber,
      motherFullName,
      fatherNativeTown,
      motherNativeTown,
      detailsOfSiblings,
      maternalUncleName,
      detailsOfMosal,
      believeInKundli,
      expectationFromLifePartner,
      dietPreference,
      lifestyleHabits,
      correctInformation,
    } = req.body;

    const matrimonialProfile = await MatrimonialProfile.findById(req.params.id);

    if (!matrimonialProfile) {
      res.statusCode = 404;
      throw new Error('Matrimonial Profile not found!');
    }

    // Save the current image path before updating
    const previousImage = matrimonialProfile.image;

    matrimonialProfile.image = image || matrimonialProfile.image;
    matrimonialProfile.email = email || matrimonialProfile.email;
    matrimonialProfile.fullName = fullName || matrimonialProfile.fullName;
    matrimonialProfile.gender = gender || matrimonialProfile.gender;
    matrimonialProfile.birthDate = birthDate || matrimonialProfile.birthDate;
    matrimonialProfile.birthTime = birthTime || matrimonialProfile.birthTime;
    matrimonialProfile.birthPlace = birthPlace || matrimonialProfile.birthPlace;
    matrimonialProfile.height = height || matrimonialProfile.height;
    matrimonialProfile.weight = weight || matrimonialProfile.weight;
    matrimonialProfile.interests = interests || matrimonialProfile.interests;
    matrimonialProfile.currentMaritalStatus = currentMaritalStatus || matrimonialProfile.currentMaritalStatus;
    matrimonialProfile.currentAddressOfCandidate = currentAddressOfCandidate || matrimonialProfile.currentAddressOfCandidate;
    matrimonialProfile.currentCountryOfCandidate = currentCountryOfCandidate || matrimonialProfile.currentCountryOfCandidate;
    matrimonialProfile.currentAddressOfFamily = currentAddressOfFamily || matrimonialProfile.currentAddressOfFamily;
    matrimonialProfile.contactNumber = contactNumber || matrimonialProfile.contactNumber;
    matrimonialProfile.immigrationStatusOfCandidate = immigrationStatusOfCandidate || matrimonialProfile.immigrationStatusOfCandidate;
    matrimonialProfile.highestEducationOfCandidate = highestEducationOfCandidate || matrimonialProfile.highestEducationOfCandidate;
    matrimonialProfile.professionalDetailsOfCandidate = professionalDetailsOfCandidate || matrimonialProfile.professionalDetailsOfCandidate;
    matrimonialProfile.fatherFullName = fatherFullName || matrimonialProfile.fatherFullName;
    matrimonialProfile.fatherContactNumber = fatherContactNumber || matrimonialProfile.fatherContactNumber;
    matrimonialProfile.motherFullName = motherFullName || matrimonialProfile.motherFullName;
    matrimonialProfile.fatherNativeTown = fatherNativeTown || matrimonialProfile.fatherNativeTown;
    matrimonialProfile.motherNativeTown = motherNativeTown || matrimonialProfile.motherNativeTown;
    matrimonialProfile.detailsOfSiblings = detailsOfSiblings || matrimonialProfile.detailsOfSiblings;
    matrimonialProfile.maternalUncleName = maternalUncleName || matrimonialProfile.maternalUncleName;
    matrimonialProfile.detailsOfMosal = detailsOfMosal || matrimonialProfile.detailsOfMosal;
    matrimonialProfile.believeInKundli = believeInKundli || matrimonialProfile.believeInKundli;
    matrimonialProfile.expectationFromLifePartner = expectationFromLifePartner || matrimonialProfile.expectationFromLifePartner;
    matrimonialProfile.dietPreference = dietPreference || matrimonialProfile.dietPreference;
    matrimonialProfile.lifestyleHabits = lifestyleHabits || matrimonialProfile.lifestyleHabits;
    matrimonialProfile.correctInformation = correctInformation || matrimonialProfile.correctInformation;

    const updatedMatrimonialProfile = await matrimonialProfile.save();

    // Delete the previous image if it exists and if it's different from the new image
    if (previousImage && previousImage !== updatedMatrimonialProfile.image) {
      deleteFile(previousImage);
    }

    res.status(200).json({ message: 'Matrimonial profile updated', updatedMatrimonialProfile });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete MatrimonialProfile
// @method   DELETE
// @endpoint /api/v1/matrimonialProfile/:id
// @access   Admin
const deleteMatrimonialProfile = async (req, res, next) => {
  try {
    const { id: matrimonialProfileId } = req.params;
    const matrimonialProfile = await MatrimonialProfile.findById(matrimonialProfileId);

    if (!matrimonialProfile) {
      res.statusCode = 404;
      throw new Error('Matrimonial Profile not found!');
    }
    await MatrimonialProfile.deleteOne({ _id: matrimonialProfile._id });
    deleteFile(matrimonialProfile.image); // Remove upload file

    res.status(200).json({ message: 'Matrimonial Profile deleted' });
  } catch (error) {
    next(error);
  }
};

// Function to convert string to boolean
function convertToBoolean(value) {
  // Handle case where value is a non-empty string and explicitly 'true' or '1'
  if (typeof value === 'string') {
    value = value.toLowerCase();
    return value === 'true' || value === '1';
  }
  // Handle case where value is a boolean or other types
  return Boolean(value);
}

export {
  getMatrimonialAllProfiles,
  getMatrimonialProfile,
  createMatrimonialProfile,
  updateMatrimonialProfile,
  deleteMatrimonialProfile,
  getMatrimonialAllProfile
};

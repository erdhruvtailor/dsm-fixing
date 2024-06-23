import MatrimonialProfile from '../models/matrimonialProfileModel.js';
import { deleteFile } from '../utils/file.js';

// @desc     Fetch Single Product
// @method   GET
// @endpoint /api/v1/MatrimonialProfile/:id
// @access   Public
const getMatrimonialProfile = async (req, res, next) => {
  try {
    const { id: matrimonialProfileId } = req.params;

    res.status(200).json(req.params);
    return false;


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
    const { image, email, fullName, gender, birthDate, birthTime, birthPlace, height, weight, interests, currentMaritalStatus, currentAddressOfCandidate, currentAddressOfFamily, contactNumber, immigrationStatusOfCandidate, highestEducationOfCandidate, professionalDetailsOfCandidate, fatherFullName, fatherContactNumber, motherFullName, fatherNativeTown, motherNativeTown, detailsOfSiblings, maternalUncleName, detailsOfMosal, believeInKundli, expectationFromLifePartner, correctInformation } =
      req.body;
    console.log(req.file);
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


export {
  getMatrimonialProfile,
  createMatrimonialProfile,
  updateMatrimonialProfile,
  deleteMatrimonialProfile
};

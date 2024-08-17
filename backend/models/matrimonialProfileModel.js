import mongoose from 'mongoose';

// Define the schema for products
const matrimonialProfileSchema = new mongoose.Schema(
    {
        // Reference to the user who created the product
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        // image of the MatrimonialProfile
        image: {
            type: String,
            // required: true
        },

// email of the MatrimonialProfile
        email: {
            type: String,
            // required: true
        },

// fullName of the MatrimonialProfile
        fullName: {
            type: String,
            // required: true
        },

// gender of the MatrimonialProfile
        gender: {
            type: String,
            // required: true
        },

// birthDate of the MatrimonialProfile
        birthDate: {
            type: String,
            // required: true
        },

// birthTime of the MatrimonialProfile
        birthTime: {
            type: String,
            // required: true
        },

// birthPlace of the MatrimonialProfile
        birthPlace: {
            type: String,
            // required: true
        },

// height of the MatrimonialProfile
        height: {
            type: String,
            // required: true
        },

// weight of the MatrimonialProfile
        weight: {
            type: String,
            // required: true
        },

// interests of the MatrimonialProfile
        interests: {
            type: String,
            // required: true
        },

// currentMaritalStatus of the MatrimonialProfile
        currentMaritalStatus: {
            type: String,
            // required: true
        },

// currentAddressOfCandidate of the MatrimonialProfile
        currentAddressOfCandidate: {
            type: String,
            // required: true
        },

        currentCountryOfCandidate: {
            type: String,
            // required: true
        },

// currentAddressOfFamily of the MatrimonialProfile
        currentAddressOfFamily: {
            type: String,
            // required: true
        },

// contactNumber of the MatrimonialProfile
        contactNumber: {
            type: String,
            // required: true
        },

// immigrationStatusOfCandidate of the MatrimonialProfile
        immigrationStatusOfCandidate: {
            type: String,
            // required: true
        },

// highestEducationOfCandidate of the MatrimonialProfile
        highestEducationOfCandidate: {
            type: String,
            // required: true
        },

// professionalDetailsOfCandidate of the MatrimonialProfile
        professionalDetailsOfCandidate: {
            type: String,
            // required: true
        },

// fatherFullName of the MatrimonialProfile
        fatherFullName: {
            type: String,
            // required: true
        },

// fatherContactNumber of the MatrimonialProfile
        fatherContactNumber: {
            type: String,
            // required: true
        },

// motherFullName of the MatrimonialProfile
        motherFullName: {
            type: String,
            // required: true
        },

// fatherNativeTown of the MatrimonialProfile
        fatherNativeTown: {
            type: String,
            // required: true
        },

// motherNativeTown of the MatrimonialProfile
        motherNativeTown: {
            type: String,
            // required: true
        },

// detailsOfSiblings of the MatrimonialProfile
        detailsOfSiblings: {
            type: String,
            // required: true
        },

// maternalUncleName of the MatrimonialProfile
        maternalUncleName: {
            type: String,
            // required: true
        },

// detailsOfMosal of the MatrimonialProfile
        detailsOfMosal: {
            type: String,
            // required: true
        },

// believeInKundli of the MatrimonialProfile
        believeInKundli: {
            type: String,
            // required: true
        },

//  dietPreference of the MatrimonialProfile
        dietPreference: [{ type: String }],

// lifestyleHabits of the MatrimonialProfile
        lifestyleHabits: [{ type: String }],

// expectationFromLifePartner of the MatrimonialProfile
        expectationFromLifePartner: {
            type: String,
            // required: true
        },

// correctInformation of the MatrimonialProfile
        correctInformation: {
            type: String,
            // required: true
        },
    },
    { timestamps: true }
);

// Create the MatrimonialProfile model
const MatrimonialProfile = mongoose.model('MatrimonialProfile', matrimonialProfileSchema);

// Export the MatrimonialProfile model
export default MatrimonialProfile;

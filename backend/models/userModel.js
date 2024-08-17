import mongoose from 'mongoose';

// Define the schema for users
const userSchema = new mongoose.Schema(
    {
        // User's name
        name: {
            type: String,
            required: true
        },
        // User's email, must be unique
        email: {
            type: String,
            required: true,
            unique: true
        },
        // User's password
        password: {
            type: String,
            required: true
        },
        // User's gender
        gender: {
            type: String
        },
        // User's DOB
        dob: {
            type: String
        },
        // User's Mobile
        mobile: {
            type: String
        },
        // User's address
        address: {
            type: String
        },
        // User's City
        city: {
            type: String
        },
        // User's Country
        country: {
            type: String
        },
        // Indicates whether the user is an admin or not
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {timestamps: true} // Adds createdAt and updatedAt timestamps
);

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;

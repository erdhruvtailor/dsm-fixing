import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {
    useGetMatrimonialProfileDetailsQuery,
    useUpdateMatrimonialProfileMutation,
    useUploadMatrimonialProfileImageMutation,
} from '../slices/matrimonialProfilesApiSlice';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import {
    predBelieveInKundli,
    preDietPreference,
    preLifestyleHabits,
    predCurrentMaritalStatus,
    predGender,
    predImmigrationStatusOfCandidate,
} from '../utils/preDefinedAttributes';
import {FaBackward, FaPlus} from "react-icons/fa6";
import "../assets/styles/MatrimonialFormPage.css";
import {generateRandomFilename} from "../utils/generateRandomFilename"; // Custom styles
import "../assets/styles/MatrimonialFormPage.css"; // Custom styles

const MatrimonialUpdateFormPage = () => {
    const {id: matrimonialProfileId} = useParams();
    const isUpdateMode = !!matrimonialProfileId;
    const [image, setImage] = useState(null);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthTime, setBirthTime] = useState('');
    const [birthPlace, setBirthPlace] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [interests, setInterests] = useState('');
    const [currentMaritalStatus, setCurrentMaritalStatus] = useState('');
    const [currentAddressOfCandidate, setCurrentAddressOfCandidate] = useState('');
    const [currentCountryOfCandidate, setCurrentCountryOfCandidate] = useState('');
    const [currentAddressOfFamily, setCurrentAddressOfFamily] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [immigrationStatusOfCandidate, setImmigrationStatusOfCandidate] = useState('');
    const [highestEducationOfCandidate, setHighestEducationOfCandidate] = useState('');
    const [professionalDetailsOfCandidate, setProfessionalDetailsOfCandidate] = useState('');
    const [fatherFullName, setFatherFullName] = useState('');
    const [fatherContactNumber, setFatherContactNumber] = useState('');
    const [motherFullName, setMotherFullName] = useState('');
    const [fatherNativeTown, setFatherNativeTown] = useState('');
    const [motherNativeTown, setMotherNativeTown] = useState('');
    const [detailsOfSiblings, setDetailsOfSiblings] = useState('');
    const [maternalUncleName, setMaternalUncleName] = useState('');
    const [detailsOfMosal, setDetailsOfMosal] = useState('');
    const [believeInKundli, setBelieveInKundli] = useState('');
    const [lifestyleHabits, setLifestyleHabits] = useState('');
    const [dietPreference, setDietPreference] = useState('');
    const [expectationFromLifePartner, setExpectationFromLifePartner] = useState('');
    const [correctInformation, setCorrectInformation] = useState('');
    const [profileImageName, setProfileImageName] = useState('No file chosen');

    const navigate = useNavigate();

    const getMatrimonialProfileQueryResult = useGetMatrimonialProfileDetailsQuery(matrimonialProfileId);
    const {
        data: matrimonialProfile,
        isLoading,
        errors
    } = isUpdateMode
        ? getMatrimonialProfileQueryResult
        : {data: null, isLoading: false, errors: null};

    const [uploadMatrimonialProfileImage, {isLoading: isUploadImageLoading}] =
        useUploadMatrimonialProfileImageMutation();
    const [updateMatrimonialProfile, {isLoading: isUpdateMatrimonialProfileLoading}] =
        useUpdateMatrimonialProfileMutation();

    useEffect(() => {
        if (isUpdateMode && matrimonialProfile) {
            setImage(matrimonialProfile.image);
            setEmail(matrimonialProfile.email);
            setFullName(matrimonialProfile.fullName);
            setGender(matrimonialProfile.gender);
            setBirthDate(matrimonialProfile.birthDate);
            setBirthTime(matrimonialProfile.birthTime);
            setBirthPlace(matrimonialProfile.birthPlace);
            setHeight(matrimonialProfile.height);
            setWeight(matrimonialProfile.weight);
            setInterests(matrimonialProfile.interests);
            setCurrentMaritalStatus(matrimonialProfile.currentMaritalStatus);
            setCurrentAddressOfCandidate(matrimonialProfile.currentAddressOfCandidate);
            setCurrentCountryOfCandidate(matrimonialProfile.currentCountryOfCandidate);
            setCurrentAddressOfFamily(matrimonialProfile.currentAddressOfFamily);
            setContactNumber(matrimonialProfile.contactNumber);
            setImmigrationStatusOfCandidate(matrimonialProfile.immigrationStatusOfCandidate);
            setHighestEducationOfCandidate(matrimonialProfile.highestEducationOfCandidate);
            setProfessionalDetailsOfCandidate(matrimonialProfile.professionalDetailsOfCandidate);
            setFatherFullName(matrimonialProfile.fatherFullName);
            setFatherContactNumber(matrimonialProfile.fatherContactNumber);
            setMotherFullName(matrimonialProfile.motherFullName);
            setFatherNativeTown(matrimonialProfile.fatherNativeTown);
            setMotherNativeTown(matrimonialProfile.motherNativeTown);
            setDetailsOfSiblings(matrimonialProfile.detailsOfSiblings);
            setMaternalUncleName(matrimonialProfile.maternalUncleName);
            setDetailsOfMosal(matrimonialProfile.detailsOfMosal);
            setBelieveInKundli(matrimonialProfile.believeInKundli);
            setLifestyleHabits(matrimonialProfile.lifestyleHabits);
            setDietPreference(matrimonialProfile.dietPreference);
            setExpectationFromLifePartner(matrimonialProfile.expectationFromLifePartner);
            setCorrectInformation(matrimonialProfile.correctInformation);
        }
    }, [isUpdateMode, matrimonialProfile]);

    const uploadFileHandler = async e => {
        const profileImagefile = e.target.files[0];
        if (!profileImagefile) return;

        // Generate a new random filename
        const newProfileImageName = `${generateRandomFilename()}${profileImagefile.name.substring(profileImagefile.name.lastIndexOf('.'))}`;

        // Create a new FormData object and append the file with the new filename
        const formData = new FormData();
        formData.append('image', new File([profileImagefile], newProfileImageName, {type: profileImagefile.type}));

        try {
            const res = await uploadMatrimonialProfileImage(formData).unwrap();
            setImage(res.imageUrl);
            setProfileImageName(newProfileImageName); // Update the state with the new file name
            toast.success(res.message);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    const submitHandler = async e => {
        e.preventDefault();

        /*const fields = [
            'image', 'email', 'fullName', 'gender', 'birthDate', 'birthTime', 'birthPlace', 'height', 'weight', 'interests',
            'currentMaritalStatus', 'currentAddressOfCandidate', 'currentCountryOfCandidate', 'currentAddressOfFamily', 'contactNumber',
            'immigrationStatusOfCandidate', 'highestEducationOfCandidate', 'professionalDetailsOfCandidate', 'fatherFullName', 'fatherContactNumber',
            'motherFullName', 'fatherNativeTown', 'motherNativeTown', 'detailsOfSiblings', 'maternalUncleName', 'detailsOfMosal', 'believeInKundli','dietPreference', 'lifestyleHabits',
            'expectationFromLifePartner', 'correctInformation'
        ];

        let isValid = true;

        fields.forEach(field => {
            const element = document.getElementById(field);
            const errorElement = document.getElementById(`${field}-error`);
            if (!element) return;

            if ((element.type === 'radio' || element.type === 'checkbox') && !document.querySelector(`input[name="${field}"]:checked`)) {
                element.classList.add('error');
                if (errorElement) errorElement.style.display = 'inline';
                isValid = false;
            } else if (!element.value) {
                element.classList.add('error');
                if (errorElement) errorElement.style.display = 'inline';
                isValid = false;
            } else {
                element.classList.remove('error');
                if (errorElement) errorElement.style.display = 'none';
            }
        });

        if (!isValid) {
            e.preventDefault();
            return false;
        }*/

        try {
            const matrimonialProfileData = {
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
                dietPreference,
                lifestyleHabits,
                expectationFromLifePartner,
                correctInformation
            };

            if (isUpdateMode) {
                try {
                    const {data} = await updateMatrimonialProfile({
                        matrimonialProfileId,
                        ...matrimonialProfileData
                    });

                    if (data) {
                        if (data.error) {
                            if (data.error && data.error.status === 400 && data.error.data.errors) {
                                // Extract validation messages and show them in a toast
                                const errorMessage = data.error.data.errors.map(error => error.msg).join(', ');
                                toast.error(errorMessage);
                            } else {
                                toast.error(data.error?.data?.message || data.error.data.message || 'An unknown error occurred');
                            }
                        } else {
                            toast.success(data.message);
                            // navigate('/matrimonialHomePage');
                        }
                    }
                } catch (err) {
                }
            }
            // navigate('/matrimonialHomePage');
        } catch (errors) {
            toast.error(errors?.data?.message || errors.errors);
        }
    };

    const headingStyle = {
        color: 'rgb(220, 53, 69)', // Primary color
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px 0',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' // Optional: adds shadow for better contrast
    };

    const handleCheckboxChange = (key) => {
        setLifestyleHabits((prevHabits) =>
            prevHabits.includes(key)
                ? prevHabits.filter((habit) => habit !== key)
                : [...prevHabits, key]
        );
    };

    return (
        <>
            <Meta title={'Matrimonial Profile Form'}/>
            <Link
                to='/matrimonialHomePage' className='btn btn-light my-3'><FaBackward size={20}/> &nbsp; Back
            </Link>

            {(isUpdateMatrimonialProfileLoading || isUploadImageLoading) && <Loader/>}

            {(isUpdateMatrimonialProfileLoading || isUploadImageLoading) ? (
                <Loader/>
            ) : errors ? (
                <Message variant='danger'>
                    {errors?.data?.message || errors.errors}
                </Message>
            ) : (
                <FormContainer>
                    <Meta title={'Matrimonial Profile Form'}/>
                    <h4 style={headingStyle}>Update Matrimonial Profile</h4>

                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col md={6}>

                                <Form.Group controlId='image' className='attribute'>
                                    <Form.Label>Profile Photo</Form.Label>
                                    <div className="custom-file">
                                        <Form.Control
                                            type='file'
                                            onChange={uploadFileHandler}
                                            id="image"
                                            className="custom-file-input"
                                        />
                                        <label className="custom-file-label" htmlFor="image">
                                            {profileImageName}
                                        </label>
                                    </div>
                                    <span className="error-message" id="image-error">Field is required</span>
                                </Form.Group>

                                {image && (
                                    <div className="image-preview">
                                        <img src={image} alt="Uploaded preview"
                                             style={{maxWidth: '100%', maxHeight: '200px'}}/>
                                    </div>
                                )}

                                <Form.Group controlId='email' className='attribute'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="email-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='fullName' className='attribute'>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Full Name'
                                        value={fullName}
                                        onChange={e => setFullName(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="fullName-error">Field is required</span>
                                </Form.Group>

                                {/*gender*/}
                                <Form.Group className='attribute'>
                                    <Row>
                                        {Object.entries(predGender).map(([key, value]) => (
                                            <Col md={2} key={value}>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={key}
                                                    id={key}
                                                    checked={gender == key}
                                                    onChange={e => setGender(e.target.value)}
                                                />
                                                <label htmlFor={key}>&nbsp;{value}</label>
                                            </Col>
                                        ))}
                                    </Row>
                                    <span className="error-message" id="gender-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='birthDate' className='attribute'>
                                    <Form.Label>Birth Date</Form.Label>
                                    <Form.Control
                                        type='date'
                                        placeholder='Enter BirthDate'
                                        value={birthDate}
                                        onChange={e => setBirthDate(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="birthDate-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='birthDate' className='attribute'>
                                    <Form.Label>Birth Time</Form.Label>
                                    <Form.Control
                                        type='time'
                                        placeholder='Enter birth Time'
                                        value={birthTime}
                                        onChange={e => setBirthTime(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="birthTime-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='birthPlace' className='attribute'>
                                    <Form.Label>Birth Place</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter birth place'
                                        value={birthPlace}
                                        onChange={e => setBirthPlace(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="birthPlace-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='height' className='attribute'>
                                    <Form.Label>Height</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Height'
                                        value={height}
                                        onChange={e => setHeight(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="height-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='weight' className='attribute'>
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter weight'
                                        value={weight}
                                        onChange={e => setWeight(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="weight-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='interests' className='attribute'>
                                    <Form.Label>Interests</Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={interests}
                                        onChange={e => setInterests(e.target.value)}
                                        placeholder="Select your interests..."
                                    ></Form.Control>
                                </Form.Group>

                                {/*currentMaritalStatus*/}
                                <Form.Group className='attribute'>
                                    <Form.Label>Current Marital Status</Form.Label>
                                    <Row>
                                        {Object.entries(predCurrentMaritalStatus).map(([key, value]) => (
                                            <Col md={4} key={value}>
                                                <input
                                                    type="radio"
                                                    name="currentMaritalStatus"
                                                    value={key}
                                                    id={key + "currentMaritalStatus"}
                                                    checked={currentMaritalStatus == key}
                                                    onChange={e => setCurrentMaritalStatus(e.target.value)}
                                                />
                                                <label htmlFor={key + "currentMaritalStatus"}>&nbsp;{value}</label>
                                            </Col>
                                        ))}
                                    </Row>
                                    <span className="error-message"
                                          id="currentMaritalStatus-error">Field is required</span>
                                </Form.Group>


                                <Form.Group controlId='currentAddressOfCandidate' className='attribute'>
                                    <Form.Label>Current Address Of Candidate</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Current Address Of Candidate'
                                        value={currentAddressOfCandidate}
                                        onChange={e => setCurrentAddressOfCandidate(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="currentAddressOfCandidate-error">Field is required</span>
                                </Form.Group>


                                <Form.Group controlId='currentCountryOfCandidate' className='attribute'>
                                    <Form.Label>Current Country Of Candidate</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Current Country Of Candidate'
                                        value={currentCountryOfCandidate}
                                        onChange={e => setCurrentCountryOfCandidate(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="currentCountryOfCandidate-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='currentAddressOfFamily' className='attribute'>
                                    <Form.Label>Current Address Of Family</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Current Address Of Family'
                                        value={currentAddressOfFamily}
                                        onChange={e => setCurrentAddressOfFamily(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message"
                                          id="currentAddressOfFamily-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='contactNumber' className='attribute'>
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Contact Number'
                                        value={contactNumber}
                                        onChange={e => setContactNumber(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="contactNumber-error">Field is required</span>
                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group controlId='immigrationStatusOfCandidate' className='attribute'>
                                    <Form.Label>Immigration Status Of Candidate</Form.Label>
                                </Form.Group>

                                {/*immigrationStatusOfCandidate*/}
                                <Form.Group className='attribute'>
                                    <Row>
                                        {Object.entries(predImmigrationStatusOfCandidate).map(([key, value]) => (
                                            <Col md={6} key={value}>
                                                <input
                                                    type="radio"
                                                    name="immigrationStatusOfCandidate"
                                                    value={key}
                                                    id={key + key + key + key + key}
                                                    checked={immigrationStatusOfCandidate === key}
                                                    onChange={e => setImmigrationStatusOfCandidate(e.target.value)}
                                                    className="mb-3"
                                                />
                                                <label htmlFor={key + key + key + key + key}>&nbsp;{value}</label>
                                            </Col>
                                        ))}
                                    </Row>
                                    <span className="error-message" id="immigrationStatusOfCandidate-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='highestEducationOfCandidate' className='attribute'>
                                    <Form.Label>Highest Education Of Candidate</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Highest Education Of Candidate'
                                        value={highestEducationOfCandidate}
                                        onChange={e => setHighestEducationOfCandidate(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="highestEducationOfCandidate-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='professionalDetailsOfCandidate' className='attribute'>
                                    <Form.Label>Professional Details Of Candidate</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Professional Details Of Candidate'
                                        value={professionalDetailsOfCandidate}
                                        onChange={e => setProfessionalDetailsOfCandidate(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="professionalDetailsOfCandidate-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='fatherFullName' className='attribute'>
                                    <Form.Label>Father FullName</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Father FullName'
                                        value={fatherFullName}
                                        onChange={e => setFatherFullName(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="fatherFullName-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='fatherContactNumber' className='attribute'>
                                    <Form.Label>Father Contact Number</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Father Contact Number'
                                        value={fatherContactNumber}
                                        onChange={e => setFatherContactNumber(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message"
                                          id="fatherContactNumber-error">Field is required</span>
                                </Form.Group>


                                <Form.Group controlId='motherFullName' className='attribute'>
                                    <Form.Label>Mother Full Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Mother FullName'
                                        value={motherFullName}
                                        onChange={e => setMotherFullName(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="motherFullName-error">Field is required</span>
                                </Form.Group>


                                <Form.Group controlId='fatherNativeTown' className='attribute'>
                                    <Form.Label>Father Native Town</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Father NativeTown'
                                        value={fatherNativeTown}
                                        onChange={e => setFatherNativeTown(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="fatherNativeTown-error">Field is required</span>
                                </Form.Group>


                                <Form.Group controlId='motherNativeTown' className='attribute'>
                                    <Form.Label>Mother Native Town</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Mother NativeTown'
                                        value={motherNativeTown}
                                        onChange={e => setMotherNativeTown(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="motherNativeTown-error">Field is required</span>
                                </Form.Group>


                                <Form.Group controlId='detailsOfSiblings' className='attribute'>
                                    <Form.Label>Details Of Siblings</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Details Of Siblings'
                                        value={detailsOfSiblings}
                                        onChange={e => setDetailsOfSiblings(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message"
                                          id="detailsOfSiblings-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='detailsOfMosal' className='attribute'>
                                    <Form.Label>Details Of Mosal</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Details Of Mosal'
                                        value={detailsOfMosal}
                                        onChange={e => setDetailsOfMosal(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="detailsOfMosal-error">Field is required</span>
                                </Form.Group>


                                <Form.Group controlId='maternalUncleName' className='attribute'>
                                    <Form.Label>Maternal Uncle Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Maternal Uncle Name'
                                        value={maternalUncleName}
                                        onChange={e => setMaternalUncleName(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message"
                                          id="maternalUncleName-error">Field is required</span>
                                </Form.Group>

                                {/*believeInKundli*/}
                                <Form.Group className='attribute'>
                                    <Form.Label className='attribute'>Believe in Kundli?</Form.Label>
                                    <Row>
                                        {Object.entries(predBelieveInKundli).map(([key, value]) => (
                                            <Col md={2} mb={2} key={value}>
                                                <input
                                                    type="radio"
                                                    name="believeInKundli"
                                                    value={key}
                                                    id={key + key}
                                                    checked={believeInKundli == key}
                                                    onChange={e => setBelieveInKundli(e.target.value)}
                                                />
                                                <label htmlFor={key + key}>&nbsp;{value}</label>
                                            </Col>
                                        ))}
                                    </Row>
                                    <span className="error-message" id="believeInKundli-error">Field is required</span>
                                </Form.Group>

                                {/*dietPreference*/}
                                <Form.Group className='attribute'>
                                    <Form.Label className='attribute'>Diet Preference?</Form.Label>
                                    <Row>
                                        {Object.entries(preDietPreference).map(([key, value]) => (
                                            <Col md={4} mb={2} key={value}>
                                                <input
                                                    type="radio"
                                                    name="dietPreference"
                                                    value={key}
                                                    id={'dietPreference'+key}
                                                    checked={dietPreference == key}
                                                    onChange={e => setDietPreference(e.target.value)}
                                                />
                                                <label htmlFor={'dietPreference'+key}>&nbsp;{value}</label>
                                            </Col>
                                        ))}
                                    </Row>
                                    <span className="error-message" id="dietPreference-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='lifestyleHabits' className='attribute'>
                                    <Form.Label className='attribute'>Lifestyle Habits?</Form.Label>
                                    <Row>
                                        {Object.entries(preLifestyleHabits).map(([key, value]) => (
                                            <Col md={6} mb={2} key={key}>
                                                <input
                                                    type="checkbox"
                                                    name="lifestyleHabits"
                                                    value={key}
                                                    id={'lifestyleHabits'+key}
                                                    checked={lifestyleHabits.includes(key)}
                                                    onChange={() => handleCheckboxChange(key)}
                                                />
                                                <label htmlFor={'lifestyleHabits'+key}>&nbsp;{value}</label>
                                            </Col>
                                        ))}
                                    </Row>
                                    <span className="error-message" id="lifestyleHabits-error">Field is required</span>
                                </Form.Group>

                                <Form.Group controlId='expectationFromLifePartner' className='attribute'>
                                    <Form.Label>Expectation From LifePartner</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        rows={3}
                                        type='text'
                                        placeholder='Enter Expectation From Life Partner'
                                        value={expectationFromLifePartner}
                                        onChange={e => setExpectationFromLifePartner(e.target.value)}
                                    ></Form.Control>
                                    <span className="error-message" id="expectationFromLifePartner-error">Field is required</span>
                                </Form.Group>

                                {!isUpdateMode ?
                                    <Form.Group className='attribute'>
                                        <p>I do hereby acknowledge that all the details provided above is correct and I
                                            willfully wish to share my details in this portal.</p>
                                        <input
                                            type="radio"
                                            name="correctInformation"
                                            value="Yes"
                                            onChange={e => setCorrectInformation(e.target.value)}
                                        /> Yes

                                        <input
                                            type="radio"
                                            name="correctInformation"
                                            value="Yes"
                                            onChange={e => setCorrectInformation(e.target.value)}
                                        /> No
                                    </Form.Group>
                                    : ''}
                            </Col>
                        </Row>

                        <Button
                            type='submit'
                            variant='danger'
                            style={{marginTop: '1rem', float: 'right'}}
                        >
                            {isUpdateMode ? 'Update Matrimonial Profile' : 'Create Matrimonial Profile'}
                        </Button>

                    </Form>
                </FormContainer>
            )}
        </>
    );
};

export default MatrimonialUpdateFormPage;

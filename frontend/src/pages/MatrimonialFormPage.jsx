import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Form, Row, Col, Image} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {
    useGetMatrimonialProfileDetailsQuery,
    useCreateMatrimonialProfileMutation,
    useUpdateMatrimonialProfileMutation,
    useUploadMatrimonialProfileImageMutation,
} from '../slices/matrimonialProfilesApiSlice';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import {predCurrentMaritalStatus, predGender, predImmigrationStatusOfCandidate, predbelieveInKundli} from '../utils/preDefinedAttributes';

const MatrimonialProfilePage = () => {
    const {id: matrimonialProfileId} = useParams();
    const isUpdateMode = !!matrimonialProfileId;

    const [image, setImage] = useState('');
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
    const [expectationFromLifePartner, setExpectationFromLifePartner] = useState('');
    const [correctInformation, setCorrectInformation] = useState('');

    const getMatrimonialProfileQueryResult = useGetMatrimonialProfileDetailsQuery(matrimonialProfileId);
    const {
        data: matrimonialProfile,
        isLoading,
        errors
    } = isUpdateMode
        ? getMatrimonialProfileQueryResult
        : {data: null, isLoading: false, errors: null};

    const [createMatrimonialProfile, {isLoading: isCreateMatrimonialProfileLoading}] =
        useCreateMatrimonialProfileMutation();
    const [updateMatrimonialProfile, {isLoading: isUpdateMatrimonialProfileLoading}] =
        useUpdateMatrimonialProfileMutation();
    const [uploadMatrimonialProfileImage, {isLoading: isUploadImageLoading}] =
        useUploadMatrimonialProfileImageMutation();

    const navigate = useNavigate();


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
            setExpectationFromLifePartner(matrimonialProfile.expectationFromLifePartner);
            setCorrectInformation(matrimonialProfile.correctInformation);
        }
    }, [isUpdateMode, matrimonialProfile]);

    const uploadFileHandler = async e => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadMatrimonialProfileImage(formData).unwrap();
            setImage(res.imageUrl);
            toast.success(res.message);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    const submitHandler = async e => {
        e.preventDefault();
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
                expectationFromLifePartner,
                correctInformation
            };
            if (isUpdateMode) {
                const {data} = await updateMatrimonialProfile({
                    matrimonialProfileId,
                    ...matrimonialProfileData
                });
                toast.success(data.message);
            } else {
                const {data} = await createMatrimonialProfile(matrimonialProfileData);
                toast.success(data.message);
            }
            navigate('/matrimonialProfile');
        } catch (errors) {
            toast.error(errors?.data?.message || errors.errors);
        }
    };


    return (
        <>
            <Meta title={'Matrimonial Profile Form'}/>
            <Link 
                to={!isUpdateMode ? '/matrimonialProfile' : '/matrimonialProfile/'+matrimonialProfileId}
                className='btn btn-light my-3'>
                Go Back
            </Link>
            {(isUpdateMatrimonialProfileLoading ||
                isCreateMatrimonialProfileLoading ||
                isUploadImageLoading) && <Loader/>}
            {isLoading ? (
                <Loader/>
            ) : errors ? (
                <Message variant='danger'>
                    {errors?.data?.message || errors.errors}
                </Message>
            ) : (
                <FormContainer>
                    <Meta title={'Matrimonial Profile Form'}/>
                    <h4>{isUpdateMode ? 'Update Matrimonial Profile' : 'Create Matrimonial Profile'}</h4>

                    <Form onSubmit={submitHandler}>

                        <Row>
                            <Col md={6}>

                                <Form.Group controlId='image' className='attribute'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type='file'
                                        onChange={uploadFileHandler}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email' className='attribute'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='fullName' className='attribute'>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Full Name'
                                        value={fullName}
                                        onChange={e => setFullName(e.target.value)}
                                    ></Form.Control>
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
                                                checked={gender == key}
                                                onChange={e => setGender(e.target.value)}
                                              />
                                              <label>{value}</label>
                                            </Col>
                                        ))}
                                    </Row>
                                </Form.Group>

                                <Form.Group controlId='birthDate' className='attribute'>
                                    <Form.Label>Birth Date</Form.Label>
                                    <Form.Control
                                        type='date'
                                        placeholder='Enter BirthDate'
                                        value={birthDate}
                                        onChange={e => setBirthDate(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='birthDate' className='attribute'>
                                    <Form.Label>Birth Time</Form.Label>
                                    <Form.Control
                                        type='time'
                                        placeholder='Enter birth Time'
                                        value={birthTime}
                                        onChange={e => setBirthTime(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='birthPlace' className='attribute'>
                                    <Form.Label>Birth Place</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter birth place'
                                        value={birthPlace}
                                        onChange={e => setBirthPlace(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='height' className='attribute'>
                                    <Form.Label>Height</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Height'
                                        value={height}
                                        onChange={e => setHeight(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='weight' className='attribute'>
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter weight'
                                        value={weight}
                                        onChange={e => setWeight(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='interests' className='attribute'>
                                    <Form.Label>Interests</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter interests'
                                        value={interests}
                                        onChange={e => setInterests(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                {/*currentMaritalStatus*/}
                                <Form.Group className='attribute'>
                                    <Row>
                                        {Object.entries(predCurrentMaritalStatus).map(([key, value]) => (
                                            <Col md={3} key={value}>
                                              <input
                                                type="radio"
                                                name="currentMaritalStatus"
                                                value={key}
                                                checked={currentMaritalStatus == key}
                                                onChange={e => setCurrentMaritalStatus(e.target.value)}
                                              />
                                              <label>{value}</label>
                                            </Col>
                                        ))}
                                    </Row>
                                </Form.Group>


                                <Form.Group controlId='currentAddressOfCandidate' className='attribute'>
                                    <Form.Label>Current Address Of Candidate</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Current Address Of Candidate'
                                        value={currentAddressOfCandidate}
                                        onChange={e => setCurrentAddressOfCandidate(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>


                                <Form.Group controlId='currentCountryOfCandidate' className='attribute'>
                                    <Form.Label>Current Country Of Candidate</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Current Country Of Candidate'
                                        value={currentCountryOfCandidate}
                                        onChange={e => setCurrentCountryOfCandidate(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='currentAddressOfFamily' className='attribute'>
                                    <Form.Label>Current Address Of Family</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Current Address Of Family'
                                        value={currentAddressOfFamily}
                                        onChange={e => setCurrentAddressOfFamily(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='contactNumber' className='attribute'>
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Contact Number'
                                        value={contactNumber}
                                        onChange={e => setContactNumber(e.target.value)}
                                    ></Form.Control>
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
                                                checked={immigrationStatusOfCandidate === key}
                                                onChange={e => setImmigrationStatusOfCandidate(e.target.value)}
                                                class="mb-3"
                                              />
                                              <label>{value}</label>
                                            </Col>
                                        ))}
                                    </Row>
                                </Form.Group>


                                <Form.Group controlId='highestEducationOfCandidate' className='attribute'>
                                    <Form.Label>Highest Education Of Candidate</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Highest Education Of Candidate'
                                        value={highestEducationOfCandidate}
                                        onChange={e => setHighestEducationOfCandidate(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='professionalDetailsOfCandidate' className='attribute'>
                                    <Form.Label>Professional Details Of Candidate</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Professional Details Of Candidate'
                                        value={professionalDetailsOfCandidate}
                                        onChange={e => setProfessionalDetailsOfCandidate(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='fatherFullName' className='attribute'>
                                    <Form.Label>Father FullName</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Father FullName'
                                        value={fatherFullName}
                                        onChange={e => setFatherFullName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='fatherContactNumber' className='attribute'>
                                    <Form.Label>Father Contact Number</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Father Contact Number'
                                        value={fatherContactNumber}
                                        onChange={e => setFatherContactNumber(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>


                                <Form.Group controlId='motherFullName' className='attribute'>
                                    <Form.Label>Mother Full Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Mother FullName'
                                        value={motherFullName}
                                        onChange={e => setMotherFullName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>


                                <Form.Group controlId='fatherNativeTown' className='attribute'>
                                    <Form.Label>Father Native Town</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Father NativeTown'
                                        value={fatherNativeTown}
                                        onChange={e => setFatherNativeTown(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>


                                <Form.Group controlId='motherNativeTown' className='attribute'>
                                    <Form.Label>Mother Native Town</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Mother NativeTown'
                                        value={motherNativeTown}
                                        onChange={e => setMotherNativeTown(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>


                                <Form.Group controlId='detailsOfSiblings' className='attribute'>
                                    <Form.Label>Details Of Siblings</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Details Of Siblings'
                                        value={detailsOfSiblings}
                                        onChange={e => setDetailsOfSiblings(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='detailsOfMosal' className='attribute'>
                                    <Form.Label>Details Of Mosal</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Details Of Mosal'
                                        value={detailsOfMosal}
                                        onChange={e => setDetailsOfMosal(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>


                                <Form.Group controlId='maternalUncleName' className='attribute'>
                                    <Form.Label>Maternal Uncle Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Maternal Uncle Name'
                                        value={maternalUncleName}
                                        onChange={e => setMaternalUncleName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                {/*believeInKundli*/}
                                <p className='attribute'>Believe in Kundli?</p>
                                <Form.Group className='attribute'>
                                    <Row>
                                        {Object.entries(predbelieveInKundli).map(([key, value]) => (
                                            <Col md={2} mb={2} key={value}>
                                              <input
                                                type="radio"
                                                name="believeInKundli"
                                                value={key}
                                                checked={believeInKundli == key}
                                                onChange={e => setBelieveInKundli(e.target.value)}
                                              />
                                              <label>{value}</label>
                                            </Col>
                                        ))}
                                    </Row>
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
                                </Form.Group>

                                {!isUpdateMode ? 
                                    <Form.Group className='attribute'>
                                        <p>I do hereby acknowledge that all the details provided above is correct and I willfully wish to share my details in this portal.</p>
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
                            variant='primary'
                            style={{marginTop: '1rem'}}
                        >
                            {isUpdateMode ? 'Update Matrimonial Profile' : 'Create Matrimonial Profile'}
                        </Button>
                    </Form>
                </FormContainer>
            )}
        </>
    );
};

export default MatrimonialProfilePage;

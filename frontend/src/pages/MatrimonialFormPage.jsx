import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
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
import {matrimonialProfileApiSlice} from "../slices/matrimonialProfilesApiSlice";

const MatrimonialProfilePage = () => {
  const { id: matrimonialProfileId } = useParams();
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
    error
  } = isUpdateMode
    ? getMatrimonialProfileQueryResult
    : { data: null, isLoading: false, error: null };

  const [createMatrimonialProfile, { isLoading: isCreateMatrimonialProfileLoading }] =
    useCreateMatrimonialProfileMutation();
  const [updateMatrimonialProfile, { isLoading: isUpdateMatrimonialProfileLoading }] =
    useUpdateMatrimonialProfileMutation();
  const [uploadMatrimonialProfileImage, { isLoading: isUploadImageLoading }] =
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
        const { data } = await updateMatrimonialProfile({
          matrimonialProfileId,
          ...matrimonialProfileData
        });
        toast.success(data.message);
      } else {
        const { data } = await createMatrimonialProfile(matrimonialProfileData);

        toast.success(data.message);
      }
      navigate('/matrimonialProfile');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
    <Meta title={'Matrimonial Profile Form'} />
      <Link to='/matrimonialProfile' className='btn btn-light my-3'>
        Go Back
      </Link>
      {(isUpdateMatrimonialProfileLoading ||
          isCreateMatrimonialProfileLoading ||
        isUploadImageLoading) && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <FormContainer>
          <Meta title={'Matrimonial Profile Form'} />
          <h1>{isUpdateMode ? 'Update Matrimonial Profile' : 'Create Matrimonial Profile'}</h1>

          <Form onSubmit={submitHandler}>


            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                  type='file'
                  onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='fullName'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Full Name'
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='gender'>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter gender'
                  value={gender}
                  onChange={e => setGender(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='birthDate'>
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter BirthDate'
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='birthDate'>
              <Form.Label>Birth Time</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter birth Time'
                  value={birthTime}
                  onChange={e => setBirthTime(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='birthPlace'>
              <Form.Label>Birth Place</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter birth place'
                  value={birthPlace}
                  onChange={e => setBirthPlace(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='height'>
              <Form.Label>Height</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Height'
                  value={height}
                  onChange={e => setHeight(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='weight'>
              <Form.Label>Weight</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter weight'
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='interests'>
              <Form.Label>Interests</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter interests'
                  value={interests}
                  onChange={e => setInterests(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='currentMaritalStatus'>
              <Form.Label>Current Marital Status</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Current Marital Status'
                  value={currentMaritalStatus}
                  onChange={e => setCurrentMaritalStatus(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='currentAddressOfCandidate'>
              <Form.Label>Current Address Of Candidate</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Current Address Of Candidate'
                  value={currentAddressOfCandidate}
                  onChange={e => setCurrentAddressOfCandidate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='currentAddressOfFamily'>
              <Form.Label>Current Address Of Family</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Current Address Of Family'
                  value={currentAddressOfFamily}
                  onChange={e => setCurrentAddressOfFamily(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='contactNumber'>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Contact Number'
                  value={contactNumber}
                  onChange={e => setContactNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='immigrationStatusOfCandidate'>
              <Form.Label>Immigration Status Of Candidate</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Immigration Status Of Candidate'
                  value={immigrationStatusOfCandidate}
                  onChange={e => setImmigrationStatusOfCandidate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='highestEducationOfCandidate'>
              <Form.Label>Highest Education Of Candidate</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Highest Education Of Candidate'
                  value={highestEducationOfCandidate}
                  onChange={e => setHighestEducationOfCandidate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='professionalDetailsOfCandidate'>
              <Form.Label>Professional Details Of Candidate</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Professional Details Of Candidate'
                  value={professionalDetailsOfCandidate}
                  onChange={e => setProfessionalDetailsOfCandidate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='fatherFullName'>
              <Form.Label>Father FullName</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Father FullName'
                  value={fatherFullName}
                  onChange={e => setFatherFullName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='fatherContactNumber'>
              <Form.Label>Father Contact Number</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Father Contact Number'
                  value={fatherContactNumber}
                  onChange={e => setFatherContactNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='motherFullName'>
              <Form.Label>Mother Full Name</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Mother FullName'
                  value={motherFullName}
                  onChange={e => setMotherFullName(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='fatherNativeTown'>
              <Form.Label>Father Native Town</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Father NativeTown'
                  value={fatherNativeTown}
                  onChange={e => setFatherNativeTown(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='motherNativeTown'>
              <Form.Label>Mother Native Town</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Mother NativeTown'
                  value={motherNativeTown}
                  onChange={e => setMotherNativeTown(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='detailsOfSiblings'>
              <Form.Label>Details Of Siblings</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Details Of Siblings'
                  value={detailsOfSiblings}
                  onChange={e => setDetailsOfSiblings(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='maternalUncleName'>
              <Form.Label>Maternal Uncle Name</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Maternal Uncle Name'
                  value={maternalUncleName}
                  onChange={e => setMaternalUncleName(e.target.value)}
              ></Form.Control>
            </Form.Group>



            <Form.Group controlId='detailsOfMosal'>
              <Form.Label>Details Of Mosal</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Details Of Mosal'
                  value={detailsOfMosal}
                  onChange={e => setDetailsOfMosal(e.target.value)}
              ></Form.Control>
            </Form.Group>



            <Form.Group controlId='believeInKundli'>
              <Form.Label>Believe In Kundli</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Believe In Kundli'
                  value={believeInKundli}
                  onChange={e => setBelieveInKundli(e.target.value)}
              ></Form.Control>
            </Form.Group>



            <Form.Group controlId='expectationFromLifePartner'>
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



            <Form.Group controlId='correctInformation'>
              <Form.Label>Correct Information</Form.Label>
              <Form.Control
                  type='text'
                  placeholder='Enter Correct Information'
                  value={correctInformation}
                  onChange={e => setCorrectInformation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
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

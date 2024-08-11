import React, { useEffect, useState } from 'react';
import FormContainer from '../../components/FormContainer';
import { Button, Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  useUpdateUserMutation,
  useGetUserByIdQuery
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';

const UpdateUserFormPage = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const userData = { name, email, isAdmin };
      const data = await updateUser({ userId, ...userData });

      if (data) {
        if(data.error) {
          if (data.error && data.error.status === 400 && data.error.data.errors) {
            // Extract validation messages and show them in a toast
            const errorMessage = data.error.data.errors.map(error => error.msg).join(', ');
            toast.error(errorMessage);
          } else {
            toast.error(data.error?.data?.message || data.error.data.message || 'An unknown error occurred');
          }
        } else {
          toast.success(data.message);
          navigate('/admin/user-list');
        }
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Meta title={'User Update Form'} />

      <Link to='/admin/user-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      {isUpdateUserLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <FormContainer>
          <Meta title={'Update User'} />
          <h1>Update user</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                type='text'
                placeholder='Enter name'
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                type='email'
                placeholder='Enter email'
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='is Admin'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button className='mb-3' variant='primary' type='submit'>
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UpdateUserFormPage;

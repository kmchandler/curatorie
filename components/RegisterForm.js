import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { createUser, getUserByUserId, updateUser } from '../api/userData';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  imageUrl: '',
  email: '',
};

function RegisterForm({ user, obj }) {
  const [formInput, setFormInput] = useState({});
  const [, setProfile] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getUserByUserId(user.id).then(setProfile);
    if (obj.id) {
      setFormInput(obj);
    }
  }, [obj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateUser(formInput);
      router.push(`/users/${obj.id}`);
    } else {
      const payload = { ...formInput, uid: user.uid };
      const createdUser = createUser(payload);
      router.push(`/users/${createdUser.id}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="profilePage profilePageForm">
      <form onSubmit={handleSubmit}>
        <h2 className="updateProfileHeader">profile</h2>
        <input required type="text" name="first_name" value={formInput.first_name} className="form-control" placeholder="first name" onChange={handleChange} />
        <br />
        <input required type="text" name="last_name" value={formInput.last_name} className="form-control" placeholder="last name" onChange={handleChange} />
        <br />
        <input required type="text" name="username" value={formInput.username} className="form-control" placeholder="username" onChange={handleChange} />
        <br />
        <input type="url" name="image_url" value={formInput.image_url} className="form-control" placeholder="image url" onChange={handleChange} />
        <br />
        <input type="email" name="email" value={formInput.email} className="form-control" placeholder="email" onChange={handleChange} />
        <div className="submitProfileButtonDiv">
          <button type="submit" className="submitProfileBtn" onSubmit={handleSubmit}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    imageUrl: PropTypes.string,
    email: PropTypes.string,
  }),
};

RegisterForm.defaultProps = {
  obj: initialState,
};

export default RegisterForm;

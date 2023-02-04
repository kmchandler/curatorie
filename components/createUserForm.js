import React, { useEffect, useState } from 'react';
// import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getUserByUid, updateUser, createUser } from '../api/userData';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  imageUrl: '',
};

function CreateUserForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setProfile] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getUserByUid(user.uid).then(setProfile);
    if (obj.id) {
      setFormInput(obj);
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (obj.id) {
      updateUser(formInput);
      router.push(`/users/${obj.id}`);
    } else {
      try {
        const payload = { ...formInput, uid: user.uid };

        const createdUser = createUser(payload);
        router.push(`/users/${createdUser.id}`);
      } catch (exception) {
        console.warn(exception);
      }
    }
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
        <h5 className="favGenresHeader">favorite genres</h5>
        <div className="submitProfileButtonDiv">
          <button type="submit" className="submitProfileBtn" onSubmit={handleSubmit}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

CreateUserForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    imageUrl: PropTypes.string,
    userId: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
  }),
};

CreateUserForm.defaultProps = {
  obj: initialState,
};

export default CreateUserForm;

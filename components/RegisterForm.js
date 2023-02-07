import PropTypes from 'prop-types';
import { useState } from 'react';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const [formInput, setFormInput] = useState({
    uid: user.uid,
    firstName: '',
    lastName: '',
    username: '',
    image_url: '',
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formInput).then(() => updateUser(user.uid));
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
        <input required type="text" name="firstName" value={formInput.firstName} className="form-control" placeholder="first name" onChange={handleChange} />
        <br />
        <input required type="text" name="lastName" value={formInput.lastName} className="form-control" placeholder="last name" onChange={handleChange} />
        <br />
        <input required type="text" name="username" value={formInput.username} className="form-control" placeholder="username" onChange={handleChange} />
        <br />
        <input type="url" name="imageUrl" value={formInput.imageUrl} className="form-control" placeholder="image url" onChange={handleChange} />
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
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;

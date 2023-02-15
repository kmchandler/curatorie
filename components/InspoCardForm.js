import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { createInspoCard, updateInspoCard } from '../api/inspoCardData';

const initialState = {
  image_url: '',
  description: '',
  priority: false,
};

function InspoCardForm({ obj, user, boardItemId }) {
  const [formInput, setFormInput] = useState({});
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const payload = { ...formInput, user_id: user.id, board_id: boardItemId };
      updateInspoCard(payload);
      router.push(`/boards/${boardItemId}`);
    } else {
      const payload = { ...formInput, user_id: user.id, board_id: boardItemId };
      createInspoCard(payload);
      router.push(`/boards/${boardItemId}`);
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
    <div className="inspoCard inspoCardForm">
      <Form className="inspoCardForm" onSubmit={handleSubmit}>
        <h2 className="updateCardHeader">new card</h2>
        <input required type="url" name="image_url" value={formInput.image_url} className="form-control" placeholder="image_url for item" onChange={handleChange} />
        <br />
        <input type="text" name="description" value={formInput.description} className="form-control" placeholder="item description" onChange={handleChange} />
        <br />
        <Form.Check
          type="switch"
          label="favorite?"
          name="priority"
          id="giftPriority"
          checked={formInput.priority}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            priority: e.target.checked,
          }))}
        />
        <br />
        <div className="submitProfileButtonDiv">
          <button type="submit" className="submitProfileBtn" onSubmit={handleSubmit}>
            submit
          </button>
        </div>
      </Form>
    </div>
  );
}

InspoCardForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    board_id: PropTypes.number,
    user_id: PropTypes.number,
    image_url: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.bool,
  }),
  boardItemId: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

InspoCardForm.defaultProps = {
  obj: initialState,
};

export default InspoCardForm;

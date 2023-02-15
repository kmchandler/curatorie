import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { createListCard, updateListCard } from '../api/listCardData';

const initialState = {
  image_url: '',
  description: '',
  priority: false,
};

function ListCardForm({ obj, user, boardItemId }) {
  const [formInput, setFormInput] = useState({});
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const payload = { ...formInput, user_id: user.id, board_id: boardItemId };
      updateListCard(payload);
      router.push(`/boards/${boardItemId}`);
    } else {
      const payload = { ...formInput, user_id: user.id, board_id: boardItemId };
      createListCard(payload);
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
    <div className="listCard listCardForm">
      <Form className="listCardForm" onSubmit={handleSubmit}>
        <h2 className="updateCardHeader">new card</h2>
        <input type="text" name="list_item" value={formInput.list_item} className="form-control" placeholder="list item" onChange={handleChange} />
        <br />
        <Form.Check
          type="switch"
          label="priority?"
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

ListCardForm.propTypes = {
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

ListCardForm.defaultProps = {
  obj: initialState,
};

export default ListCardForm;

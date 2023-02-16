import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { createGiftCard, updateGiftCard } from '../api/giftCardData';

const initialState = {
  link: '',
  image_url: '',
  item: '',
  description: '',
  price: '',
  occasion: '',
  gift_for: '',
  name: '',
  priority: false,
};

function GiftCardForm({ obj, user, boardItemId }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    }
  }, [obj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const payload = { ...formInput, user_id: obj.user_id, board_id: obj.board_id };
      updateGiftCard(payload);
      router.push(`/boards/${obj.board_id}`);
    } else {
      const payload = { ...formInput, user_id: user.id, board_id: boardItemId };
      createGiftCard(payload);
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

  const handleChangeGift = (e) => {
    setFormInput({ ...formInput, gift_for: e.target.value });
  };

  return (
    <div className="giftCard giftCardForm">
      <Form className="giftCardForm" onSubmit={handleSubmit}>
        <h2 className="updateCardHeader">{obj.id ? 'update' : 'add'} card</h2>
        <input required type="url" name="link" value={formInput.link} className="form-control" placeholder="link to item" onChange={handleChange} />
        <br />
        <input required type="url" name="image_url" value={formInput.image_url} className="form-control" placeholder="image_url for item" onChange={handleChange} />
        <br />
        <input required type="text" name="item" value={formInput.item} className="form-control" placeholder="item name" onChange={handleChange} />
        <br />
        <input type="text" name="description" value={formInput.description} className="form-control" placeholder="item description" onChange={handleChange} />
        <br />
        <input type="text" step=".01" name="price" value={formInput.price} className="form-control" placeholder="item price" onChange={handleChange} />
        <br />
        <input type="text" name="occasion" value={formInput.occasion} className="form-control" placeholder="occasion" onChange={handleChange} />
        <br />
        <div>gift for:</div>
        <div key={`inline-${formInput.gift_for}`} className="mb-3">
          <Form.Check
            inline
            label="myself"
            name="formInput.gift_for"
            type="radio"
            value="myself"
            id={`inline-${boardItemId}-1`}
            onChange={handleChangeGift}
          />
          <Form.Check
            inline
            label="someone else"
            name="formInput.gift_for"
            type="radio"
            id={`inline-${boardItemId}-2`}
            value="someone_else"
            onChange={handleChangeGift}
          />
        </div>
        <input type="text" name="name" value={formInput.name} className="form-control" placeholder="name of person receiving/giving gift" onChange={handleChange} />
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

GiftCardForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    board_id: PropTypes.number,
    user_id: PropTypes.number,
    link: PropTypes.string,
    image_url: PropTypes.string,
    item: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    occasion: PropTypes.string,
    gift_for: PropTypes.string,
    name: PropTypes.string,
    priority: PropTypes.bool,
  }),
  boardItemId: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

GiftCardForm.defaultProps = {
  obj: initialState,
};

export default GiftCardForm;

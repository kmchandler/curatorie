/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { createShareRequest } from '../api/shareRequestData';

export default function UserCard({ userObj, boardObj }) {
  const sendBoard = () => {
    const payload = { user_id: userObj.id, board_id: boardObj };
    createShareRequest(payload);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={userObj.image_url} />
      <Card.Body>
        <br />
        <h1>{userObj.first_name} {userObj.last_name}</h1>
        <h2>{userObj.username}</h2>
        <h2>{userObj.email}</h2>
        <br />
        <button type="button" className="sendButton m-2" onClick={sendBoard}>
          send
        </button>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    username: PropTypes.string,
    image_url: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
  }),
  boardObj: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

UserCard.defaultProps = {
  userObj: {},
};

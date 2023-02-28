/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { GrSend } from 'react-icons/gr';
import { createShareRequest } from '../api/shareRequestData';

export default function UserCard({ userObj, boardId }) {
  const router = useRouter();

  const sendBoard = async () => {
    const payload = { user_id: userObj.id, board_id: boardId };
    await createShareRequest(payload);
    router.push('/');
  };

  return (
    <Card className="userCard" style={{ width: '20rem' }}>
      <Card.Img className="cardImage" variant="top" src={userObj.image_url} style={{ height: '300px' }} />
      <Card.Body className="userCardBody">
        <br />
        <h2>{userObj.first_name} {userObj.last_name}</h2>
        <h4 className="userName">{userObj.username}</h4>
        <button type="button" className="sendButton m-2" onClick={sendBoard}>
          <GrSend />
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
  boardId: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

UserCard.defaultProps = {
  userObj: {},
};

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getBoardById } from '../api/boardData';
import { createSharedBoard } from '../api/sharedBoardData';
import { getUserByUid, getUserByUserId } from '../api/userData';
import { deleteSingleShareRequest } from '../api/shareRequestData';

function ShareRequestCard({
  boardObj, onUpdate,
}) {
  const [board, setBoard] = useState([]);
  const [sender, setSender] = useState([]);
  const [appUser, setAppUser] = useState([]);
  const { user } = useAuth();

  const getUser = async () => {
    const theUser = await getUserByUid(user.uid);
    setAppUser(theUser);
  };

  const getBoard = async () => {
    const theBoard = await getBoardById(boardObj.board);
    setBoard(theBoard);
  };

  const joinThisBoard = async () => {
    if (window.confirm(`join ${board.name}?`)) {
      const payload = { board_id: boardObj.board, user_id: appUser.id };
      await createSharedBoard(payload);
      onUpdate();
    }
  };

  const rejectRequest = async () => {
    if (window.confirm('decline invitation?')) {
      await deleteSingleShareRequest(boardObj.id);
      onUpdate();
    }
  };

  const getSender = async () => {
    const theSender = await getUserByUserId(board.user_id);
    setSender(theSender);
  };

  useEffect(() => {
    getUser();
    getBoard();
  }, []);

  useEffect(() => {
    if (board.id) {
      getSender();
    }
  }, [board]);

  return (
    <>
      <Card className="shareRequestCardDiv" style={{ width: '15rem', margin: '10px', height: '12rem' }}>
        <Card.Body className="cardBody shareRequestCardBody">
          <Link href={`/boards/${board.id}`} passHref>
            <div className="cardDetails">
              <p className="boardIcon">{board.icon}</p>
              <p className="boardCardName">{board.name?.toLowerCase()}</p>
              <p className="boardCardName">sent by: {sender.first_name?.toLowerCase()} {sender.last_name?.toLowerCase()} ({sender.username?.toLowerCase()})</p>
            </div>
          </Link>
          <div className="shareRequestCardBtns">
            <button type="button" className="joinButton m-2" onClick={joinThisBoard}>
              join board
            </button>
            <button type="button" className="joinButton m-2" onClick={rejectRequest}>
              decline
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

ShareRequestCard.propTypes = {
  boardObj: PropTypes.shape({
    board: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  sharedBoard: PropTypes.shape({
    id: PropTypes.number,
    icon: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ShareRequestCard;

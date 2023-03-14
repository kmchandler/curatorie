/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import { useAuth } from '../utils/context/authContext';
import { getBoardById } from '../api/boardData';
import { createSharedBoard } from '../api/sharedBoardData';
import { getUserByUid, getUserByUserId } from '../api/userData';
import { deleteSingleShareRequest } from '../api/shareRequestData';
import IconRender from './IconRender';

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
      <Paper className="boardCardDiv shareRequestCardDiv" elevation={2}>
        <Card.Body className="cardBody shareRequestCardBody">
          <Link href={`/boards/${board.id}`} passHref>
            <div className="cardDetails">
              <div className="boardIcon"><IconRender iconName={board.icon} /></div>
              <div className="boardCardName">{board.name?.toLowerCase()}</div>
              <div className="boardCardSentBy">sent by: {sender.first_name?.toLowerCase()} {sender.last_name?.toLowerCase()} ({sender.username?.toLowerCase()})</div>
            </div>
          </Link>
          <div className="shareRequestCardBtns">
            <button type="button" className="joinBoardButton m-2" onClick={joinThisBoard}>
              join board
            </button>
            <button type="button" className="declineBoardButton m-2" onClick={rejectRequest}>
              decline
            </button>
          </div>
        </Card.Body>
      </Paper>
    </>
  );
}

ShareRequestCard.propTypes = {
  boardObj: PropTypes.shape({
    board: PropTypes.number,
    id: PropTypes.number,
    icon: PropTypes.string,
  }).isRequired,
  sharedBoard: PropTypes.shape({
    id: PropTypes.number,
    icon: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ShareRequestCard;

/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { getBoardById } from '../api/boardData';
import IconRender from './IconRender';
import SharedBoardButtonsModal from './SharedBoardButtonsModal';

function SharedBoardCard({
  boardObj, onUpdate,
}) {
  const [sharedBoard, setSharedBoard] = useState([]);

  const getSharedBoard = async () => {
    const theBoard = await getBoardById(boardObj.board);
    setSharedBoard(theBoard);
  };

  useEffect(() => {
    getSharedBoard();
  }, []);

  return (
    <>
      <Paper className="sharedBoardCardDiv boardCardDiv" elevation={2}>
        <Card.Body className="cardBody sharedBoardCardBody">
          <Link href={`/boards/${sharedBoard.id}`} passHref>
            <div className="cardDetails">
              <p className="boardIcon"><IconRender iconName={sharedBoard.icon} /></p>
              <p className="boardCardName">{sharedBoard.name?.toLowerCase()}</p>
            </div>
          </Link>
          <div className="sharedBoardCardButtons">
            <SharedBoardButtonsModal boardObj={boardObj} onUpdate={onUpdate} />
          </div>
        </Card.Body>
      </Paper>
    </>
  );
}

SharedBoardCard.propTypes = {
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

export default SharedBoardCard;

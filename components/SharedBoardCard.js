import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
      <Card className="sharedBoardCardDiv" style={{ width: '25%', margin: '10px', height: '10%' }}>
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
      </Card>
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

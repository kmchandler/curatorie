import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleSharedBoard } from '../api/sharedBoardData';
import { getBoardById } from '../api/boardData';
import IconRender from './IconRender';

function SharedBoardCard({
  boardObj, onUpdate,
}) {
  const [sharedBoard, setSharedBoard] = useState([]);

  const deleteThisBoard = () => {
    if (window.confirm(`leave ${sharedBoard.name}?`)) {
      deleteSingleSharedBoard(boardObj.id).then(() => onUpdate());
    }
  };

  const getSharedBoard = async () => {
    const theBoard = await getBoardById(boardObj.board);
    setSharedBoard(theBoard);
  };

  useEffect(() => {
    getSharedBoard();
  }, []);

  return (
    <>
      <Card className="boardCardDiv sharedBoardCardDiv" style={{ width: '25%', margin: '10px', height: '10%' }}>
        <Card.Body className="cardBody sharedBoardCardBody">
          <Link href={`/boards/${sharedBoard.id}`} passHref>
            <div className="cardDetails">
              <p className="boardIcon"><IconRender iconName={sharedBoard.icon} /></p>
              <p className="boardCardType">{sharedBoard.name?.toLowerCase()}</p>
            </div>
          </Link>
          <div className="sharedBoardCardBtns">
            <Link href={`/boards/edit/${sharedBoard.id}`} passHref>
              <button type="button" className="editButton">edit</button>
            </Link>
            <button type="button" className="deleteButton m-2" onClick={deleteThisBoard}>
              leave board
            </button>
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

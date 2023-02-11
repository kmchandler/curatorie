import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleBoard } from '../api/boardData';

function BoardCard({
  boardObj, onUpdate,
}) {
  const deleteThisBoard = () => {
    if (window.confirm(`Delete ${boardObj.name}?`)) {
      deleteSingleBoard(boardObj.id).then(() => onUpdate());
    }
  };

  useEffect(() => {

  }, []);

  return (
    <>
      <Card className="boardCardDiv" style={{ width: '15rem', margin: '10px', height: '12rem' }}>
        <Card.Body className="cardBody boardCardBody">
          <hr />
          <div className="cardDetails">
            <p className="boardIcon">{boardObj.icon}</p>
            <p className="boardCardType">{boardObj.name.toLowerCase()}</p>
          </div>
          <div className="boardCardBtns">
            <Link href={`/boards/edit/${boardObj.id}`} passHref>
              <button type="button" className="editButton">edit</button>
            </Link>
            <button type="button" className="deleteButton m-2" onClick={deleteThisBoard}>
              delete
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

BoardCard.propTypes = {
  boardObj: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BoardCard;

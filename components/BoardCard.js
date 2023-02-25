import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteSingleBoard } from '../api/boardData';
import IconRender from './IconRender';

function BoardCard({
  boardObj, onUpdate,
}) {
  const router = useRouter();

  const deleteThisBoard = () => {
    if (window.confirm(`Delete ${boardObj.name}?`)) {
      deleteSingleBoard(boardObj.id).then(() => onUpdate());
    }
  };

  const shareBoard = () => {
    router.push({
      pathname: '/boards/shared/requests/send',
      query: { boardId: boardObj.id },
    });
  };

  return (
    <>
      <Card className="boardCardDiv" style={{ width: '25%', margin: '10px', height: '10%' }}>
        <Card.Body className="cardBody boardCardBody">
          <Link href={`/boards/${boardObj.id}`} passHref>
            <div className="cardDetails">
              <div className="boardIcon"><IconRender iconName={boardObj.icon} /></div>
              <p className="boardCardType">{boardObj.name.toLowerCase()}</p>
            </div>
          </Link>
          <div className="boardCardBtns">
            <Link href={`/boards/edit/${boardObj.id}`} passHref>
              <button type="button" className="editButton">edit</button>
            </Link>
            <button type="button" className="deleteButton m-2" onClick={deleteThisBoard}>delete</button>
            <button type="button" className="shareButton m-2" onClick={shareBoard}>share</button>
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

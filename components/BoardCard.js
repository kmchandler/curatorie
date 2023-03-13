import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import IconRender from './IconRender';
import BoardButtonsModal from './BoardButtonsModal';

function BoardCard({
  boardObj, onUpdate,
}) {
  return (
    <>
      <Card className="boardCardDiv" style={{ width: '25%', margin: '10px', height: '10%' }}>
        <Card.Body className="cardBody boardCardBody">
          <Link href={`/boards/${boardObj.id}`} passHref>
            <div className="cardDetails">
              <div className="boardIcon"><IconRender iconName={boardObj.icon} /></div>
              <p className="boardCardName">{boardObj.name.toLowerCase()}</p>
            </div>
          </Link>
          <div className="boardCardBtns">
            <BoardButtonsModal boardObj={boardObj} onUpdate={onUpdate} />
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

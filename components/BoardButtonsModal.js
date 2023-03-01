import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteSingleBoard } from '../api/boardData';

function BoardButtonsModal({ boardObj, onUpdate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <button className="custom-btn" type="button" onClick={handleShow}>
        ...
      </button>

      <Modal className="boardModal modal-sm" show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Footer className="boardCardModalBtns">
          <div className="boardCardBtns">
            <Link href={`/boards/edit/${boardObj.id}`} passHref>
              <button type="button" className="editBoardButton">edit</button>
            </Link>
            <button type="button" className="deleteBoardButton" onClick={deleteThisBoard}>delete</button>
            <button type="button" className="shareBoardButton" onClick={shareBoard}>share</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BoardButtonsModal;

BoardButtonsModal.propTypes = {
  boardObj: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

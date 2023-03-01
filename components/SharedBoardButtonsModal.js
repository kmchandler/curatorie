import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Link from 'next/link';
import { deleteSingleSharedBoard } from '../api/sharedBoardData';
import { getBoardById } from '../api/boardData';

function SharedBoardButtonsModal({ boardObj, onUpdate }) {
  const [show, setShow] = useState(false);
  const [sharedBoard, setSharedBoard] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <button className="custom-btn" type="button" onClick={handleShow}>
        ...
      </button>

      <Modal className="boardModal modal-sm" show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Footer className="boardCardModalBtns">
          <div className="boardCardBtns">
            <Link href={`/boards/edit/${sharedBoard.id}`} passHref>
              <button type="button" className="editBoardButton">edit</button>
            </Link>
            <button type="button" className="deleteBoardButton m-2" onClick={deleteThisBoard}>
              leave board
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SharedBoardButtonsModal;

SharedBoardButtonsModal.propTypes = {
  boardObj: PropTypes.shape({
    icon: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
    board: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

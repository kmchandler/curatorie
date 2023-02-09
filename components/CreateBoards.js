import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { getBoardTypes } from '../api/boardTypeData';

const initialState = {
  boardTypes: '',
};

export default function CreateBoard({ obj }) {
  const [page, setPage] = useState(1);
  const [boardTypes, setBoardTypes] = useState([]);
  const [checkedBoardType, setCheckedBoardType] = useState([]);
  const { user } = useAuth();

  const getTheBoardTypes = async () => {
    const types = await getBoardTypes();
    setBoardTypes(types);
  };

  useEffect(() => {
    getTheBoardTypes();
    if (obj.id) {
      setCheckedBoardType(obj.boardTypes || []);
    }
  }, [obj, user]);

  const handleClickBoardType = (e) => {
    const newBoardTypeObj = boardTypes.find((boardType) => boardType.id.toString() === e.target.value);
    setCheckedBoardType(newBoardTypeObj);
  };

  const handleSubmitOne = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  if (page === 1) {
    return (
      <>
        <h2>Select a Board Template</h2>
        <div className="boardTypeSelect">
          {boardTypes.map((boardType) => (
            <h5 key={boardType.id} className="mb-3">
              <Form.Check
                type="radio"
                id={boardType.id}
                label={boardType.type}
                defaultChecked={checkedBoardType.id === boardType.toString()}
                value={boardType.id}
                onChange={handleClickBoardType}
                name="boardTypeRadio"
              />
            </h5>
          ))}
        </div>
        <h5>
          <button className="boardTypeButton" type="button" onClick={handleSubmitOne}>select</button>
        </h5>
      </>
    );
  }

  if (page === 2) {
    console.warn(checkedBoardType, 'checkedBoardType');
    if (checkedBoardType.type === 'gift card') {
      return (
        <h2>
          gift card
        </h2>
      );
    }
    if (checkedBoardType.type === 'inspo card') {
      return (
        <h2>
          inspo card
        </h2>
      );
    }
    if (checkedBoardType.type === 'list card') {
      return (
        <h2>
          list card
        </h2>
      );
    }
    if (checkedBoardType.type === 'purchase card') {
      return (
        <h2>
          purchase card
        </h2>
      );
    }
  }
}

CreateBoard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    boardTypes: PropTypes.string,
  }),
};

CreateBoard.defaultProps = {
  obj: initialState,
};

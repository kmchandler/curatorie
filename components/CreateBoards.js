import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { createBoardType, getBoardTypes } from '../api/boardTypeData';
import getIcons from '../api/iconData';
import { createBoard, updateBoard } from '../api/boardData';

const initialState = {
  boardTypes: '',
};

export default function CreateBoard({ obj }) {
  const [page, setPage] = useState(1);
  const [formInput, setFormInput] = useState([]);
  const [boardTypes, setBoardTypes] = useState([]);
  const [icons, setIcons] = useState([]);
  const [checkedBoardType, setCheckedBoardType] = useState([]);
  const [checkedIcon, setCheckedIcon] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getTheBoardTypes = async () => {
    const types = await getBoardTypes();
    setBoardTypes(types);
  };

  const getTheIcons = async () => {
    const allIcons = await getIcons();
    setIcons(allIcons);
  };

  useEffect(() => {
    getTheBoardTypes();
    if (obj.id) {
      setCheckedBoardType(obj.boardTypes || []);
    }
    getTheIcons();
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickBoardType = (e) => {
    const newBoardTypeObj = boardTypes.find((boardType) => boardType.id.toString() === e.target.value);
    setCheckedBoardType(newBoardTypeObj);
  };

  const handleClickIcon = (e) => {
    const newIconObj = icons.find((icon) => icon.id.toString() === e.target.value);
    setCheckedIcon(newIconObj);
    setFormInput({ ...formInput, icon: newIconObj.name });
  };

  const handleSubmitOne = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const handleSubmitTwo = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateBoard(formInput);
      router.push('/');
    } else {
      createBoard(formInput).then((boardObj) => {
        const boardPromise = createBoardType(boardObj, checkedBoardType);
        Promise.all(boardPromise).then(() => router.push('/'));
      });
    }
  };

  if (page === 1) {
    return (
      <>
        <div>Select a Board Template</div>
        <div className="boardTypeSelect">
          {boardTypes.map((boardType) => (
            <div key={boardType.id} className="mb-3">
              <Form.Check
                type="radio"
                id={boardType.id}
                label={boardType.type}
                defaultChecked={checkedBoardType.id === boardType.toString()}
                value={boardType.id}
                onChange={handleClickBoardType}
                name="boardTypeRadio"
              />
            </div>
          ))}
        </div>
        <div>
          <button className="boardTypeButton" type="button" onClick={handleSubmitOne}>select</button>
        </div>
      </>
    );
  }

  if (page === 2) {
    return (
      <>
        <div>Create Board</div>
        <Form>
          <Form.Group className="mb-3" controlId="boardName">
            <Form.Control type="text" placeholder="board name" value={formInput.name} onChange={handleChange} />
          </Form.Group>

          <div className="iconsSelect">
            {icons.map((icon) => (
              <div key={icon.id} className="mb-3">
                <Form.Check
                  type="radio"
                  id={`${icon.id}_iconRadio`}
                  label={icon.name}
                  defaultChecked={checkedIcon.id === icon.toString()}
                  value={icon.id}
                  onChange={handleClickIcon}
                  name="IconRadio"
                />
              </div>
            ))}
          </div>

          <Button variant="primary" type="button" onClick={handleSubmitTwo}>
            Submit
          </Button>
        </Form>
      </>
    );
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

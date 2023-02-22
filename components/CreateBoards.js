import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { createBoardType } from '../api/boardTypeData';
import getTypes from '../api/typeData';
import getIcons from '../api/iconData';
import { createBoard, updateBoard } from '../api/boardData';
import { getUserByUid } from '../api/userData';

const initialState = {
  boardTypes: '',
};

export default function CreateBoard({ obj }) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [formInput, setFormInput] = useState([]);
  const [boardTypes, setBoardTypes] = useState([]);
  const [icons, setIcons] = useState([]);
  const [checkedBoardType, setCheckedBoardType] = useState([]);
  const [checkedIcon, setCheckedIcon] = useState([]);
  const [appUser, setAppUser] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getTheBoardTypes = async () => {
    const types = await getTypes();
    setBoardTypes(types);
  };

  const getTheIcons = async () => {
    const allIcons = await getIcons();
    setIcons(allIcons);
  };

  const getTheUser = async () => {
    const theUser = await getUserByUid(user.uid);
    setAppUser(theUser);
  };

  const setup = async () => {
    await getTheUser();
    await getTheBoardTypes();
    setLoading(false);
  };

  useEffect(() => {
    if (obj.id) {
      setPage(page + 1);
      setCheckedIcon(obj.icon);
      setFormInput({ name: obj.name });
    }
    getTheIcons();
  }, [obj]);

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
      updateBoard({ ...formInput, user_id: obj.user_id, id: obj.id });
      router.push('/');
    } else {
      createBoard({ ...formInput, user_id: appUser.id }).then((boardObj) => {
        const payload = { type: checkedBoardType.type, board_id: boardObj.id };
        const boardPromise = createBoardType(payload);
        Promise.all([boardPromise]).then(() => router.push('/'));
      });
    }
  };

  if (loading) {
    setup();
    return <div>loading</div>;
  }

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
        <div className="addEditHeaderText">{obj.id ? 'update' : 'create'} board</div>
        <Form>
          <Form.Group className="mb-3" controlId="boardName">
            <Form.Control name="name" type="text" placeholder="board name" value={formInput.name} onChange={handleChange} required />
          </Form.Group>

          <div className="iconsSelect">
            {icons.map((icon) => (
              <div key={icon.id} className="mb-3">
                <Form.Check
                  type="radio"
                  id={`${icon.id}_iconRadio`}
                  label={icon.name}
                  defaultChecked={checkedIcon.name === icon.toString()}
                  value={icon.id}
                  required
                  onChange={handleClickIcon}
                  name="icon"
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
    icon: PropTypes.string,
    boardTypes: PropTypes.string,
    name: PropTypes.string,
    user_id: PropTypes.number,
  }),
};

CreateBoard.defaultProps = {
  obj: initialState,
};

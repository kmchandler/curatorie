import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { getBoardTypes } from '../api/boardTypeData';
import getIcons from '../api/iconData';

const initialState = {
  boardTypes: '',
};

export default function CreateBoard({ obj }) {
  const [page, setPage] = useState(1);
  const [boardTypes, setBoardTypes] = useState([]);
  const [icons, setIcons] = useState([]);
  const [checkedBoardType, setCheckedBoardType] = useState([]);
  const [checkedIcon, setCheckedIcon] = useState([]);
  const { user } = useAuth();

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

  const handleClickBoardType = (e) => {
    const newBoardTypeObj = boardTypes.find((boardType) => boardType.id.toString() === e.target.value);
    setCheckedBoardType(newBoardTypeObj);
  };

  const handleClickIcon = (e) => {
    const newIconObj = icons.find((icon) => icon.id.toString() === e.target.value);
    setCheckedIcon(newIconObj);
  };

  const handleSubmitOne = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const handleSubmitGift = (e) => {
    e.preventDefault();
    // if there is a obj.id, on submit, the gift board is edited. join tables for board type cannot be edited, because the card info for each type is different
    // if the obj.id does not exist, on submit, the new gift board is created and the new join table for board type is created, then the user is routed back to the home page
  };

  const handleSubmitInspo = (e) => {
    e.preventDefault();
    // if there is a obj.id, on submit, the inspo board is edited. join tables for board type cannot be edited, because the card info for each type is different
    // if the obj.id does not exist, on submit, the new inspo board is created and the new join table for board type is created, then the user is routed back to the home page
  };

  const handleSubmitList = (e) => {
    e.preventDefault();
    // if there is a obj.id, on submit, the list board is edited. join tables for board type cannot be edited, because the card info for each type is different
    // if the obj.id does not exist, on submit, the new list board is created and the new join table for board type is created, then the user is routed back to the home page
  };

  const handleSubmitPurchase = (e) => {
    e.preventDefault();
    // if there is a obj.id, on submit, the purchae board is edited. join tables for board type cannot be edited, because the card info for each type is different
    // if the obj.id does not exist, on submit, the new purchae board is created and the new join table for board type is created, then the user is routed back to the home page
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
    if (checkedBoardType.type === 'gift card') {
      return (
        <>
          <h3>Create Board</h3>
          <Form>
            <Form.Group className="mb-3" controlId="giftBoardName">
              <Form.Control type="text" placeholder="board name" />
            </Form.Group>

            <div className="iconsSelect">
              {icons.map((icon) => (
                <h5 key={icon.id} className="mb-3">
                  <Form.Check
                    type="radio"
                    id={icon.id}
                    label={icon.name}
                    defaultChecked={checkedIcon.id === icon.toString()}
                    value={icon.id}
                    onChange={handleClickIcon}
                    name="IconRadio"
                  />
                </h5>
              ))}
            </div>

            <Button variant="primary" type="submit" onSubmit={handleSubmitGift}>
              Submit
            </Button>
          </Form>
        </>
      );
    }
    if (checkedBoardType.type === 'inspo card') {
      return (
        <>
          <h3>Create Board</h3>
          <Form>
            <Form.Group className="mb-3" controlId="inspoBoardName">
              <Form.Control type="text" placeholder="board name" />
            </Form.Group>

            <div className="iconsSelect">
              {icons.map((icon) => (
                <h5 key={icon.id} className="mb-3">
                  <Form.Check
                    type="radio"
                    id={icon.id}
                    label={icon.name}
                    defaultChecked={checkedIcon.id === icon.toString()}
                    value={icon.id}
                    onChange={handleClickIcon}
                    name="IconRadio"
                  />
                </h5>
              ))}
            </div>

            <Button variant="primary" type="submit" onSubmit={handleSubmitInspo}>
              Submit
            </Button>
          </Form>
        </>
      );
    }
    if (checkedBoardType.type === 'list card') {
      return (
        <>
          <h3>Create Board</h3>
          <Form>
            <Form.Group className="mb-3" controlId="listBoardName">
              <Form.Control type="text" placeholder="board name" />
            </Form.Group>

            <div className="iconsSelect">
              {icons.map((icon) => (
                <h5 key={icon.id} className="mb-3">
                  <Form.Check
                    type="radio"
                    id={icon.id}
                    label={icon.name}
                    defaultChecked={checkedIcon.id === icon.toString()}
                    value={icon.id}
                    onChange={handleClickIcon}
                    name="IconRadio"
                  />
                </h5>
              ))}
            </div>

            <Button variant="primary" type="submit" onSubmit={handleSubmitList}>
              Submit
            </Button>
          </Form>
        </>
      );
    }
    if (checkedBoardType.type === 'purchase card') {
      return (
        <>
          <h3>Create Board</h3>
          <Form>
            <Form.Group className="mb-3" controlId="purchaseBoardName">
              <Form.Control type="text" placeholder="board name" />
            </Form.Group>

            <div className="iconsSelect">
              {icons.map((icon) => (
                <h5 key={icon.id} className="mb-3">
                  <Form.Check
                    type="radio"
                    id={icon.id}
                    label={icon.name}
                    defaultChecked={checkedIcon.id === icon.toString()}
                    value={icon.id}
                    onChange={handleClickIcon}
                    name="IconRadio"
                  />
                </h5>
              ))}
            </div>

            <Button variant="primary" type="submit" onSubmit={handleSubmitPurchase}>
              Submit
            </Button>
          </Form>
        </>
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

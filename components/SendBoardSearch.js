import { React, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { searchUsers } from '../api/userData';

export default function SendBoardSearch({ setFilteredUsers, myUser }) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usersResponse = await searchUsers(input, myUser);
      setFilteredUsers(usersResponse);
    } catch (error) {
      setFilteredUsers([]);
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  return (
    <div className="shareBoardSearchDiv">
      <Form className="searchBar shareBoardSearchBar" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="search users"
          className="me-2"
          value={input}
          name="userSearch"
          onChange={handleChange}
        />
        <button type="submit" className="shareBoardsSearchBtn">
          submit
        </button>
      </Form>
    </div>
  );
}

SendBoardSearch.propTypes = {
  setFilteredUsers: PropTypes.func.isRequired,
  myUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

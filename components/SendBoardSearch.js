import { React, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { searchUsers } from '../api/userData';

export default function SendBoardSearch({ setFilteredUsers }) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usersResponse = await searchUsers(input);
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
    <>
      <Form className="searchBar" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="search"
          className="me-2"
          value={input}
          name="userSearch"
          onChange={handleChange}
        />
        <button type="submit">
          submit
        </button>
      </Form>
    </>
  );
}

SendBoardSearch.propTypes = {
  setFilteredUsers: PropTypes.func.isRequired,
};

import { React, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SendBoardSearch({ setFilteredUsers, users }) {
  const [input, setInput] = useState('');

  const userObj = users;

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
    const results = userObj.filter((user) => user?.email?.toLowerCase().includes(value.toLowerCase()) || user?.username?.toString().toLowerCase().includes(value.toLowerCase()) || user?.first_name?.toLowerCase().includes(value.toLowerCase()) || user?.last_name?.toLowerCase().includes(value.toLowerCase()));
    setFilteredUsers(results);
  };
  return (
    <Form className="searchBar">
      <Form.Control
        type="search"
        placeholder="search"
        className="me-2"
        value={input}
        name="userSearch"
        onChange={handleChange}
      />
    </Form>
  );
}

SendBoardSearch.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(
    {
      title: PropTypes.string,
      genre: PropTypes.string,
    },
  )).isRequired,
  setFilteredUsers: PropTypes.func.isRequired,
};

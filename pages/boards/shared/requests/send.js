import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllUsers } from '../../../../api/userData';
import UserCard from '../../../../components/UserCard';
import SendBoardSearch from '../../../../components/SendBoardSearch';

function SharedBoards({ boardObj }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const getAllTheUsers = async () => {
    const theUsers = await getAllUsers();
    setUsers(theUsers);
    setFilteredUsers(theUsers);
  };
  useEffect(() => {
    getAllTheUsers();
  }, []);

  return (
    <div>
      <h1>share boards</h1>
      <div className="d-flex flex-wrap cardContainer boardCardDiv">
        <SendBoardSearch users={users} setFilteredUsers={setFilteredUsers} />
      </div>
      <div className="d-flex flex-wrap cardContainer usersCardDiv">
        {filteredUsers.map((user) => <UserCard key={user.id} userObj={user} boardObj={boardObj} onUpdate={getAllTheUsers} />)}
      </div>
    </div>
  );
}

SharedBoards.propTypes = {
  boardObj: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default SharedBoards;

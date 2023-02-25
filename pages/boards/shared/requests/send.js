import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { getAllUsers } from '../../../../api/userData';
import UserCard from '../../../../components/UserCard';
import SendBoardSearch from '../../../../components/SendBoardSearch';

function SharedBoards() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const router = useRouter();
  const { boardId } = router.query;

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
      <h3 className="shareBoardsTitle">share boards</h3>
      <div className="d-flex flex-wrap cardContainer boardCardDiv">
        <SendBoardSearch users={users} setFilteredUsers={setFilteredUsers} />
      </div>
      <div className="d-flex flex-wrap cardContainer usersCardDiv">
        {filteredUsers.map((user) => <UserCard key={user.id} userObj={user} boardId={boardId} onUpdate={getAllTheUsers} />)}
      </div>
    </div>
  );
}

SharedBoards.propTypes = {
  boardId: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default SharedBoards;

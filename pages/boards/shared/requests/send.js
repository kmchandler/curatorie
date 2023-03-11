import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import UserCard from '../../../../components/UserCard';
import SendBoardSearch from '../../../../components/SendBoardSearch';

function SharedBoards({ myUser }) {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const router = useRouter();
  const { boardId } = router.query;

  return (
    <div>
      <h3 className="shareBoardsTitle">share boards</h3>
      <div className="shareSearchBarDiv">
        <SendBoardSearch className="shareSearchBar" setFilteredUsers={setFilteredUsers} myUser={myUser} />
      </div>
      <div className="d-flex flex-wrap cardContainer usersCardDiv">
        {filteredUsers.map((user) => <UserCard className="userCard" key={user.id} userObj={user} boardId={boardId} />)}
      </div>
    </div>
  );
}

SharedBoards.propTypes = {
  boardId: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  myUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default SharedBoards;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getSharedBoardsByUserId } from '../../../api/sharedBoardData';
import { getUserByUid } from '../../../api/userData';
import SharedBoardCard from '../../../components/SharedBoardCard';

function SharedBoards() {
  const { user } = useAuth();
  const [appUser, setAppUser] = useState([]);
  const [sharedBoards, setSharedBoards] = useState([]);

  const getUser = async () => {
    const theUser = await getUserByUid(user.uid);
    setAppUser(theUser);
  };

  console.warn(appUser);

  const getBoards = async () => {
    const theBoards = await getSharedBoardsByUserId(appUser.id);
    setSharedBoards(theBoards);
  };

  console.warn(sharedBoards);

  useEffect(() => {
    getUser();
  }, [user]);

  useEffect(() => {
    getBoards();
  }, [appUser]);

  return (
    <div>
      <h1>shared boards</h1>
      <div className="d-flex flex-wrap cardContainer boardCardDiv">
        {sharedBoards.map((sb) => <SharedBoardCard key={sb.id} boardObj={sb} onUpdate={getBoards} />)}
      </div>
    </div>
  );
}

export default SharedBoards;

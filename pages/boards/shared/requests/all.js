import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../utils/context/authContext';
import { getShareRequestsByUserId } from '../../../../api/shareRequestData';
import { getUserByUid } from '../../../../api/userData';
import ShareRequestCard from '../../../../components/ShareRequestCard';

function ShareRequests() {
  const { user } = useAuth();
  const [appUser, setAppUser] = useState([]);
  const [shareRequests, setShareRequests] = useState([]);

  const getUser = async () => {
    const theUser = await getUserByUid(user.uid);
    setAppUser(theUser);
  };

  const getRequests = async () => {
    const theRequests = await getShareRequestsByUserId(appUser.id);
    setShareRequests(theRequests);
  };

  useEffect(() => {
    getUser();
  }, [user]);

  useEffect(() => {
    if (appUser.id) {
      getRequests();
    }
  }, [appUser]);

  return (
    <div>
      <h1>share requests</h1>
      <div className="d-flex flex-wrap cardContainer boardCardDiv">
        {shareRequests.map((sr) => <ShareRequestCard key={sr.id} boardObj={sr} onUpdate={getRequests} />)}
      </div>
    </div>
  );
}

export default ShareRequests;

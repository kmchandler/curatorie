import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../utils/context/authContext';
import InspoCardForm from '../../../../../components/InspoCardForm';
import { getInspoCardById } from '../../../../../api/inspoCardData';
import { getUserByUid } from '../../../../../api/userData';

export default function EditCard() {
  const [editItem, setEditItem] = useState({});
  const [appUser, setAppUser] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { boardItemId } = router.query;
  const { user } = useAuth();

  const getTheUser = async () => {
    const theUser = await getUserByUid(user.uid);
    setAppUser(theUser);
  };

  const getEditItem = async () => {
    const theEditItem = await getInspoCardById(id);
    const payload = { ...theEditItem, board_id: boardItemId, user_id: appUser.id };
    setEditItem(payload);
  };

  useEffect(() => {
    getTheUser();
  }, [user]);

  useEffect(() => {
    getEditItem();
  }, [appUser]);

  if (!editItem.id) return null;

  return (<InspoCardForm obj={editItem} user={appUser} />);
}

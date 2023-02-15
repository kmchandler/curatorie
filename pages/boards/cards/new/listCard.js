import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../../../utils/context/authContext';
import ListCardForm from '../../../../components/ListCardForm';
import { getUserByUid } from '../../../../api/userData';

  <Head>
    <title>POPPED:create new card</title>
    <meta name="createCard" content="create new card" />
  </Head>;

export default function NewListCard() {
  const router = useRouter();
  const { user } = useAuth();
  const { boardItemId } = router.query;
  const [appUser, setAppUser] = useState([]);

  const getUser = async () => {
    const theUser = await getUserByUid(user.uid);
    setAppUser(theUser);
  };

  useEffect(() => {
    getUser();
  }, [user]);

  return (<ListCardForm boardItemId={boardItemId} user={appUser} />);
}

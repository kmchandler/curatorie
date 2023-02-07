import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { getUserByUserId } from '../../../api/userData';
import RegisterForm from '../../../components/RegisterForm';

  <Head>
    <title>POPPED:edit profile</title>
    <meta name="edit_user" content="edit user" />
  </Head>;

export default function EditUser() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getUserByUserId(id).then(setEditItem);
  }, [id]);
  return (<RegisterForm obj={editItem} user={editItem} />);
}

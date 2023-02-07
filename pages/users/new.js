import React from 'react';
import Head from 'next/head';
import RegisterForm from '../../components/RegisterForm';

  <Head>
    <title>curatorie:users</title>
    <meta name="description" content="Meta description for the users page" />
  </Head>;

export default function createUser() {
  return (
    <RegisterForm />
  );
}

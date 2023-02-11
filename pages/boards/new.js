import React from 'react';
import Head from 'next/head';
import CreateBoard from '../../components/CreateBoards';

  <Head>
    <title>curatorie:new board</title>
    <meta name="new board" content="Meta description for the new board page" />
  </Head>;

export default function newBoard() {
  return (
    <div>
      <h1><CreateBoard /></h1>
    </div>
  );
}

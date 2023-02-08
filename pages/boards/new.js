import React from 'react';
import Head from 'next/head';

  <Head>
    <title>curatorie:new board</title>
    <meta name="new board" content="Meta description for the new board page" />
  </Head>;

export default function newBoard() {
// on the template page, the user chooses one and hits submit
// the submit button updates the page with the next component with the create form for that type of board
// when they enter that info and hit submit, it takes them to the home page which displays all boards
  return (
    <div>
      <h1>new board page</h1>
    </div>
  );
}

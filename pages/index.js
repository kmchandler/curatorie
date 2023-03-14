/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import logo from '../styles/curatorie_logo_name.png';
import { useAuth } from '../utils/context/authContext';
import { getBoardsByUserId } from '../api/boardData';
import { getUserByUid } from '../api/userData';
import BoardCard from '../components/BoardCard';

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [boards, setBoards] = useState([]);
  const [open, setOpen] = useState(false);

  const getUserAndBoards = async () => {
    const theUser = await getUserByUid(user.uid);
    const theBoards = await getBoardsByUserId(theUser.id);
    setBoards(theBoards);
  };

  useEffect(() => {
    getUserAndBoards();
  }, [user]);

  useEffect(() => {
    if (router.query.requestSuccess === 'true') {
      setOpen(true);
    }
  }, []);

  const addBoard = () => {
    router.push('/boards/new');
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="indexBoardsPage">
        <div className="logoContainer">
          <Image src={logo} className="indexLogo" alt="logo" />
        </div>
        <button type="button" className="addBoardBtn" onClick={addBoard}>
          add board
        </button>
        <div className="cardContainer indexCards">
          {boards.map((board) => <BoardCard key={board.id} boardObj={board} onUpdate={getUserAndBoards} />)}
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" severity="success" sx={{ width: '100%' }}>
          board sent
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Home;

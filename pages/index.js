import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getBoardsByUserId } from '../api/boardData';
import { getUserByUid } from '../api/userData';
import BoardCard from '../components/BoardCard';

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [boards, setBoards] = useState([]);

  const getUserAndBoards = async () => {
    const theUser = await getUserByUid(user.uid);
    const theBoards = await getBoardsByUserId(theUser.id);
    setBoards(theBoards);
  };

  useEffect(() => {
    getUserAndBoards();
  }, [user]);

  const addBoard = () => {
    router.push('/boards/new');
  };

  return (
    <div className="indexBoardsPage">
      <h1>Boards</h1>
      <Button type="button" className="addBoardBtn" onClick={addBoard}>
        add board
      </Button>
      <div className="cardContainer">
        {boards.map((board) => <BoardCard key={board.id} boardObj={board} onUpdate={getUserAndBoards} />)}
      </div>
    </div>
  );
}

export default Home;

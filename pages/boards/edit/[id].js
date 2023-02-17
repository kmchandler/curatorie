import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getBoardById } from '../../../api/boardData';
import CreateBoard from '../../../components/CreateBoards';

export default function EditBoard() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getBoardById(id).then(setEditItem);
  }, [id]);

  if (!editItem.id) return null;

  return (<CreateBoard obj={editItem} user={user} />);
}

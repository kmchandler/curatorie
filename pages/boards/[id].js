import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import GiftCard from '../../components/GiftCard';
import InspoCard from '../../components/InspoCard';
import ListCard from '../../components/ListCard';
import PurchaseCard from '../../components/PurchaseCard';
import { getGiftCardsByBoardId } from '../../api/giftCardData';
import { getInspoCardsByBoardId } from '../../api/inspoCardData';
import { getListCardsByBoardId } from '../../api/listCardData';
import { getPurchaseCardsByBoardId } from '../../api/purchaseCardData';
import { getBoardById } from '../../api/boardData';
import { getBoardTypeByBoardId } from '../../api/boardTypeData';

export default function IndividualBoard() {
  const router = useRouter();
  const { id } = router.query;
  const [boardItem, setBoardItem] = useState([]);
  const [boardTypeObj, setBoardTypeObj] = useState([]);
  const [giftCards, setGiftCards] = useState([]);
  const [inspoCards, setInspoCards] = useState([]);
  const [listCards, setListCards] = useState([]);
  const [purchaseCards, setPurchaseCards] = useState([]);

  const getBoardItem = async () => {
    await getBoardById(id).then(setBoardItem);
  };

  const getType = async () => {
    const theBoardType = await getBoardTypeByBoardId(boardItem.id);
    setBoardTypeObj(theBoardType);
  };

  const getCards = async () => {
    if (boardTypeObj.type === 'gift card') {
      const theGiftCards = await getGiftCardsByBoardId(boardItem.id);
      setGiftCards(theGiftCards);
    } if (boardTypeObj.type === 'inspo card') {
      const theInspoCards = await getInspoCardsByBoardId(boardItem.id);
      setInspoCards(theInspoCards);
    } if (boardTypeObj.type === 'list card') {
      const theListCards = await getListCardsByBoardId(boardItem.id);
      setListCards(theListCards);
    } if (boardTypeObj.type === 'purchase card') {
      const thePurchaseCards = await getPurchaseCardsByBoardId(boardItem.id);
      setPurchaseCards(thePurchaseCards);
    }
  };

  const getInfo = () => {
    getBoardItem();
    getType();
    getCards();
  };

  useEffect(() => {
    getInfo();
  }, [id]);

  const addCard = () => {
    router.push('/boards/cards/new');
  };

  console.warn(boardItem, 'boardItem');
  console.warn(boardTypeObj, 'boardTypeObj');

  if (boardTypeObj.type === 'gift card') {
    return (
      <div>
        <Button variant="primary" type="button" onClick={addCard}>
          Add Card
        </Button>
        <div className="d-flex flex-wrap cardContainer giftCardDiv">
          {giftCards.map((giftCard) => <GiftCard key={giftCard.id} giftCardObj={giftCard} onUpdate={getInfo} />)}
        </div>
      </div>
    );
  } if (boardTypeObj.type === 'inspo card') {
    return (
      <div>
        <Button variant="primary" type="button" onClick={addCard}>
          Add Card
        </Button>
        <div className="d-flex flex-wrap cardContainer inspoCardDiv">
          {inspoCards.map((inspoCard) => <InspoCard key={inspoCard.id} inspoCardObj={inspoCard} onUpdate={getInfo} />)}
        </div>
      </div>
    );
  } if (boardTypeObj.type === 'list card') {
    return (
      <div>
        <Button variant="primary" type="button" onClick={addCard}>
          Add Card
        </Button>
        <div className="d-flex flex-wrap cardContainer listCardDiv">
          {listCards.map((listCard) => <ListCard key={listCard.id} listCardObj={listCard} onUpdate={getInfo} />)}
        </div>
      </div>
    );
  } if (boardTypeObj.type === 'purchase card') {
    return (
      <div>
        <Button variant="primary" type="button" onClick={addCard}>
          Add Card
        </Button>
        <div className="d-flex flex-wrap cardContainer purchaseCardDiv">
          {purchaseCards.map((purchaseCard) => <PurchaseCard key={purchaseCard.id} purchaseCardObj={purchaseCard} onUpdate={getInfo} />)}
        </div>
      </div>
    );
  }
  return (
    <div>
      <Button variant="primary" type="button" onClick={addCard}>
        Add Card
      </Button>
    </div>
  );
}

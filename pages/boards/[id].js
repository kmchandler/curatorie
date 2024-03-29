import React, { useEffect, useState } from 'react';
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
  const [boardItem, setBoardItem] = useState({});
  const [boardTypeObj, setBoardTypeObj] = useState({});
  const [giftCards, setGiftCards] = useState([]);
  const [inspoCards, setInspoCards] = useState([]);
  const [listCards, setListCards] = useState([]);
  const [purchaseCards, setPurchaseCards] = useState([]);

  const getBoardItem = async () => {
    await getBoardById(id).then(setBoardItem);
  };

  const getType = async () => {
    const theBoardType = await getBoardTypeByBoardId(id);
    setBoardTypeObj(theBoardType[0]);
  };

  const sortResults = (results) => {
    results.sort((card) => {
      if (card.priority) {
        return -1;
      }
      return 1;
    });
  };

  const getCards = async () => {
    if (boardTypeObj.type === 'gift card') {
      const theGiftCards = await getGiftCardsByBoardId(id);
      sortResults(theGiftCards);
      setGiftCards(theGiftCards);
    } if (boardTypeObj.type === 'inspo card') {
      const theInspoCards = await getInspoCardsByBoardId(id);
      sortResults(theInspoCards);
      setInspoCards(theInspoCards);
    } if (boardTypeObj.type === 'list card') {
      const theListCards = await getListCardsByBoardId(id);
      sortResults(theListCards);
      setListCards(theListCards);
    } if (boardTypeObj.type === 'purchase card') {
      const thePurchaseCards = await getPurchaseCardsByBoardId(id);
      sortResults(thePurchaseCards);
      setPurchaseCards(thePurchaseCards);
    }
  };

  const getInfo = () => {
    getBoardItem();
    getType();
  };

  useEffect(() => {
    getInfo();
  }, [id]);

  useEffect(() => {
    if (boardTypeObj.id) {
      getCards();
    }
  }, [boardTypeObj]);

  const addGiftCard = () => {
    router.push({
      pathname: '/boards/cards/new/giftCard',
      query: { boardItemId: boardItem.id },
    });
  };

  const addInspoCard = () => {
    router.push({
      pathname: '/boards/cards/new/inspoCard',
      query: { boardItemId: boardItem.id },
    });
  };

  const addListCard = () => {
    router.push({
      pathname: '/boards/cards/new/listCard',
      query: { boardItemId: boardItem.id },
    });
  };

  const addPurchaseCard = () => {
    router.push({
      pathname: '/boards/cards/new/purchaseCard',
      query: { boardItemId: boardItem.id },
    });
  };

  console.warn(giftCards);

  if (boardTypeObj.type === 'gift card') {
    return (
      <div className="cardPageDiv">
        <h3 className="boardNameHeader">{boardItem.name}</h3>
        <button className="addCardBtn" type="button" onClick={addGiftCard}>
          add card
        </button>
        <div className="d-flex flex-wrap cardContainer giftCardDiv">
          {giftCards.map((giftCard) => <GiftCard key={giftCard.id} boardItemId={boardItem.id} giftCardObj={giftCard} onUpdate={getInfo} />)}
        </div>
      </div>
    );
  } if (boardTypeObj.type === 'inspo card') {
    return (
      <div className="cardPageDiv">
        <h3 className="boardNameHeader">{boardItem.name}</h3>
        <button className="addCardBtn" type="button" onClick={addInspoCard}>
          add card
        </button>
        <div className="d-flex flex-wrap cardContainer inspoCardDiv">
          {inspoCards.map((inspoCard) => <InspoCard key={inspoCard.id} boardItemId={boardItem.id} inspoCardObj={inspoCard} onUpdate={getInfo} />)}
        </div>
      </div>
    );
  } if (boardTypeObj.type === 'list card') {
    return (
      <div className="cardPageDiv">
        <h3 className="boardNameHeader">{boardItem.name}</h3>
        <button className="addCardBtn" type="button" onClick={addListCard}>
          add card
        </button>
        <div className="d-flex flex-wrap cardContainer listCardDiv">
          {listCards.map((listCard) => <ListCard key={listCard.id} boardItemId={boardItem.id} listCardObj={listCard} onUpdate={getInfo} />)}
        </div>
      </div>
    );
  } if (boardTypeObj.type === 'purchase card') {
    return (
      <div className="cardPageDiv">
        <h3 className="boardNameHeader">{boardItem.name}</h3>
        <button className="addCardBtn" type="button" onClick={addPurchaseCard}>
          add card
        </button>
        <div className="d-flex flex-wrap cardContainer purchaseCardDiv">
          {purchaseCards.map((purchaseCard) => <PurchaseCard key={purchaseCard.id} boardItemId={boardItem.id} purchaseCardObj={purchaseCard} onUpdate={getInfo} />)}
        </div>
      </div>
    );
  }
  return (
    null
  );
}

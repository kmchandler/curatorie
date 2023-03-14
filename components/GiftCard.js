/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import { deleteSingleGiftCard } from '../api/giftCardData';

function GiftCard({ giftCardObj, boardItemId, onUpdate }) {
  const router = useRouter();

  const deleteThisCard = () => {
    if (window.confirm('Delete card?')) {
      deleteSingleGiftCard(giftCardObj.id).then(() => onUpdate());
    }
  };

  const editGiftCard = () => {
    router.push({
      pathname: `/boards/cards/edit/gift/${giftCardObj.id}`,
      query: { boardItemId },
    });
  };

  return (
    <Paper elevation={2} className="giftCard cardBodyStyle">
      <a href={giftCardObj.link}>
        <Card.Img className="cardImage" variant="top" src={giftCardObj.image_url} />
      </a>
      <Card.Body className="giftCardBody">
        <div className="giftItem">{giftCardObj.item} {giftCardObj.priority ? '⭐' : null}</div>
        <hr />
        <div className="giftDescription">{giftCardObj.description}</div>
        <div className="giftPrice">${giftCardObj.price}</div>
        <div className="giftOccasion">occasion: {giftCardObj.occasion}</div>
        <div className="giftFor">{giftCardObj.gift_for === 'someone_else' ? null : 'for: me'}</div>
        <div className="giftName">{giftCardObj.gift_for === 'someone_else' ? 'for:' : 'from:'} {giftCardObj.name}</div>
        <div className="giftCardBtns">
          <button type="button" className="editGiftButton" onClick={editGiftCard}>edit</button>
          <button type="button" className="deleteGiftButton m-2" onClick={deleteThisCard}>
            delete
          </button>
        </div>
      </Card.Body>
    </Paper>
  );
}

GiftCard.propTypes = {
  giftCardObj: PropTypes.shape({
    id: PropTypes.string,
    link: PropTypes.string,
    image_url: PropTypes.string,
    item: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    occasion: PropTypes.string,
    gift_for: PropTypes.string,
    name: PropTypes.string,
    priority: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  boardItemId: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default GiftCard;

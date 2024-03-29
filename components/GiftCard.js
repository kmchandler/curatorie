/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import { deleteSingleGiftCard } from '../api/giftCardData';
import Tooltip from '@mui/material/Tooltip';

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
        <Card.Img className="cardImage giftCardImage" variant="top" src={giftCardObj.image_url} />
      </a>
      <Card.Body className="giftCardBody">
        <div className="giftItem">{giftCardObj.item.toLowerCase()} {giftCardObj.priority ? '⭐' : null}</div>
        <hr />
        <Tooltip title={giftCardObj.description.toLowerCase()} disableHoverListener={giftCardObj.description.length < 40} placement="top">
          <div className="giftDescription">{giftCardObj.description.toLowerCase()}</div>
        </Tooltip>
        <div className="giftPrice">${giftCardObj.price}</div>
        <div className="giftOccasion">occasion: {giftCardObj.occasion.toLowerCase()}</div>
        <div className="giftFor">{giftCardObj.gift_for === 'someone else' ? null : 'for: me'}</div>
        <div className="giftName">{giftCardObj.gift_for === 'someone else' ? 'for:' : 'from:'} {giftCardObj.name.toLowerCase()}</div>
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

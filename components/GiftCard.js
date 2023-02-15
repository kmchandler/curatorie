import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function GiftCard({ giftCardObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={giftCardObj.image_url} />
      <Card.Body>
        <div>{giftCardObj.item}</div>
        <div>{giftCardObj.description}</div>
        <div>${giftCardObj.price}</div>
        <div>{giftCardObj.occasion}</div>
        <div>{giftCardObj.gift_for}</div>
        <div>{giftCardObj.name}</div>
        <div>{giftCardObj.priority ? '⭐' : null}</div>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

GiftCard.propTypes = {
  giftCardObj: PropTypes.shape({
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
};

export default GiftCard;

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function PurchaseCard({ purchaseCardObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={purchaseCardObj.image_url} />
      <Card.Body>
        <div>{purchaseCardObj.item}</div>
        <div>{purchaseCardObj.description}</div>
        <div>${purchaseCardObj.price}</div>
        <div>{purchaseCardObj.priority ? purchaseCardObj.priority : null}</div>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

PurchaseCard.propTypes = {
  purchaseCardObj: PropTypes.shape({
    link: PropTypes.string,
    image_url: PropTypes.string,
    item: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    priority: PropTypes.bool,
  }).isRequired,
};

export default PurchaseCard;

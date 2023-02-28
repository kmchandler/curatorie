import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { deleteSinglePurchaseCard } from '../api/purchaseCardData';

function PurchaseCard({ purchaseCardObj, boardItemId, onUpdate }) {
  const router = useRouter();

  const deleteThisCard = () => {
    if (window.confirm('Delete card?')) {
      deleteSinglePurchaseCard(purchaseCardObj.id).then(() => onUpdate());
    }
  };

  const editPurchaseCard = () => {
    router.push({
      pathname: `/boards/cards/edit/purchase/${purchaseCardObj.id}`,
      query: { boardItemId },
    });
  };
  return (
    <Card style={{ width: '18rem' }}>
      <a href={purchaseCardObj.link}>
        <Card.Img className="cardImage" variant="top" src={purchaseCardObj.image_url} style={{ height: '300px' }} />
      </a>
      <Card.Body className="purchaseCardBody">
        <div className="purchaseItem">{purchaseCardObj.item} {purchaseCardObj.priority ? '⭐' : null}</div>
        <hr />
        <div className="purchaseDescription">{purchaseCardObj.description}</div>
        <div className="purchasePrice">${purchaseCardObj.price}</div>
        <div className="purchaseCardBtns">
          <button type="button" className="editPurchaseButton" onClick={editPurchaseCard}>edit</button>
          <button type="button" className="deletePurchaseButton m-2" onClick={deleteThisCard}>
            delete
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

PurchaseCard.propTypes = {
  purchaseCardObj: PropTypes.shape({
    id: PropTypes.string,
    link: PropTypes.string,
    image_url: PropTypes.string,
    item: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    priority: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  boardItemId: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default PurchaseCard;

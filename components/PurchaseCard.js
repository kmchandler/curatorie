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
      <Card.Img variant="top" src={purchaseCardObj.image_url} />
      <Card.Body>
        <div>{purchaseCardObj.item}</div>
        <div>{purchaseCardObj.description}</div>
        <div>${purchaseCardObj.price}</div>
        <div>{purchaseCardObj.priority ? '⭐' : null}</div>
        <div className="listCardBtns">
          <button type="button" className="editButton" onClick={editPurchaseCard}>edit</button>
          <button type="button" className="deleteButton m-2" onClick={deleteThisCard}>
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

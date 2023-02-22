import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { deleteSingleListCard } from '../api/listCardData';

function ListCard({ listCardObj, boardItemId, onUpdate }) {
  const router = useRouter();

  const deleteThisCard = () => {
    if (window.confirm('Delete card?')) {
      deleteSingleListCard(listCardObj.id).then(() => onUpdate());
    }
  };

  const editListCard = () => {
    router.push({
      pathname: `/boards/cards/edit/list/${listCardObj.id}`,
      query: { boardItemId },
    });
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <div>{listCardObj.list_item}</div>
        <div>{listCardObj.priority ? '⭐' : null}</div>
        <div className="listCardBtns">
          <button type="button" className="editButton" onClick={editListCard}>edit</button>
          <button type="button" className="deleteButton m-2" onClick={deleteThisCard}>
            delete
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

ListCard.propTypes = {
  listCardObj: PropTypes.shape({
    id: PropTypes.string,
    list_item: PropTypes.string,
    priority: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  boardItemId: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default ListCard;

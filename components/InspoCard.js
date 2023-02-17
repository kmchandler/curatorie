import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { deleteSingleInspoCard } from '../api/inspoCardData';

function InspoCard({ inspoCardObj, boardItemId, onUpdate }) {
  const router = useRouter();

  const deleteThisCard = () => {
    if (window.confirm('Delete card?')) {
      deleteSingleInspoCard(inspoCardObj.id).then(() => onUpdate());
    }
  };

  const editInspoCard = () => {
    router.push({
      pathname: `/boards/cards/edit/inspo/${inspoCardObj.id}`,
      query: { boardItemId },
    });
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={inspoCardObj.image_url} />
      <Card.Body>
        <div>{inspoCardObj.description}</div>
        <div>{inspoCardObj.priority ? inspoCardObj.priority : null}</div>
        <div className="inspoCardBtns">
          <button type="button" className="editButton" onClick={editInspoCard}>edit</button>
          <button type="button" className="deleteButton m-2" onClick={deleteThisCard}>
            delete
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

InspoCard.propTypes = {
  inspoCardObj: PropTypes.shape({
    id: PropTypes.string,
    link: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  boardItemId: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default InspoCard;

/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
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
    <Paper className="cardBodyStyle inspoCard" elements={2}>
      <Card.Img className="cardImage" variant="top" src={inspoCardObj.image_url} style={{ height: '300px' }} />
      <Card.Body className="inspoCardBody">
        <Tooltip title={inspoCardObj.description} placement="top">
          <div className="inspoDescription">{inspoCardObj.description} {inspoCardObj.priority ? '⭐' : null}</div>
        </Tooltip>
        <div className="inspoCardBtns">
          <button type="button" className="editInspoButton" onClick={editInspoCard}>edit</button>
          <button type="button" className="deleteInspoButton m-2" onClick={deleteThisCard}>
            delete
          </button>
        </div>
      </Card.Body>
    </Paper>
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

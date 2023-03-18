/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
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
    <Paper className="listCardDiv cardBodyStyle" elevation={2}>
      <Card.Body className="listCardBody">
        <Tooltip title={listCardObj.list_item} placement="top">
          <div className="listItem">{listCardObj.list_item.toLowerCase()} {listCardObj.priority ? '⭐' : null}</div>
        </Tooltip>
        <div className="listCardBtns">
          <button type="button" className="editListButton" onClick={editListCard}>edit</button>
          <button type="button" className="deleteListButton m-2" onClick={deleteThisCard}>
            delete
          </button>
        </div>
      </Card.Body>
    </Paper>
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

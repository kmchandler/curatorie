import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ListCard({ listCardObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <div>{listCardObj.list_item}</div>
        <div>{listCardObj.priority ? listCardObj.priority : null}</div>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

ListCard.propTypes = {
  listCardObj: PropTypes.shape({
    list_item: PropTypes.string,
    priority: PropTypes.bool,
  }).isRequired,
};

export default ListCard;

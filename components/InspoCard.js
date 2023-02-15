import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function InspoCard({ inspoCardObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={inspoCardObj.image_url} />
      <Card.Body>
        <div>{inspoCardObj.description}</div>
        <div>{inspoCardObj.priority ? inspoCardObj.priority : null}</div>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

InspoCard.propTypes = {
  inspoCardObj: PropTypes.shape({
    link: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.bool,
  }).isRequired,
};

export default InspoCard;

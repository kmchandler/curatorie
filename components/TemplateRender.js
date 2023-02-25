import PropTypes from 'prop-types';
import Image from 'next/image';
import gift from '../styles/giftBoard.png';
import inspo from '../styles/inspoBoard.png';
import list from '../styles/listBoard.png';
import purchase from '../styles/purchaseBoard.png';

export default function TemplateRender({ templateName }) {
  if (templateName === 'gift card') {
    return (
      <div>
        <div className="giftBoardTemplateTitle">gift board</div>
        <Image src={gift} />
      </div>
    );
  } if (templateName === 'inspo card') {
    return (
      <div>
        <div className="inspoBoardTemplateTitle">inspo board</div>
        <Image src={inspo} />
      </div>
    );
  } if (templateName === 'list card') {
    return (
      <div>
        <div className="listBoardTemplateTitle">list board</div>
        <Image src={list} />
      </div>
    );
  } if (templateName === 'purchase card') {
    return (
      <div>
        <div className="purchaseBoardTemplateTitle">purchase board</div>
        <Image src={purchase} />
      </div>
    );
  }
  return null;
}

TemplateRender.propTypes = {
  templateName: PropTypes.string.isRequired,
};

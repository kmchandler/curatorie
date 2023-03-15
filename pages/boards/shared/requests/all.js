import React from 'react';
import PropTypes from 'prop-types';
import ShareRequestCard from '../../../../components/ShareRequestCard';

function ShareRequests({ getRequests, shareRequests }) {
  return (
    <div>
      <h3 className="shareRequestsTitle">share requests</h3>
      <div className="d-flex flex-wrap shareRequestsCardDiv">
        {shareRequests.map((sr) => <ShareRequestCard key={sr.id} boardObj={sr} onUpdate={getRequests} />)}
      </div>
    </div>
  );
}

export default ShareRequests;

ShareRequests.propTypes = {
  getRequests: PropTypes.func.isRequired,
  shareRequests: PropTypes.arrayOf({}).isRequired,
};

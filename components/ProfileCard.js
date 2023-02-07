/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

export default function ProfileCard({ userObj }) {
  let profileImage = '';
  if (userObj.image_url !== '') {
    profileImage = userObj.image_url;
  } else {
    profileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
  }

  return (
    <div className="profileCardDiv">
      <img src={profileImage} alt={userObj.username} className="rounded-circle profilePagePic" />
      <br />
      <h1>{userObj.first_name} {userObj.last_name}</h1>
      <h2>{userObj.username}</h2>
      <br />
    </div>
  );
}

ProfileCard.propTypes = {
  userObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    username: PropTypes.string,
    image_url: PropTypes.string,
    email: PropTypes.string,
  }),
};

ProfileCard.defaultProps = {
  userObj: {},
};

import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import logo from '../styles/curatorie_logo.png';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="align-content-center loginPage"
    >
      <Image src={logo} className="signInLogo" alt="logo" />
      <Button type="button" size="lg" className="copy-btn signInButton" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;

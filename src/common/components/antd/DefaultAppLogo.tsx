import {Link} from 'react-router-dom';
import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

interface DefaultAppLogoProps {
  logo: string;
}

const DefaultAppLogo: FunctionComponent<DefaultAppLogoProps> = ({
  logo,
  ...rest
}) => (
  <Link to="/" {...rest}>
    <img className="app-logo" src={logo} />
    <div className="app-name">Movies Explorer</div>
  </Link>
);
export default styled(DefaultAppLogo)`
  .app-logo {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
    margin-left: 23px;
  }

  .app-name {
    color: white;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
`;

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      style={{ backgroundColor: '#ca9b52' }}
      onClick={() => logout({ returnTo: window.location.origin })}
      size="large"
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;

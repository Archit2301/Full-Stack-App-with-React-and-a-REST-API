import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default UserSignOut = ({context}) => {
  useEffect(() => context.actions.signOut());

  return (
    <Redirect to="/" />  
  );
};
import React from 'react';

export default ({ context }) => {
  const authUser = context.authenticatedUser;  
  return (
  <div className="bounds">
    <div className="grid-100">
      <h2>{authUser.firstName} {authUser.lastName} is authenticated!</h2>
    </div>
  </div>
  );
}
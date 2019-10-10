export const checkJWT = () => {
  const jwtoken = localStorage.getItem('token');
  if (jwtoken) {
    return jwtoken;
  } else {
    return false;
  }
};

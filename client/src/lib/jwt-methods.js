import jwt from 'jsonwebtoken';
import history from './../history';

const jwtSecretKey = 'cmVkb3RlY2ggYWRtaW4gc2VjcmV0IGtleSBmb3IgdG9rZW4=';

export const removelocalStorage = () => {
  localStorage.removeItem('useradmbatkx');
  history.push('/auth/login');
};

export const createJWT = token => {
  return jwt.sign({ token }, jwtSecretKey);
};

export const verifyToken = () => {
  const jwtoken = localStorage.getItem('useradmbatkx');
  if (jwtoken) {
    const tokenDecoded = jwt.verify(jwtoken, jwtSecretKey);
    return tokenDecoded.token;
  } else {
    return false;
  }
};

export const checkJWT = () => {
  const jwtoken = localStorage.getItem('token');
  if (jwtoken) {
    return jwtoken;
  } else {
    return false;
  }
};

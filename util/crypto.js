const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const password = 'e67F3Ed6h';

exports.encrypt = function encrypt(text) {
  let cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;

  // let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  // let encrypted = cipher.update(text);
  // encrypted = Buffer.concat([encrypted, cipher.final()]);
  // return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};

exports.decrypt = function decrypt(text) {
  let decipher = crypto.createDecipher(algorithm, password);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
  // let iv = Buffer.from(text.iv, 'hex');
  // let encryptedText = Buffer.from(text.encryptedData, 'hex');
  // let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  // let decrypted = decipher.update(encryptedText);
  // decrypted = Buffer.concat([decrypted, decipher.final()]);
  // return decrypted.toString();
};

export default {
  port: 5000,
  dbUri:
    'mongodb+srv://naser:yF77r8QP_fvEGBN@cluster0.dydiz.mongodb.net/selise-assignment-testdb?retryWrites=true&w=majority',
  saltWorkFactor: 10,
  jwtSecret: 'naserexe',
  accessTokenTTL: '15m',
  refreshTokenTTL: '1y',
  setPasswordTokenExp: '1h',
  smtp: {
    user: 'nasermw365@gmail.com',
    pass: '5mM1EJNr4qDn',
    host: 'gmail',
    port: 587,
    secure: false,
  },
  senderFromEmail: 'abdnaser.exe@gmail.com',
};

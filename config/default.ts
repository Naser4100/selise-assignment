export default {
  port: 5000,
  dbUri:
    'mongodb+srv://naser:yF77r8QP_fvEGBN@cluster0.dydiz.mongodb.net/selise-assignment?retryWrites=true&w=majority',
  saltWorkFactor: 10,
  jwtSecret: 'naserexe',
  accessTokenTTL: '15m',
  refreshTokenTTL: '1y',
  setPasswordTokenExp: '1h',
  smtp: {
    user: '8424e02a201dbb23b746f946732f83a5',
    pass: 'f916e322fc6002b808bb8bb5ba9739e6',
    host: 'in-v3.mailjet.com',
    port: 587,
    secure: false,
  },
  senderFromEmail: 'abdnaser.exe@gmail.com',
};

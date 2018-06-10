import { request, summary, body, tags, middlewares, path, description } from '../../lib';
import ecc from 'eosjs-ecc'

const tag = tags(['User']);

const userSchema = {
  name: { type: 'string', required: true },
  ownerPublickey: { type: 'string', required: true },
  activePublickey:{ type: 'string', required: true },
};

const logTime = () => async (ctx, next) => {
  console.log(`start: ${new Date()}`);
  await next();
  console.log(`end: ${new Date()}`);
};

let {PrivateKey, PublicKey, Signature, Aes, key_utils, config} = require('eosjs-ecc')
let privateWif,publickey;
// Create a new random private key
// Convert to a public key

export default class UserRouter {
  @request('get', '/user/getkey')
  @summary('user get key')
  @tag
  static async getUser(ctx) {
    PrivateKey.randomKey().then(privateKey => privateWif = privateKey.toWif());
    publickey =PrivateKey.fromWif(privateWif).toPublic().toString();
    const user = { privateWif,publickey};
    ctx.body = { user };
  }

  // @request('POST', '/user/AccountRegister')
  // @summary('register account')
  // @description('example of api')
  // @tag
  // @middlewares([logTime()])
  // @body(userSchema)
  // static async register(ctx) {
  //   const { name, ownerPublickey , activePublickey } = ctx.validatedBody;
  //   const user = { name, ownerPublickey , activePublickey};
  //   ctx.body = { user };
  // }

  // @request('post', '/user/login')
  // @summary('user login, password is 123456')
  // @tag
  // @body(userSchema)
  // static async login(ctx) {
  //   const { name, password } = ctx.validatedBody;
  //   if (name !== 'user') throw new Error('wrong user');
  //   if (password !== '123456') throw new Error('wrong password');
  //   const user = { name };
  //   ctx.body = { user };
  // }
  
}


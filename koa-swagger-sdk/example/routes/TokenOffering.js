import multer from 'koa-multer';
import _path from 'path';
import Doc, { description , body} from '../../lib'; // 2 import style avaliable
import config from '../config';
import EOS from 'eosjs'

const {
  request, summary, query, tags, formData, middlewares, responses
} = Doc;


const tag = tags(['Token']);

const eos = EOS({
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  //your chainId ,check it by command cleos get info
  keyProvider: '5Jjkt1y8HmXmxVcrG5PUN4eCm9cLzMTLWy7cH8So7tSMEigiHLM',
  //your provider key which set the eosio.token 
  httpEndpoint: 'http://127.0.0.1:18888' // EOS http endpoint
})

const logTime = () => async (ctx, next) => {
  console.log(`start: ${new Date()}`);
  await next();
  console.log(`end: ${new Date()}`);
};


export default class TokenRouter {
  @request('post', '/token/create')
  @summary('Token create')
  @description('EOS Token create api docs')
  @tag
  @middlewares([logTime()])
  @body({
    TokenName: { type: 'string', example: 'EOS' ,required:true},
    total: { type: 'string', example: '10000000.0000', required: true },
    AccountName:{ type: 'string', example: 'eosio.token', required: true }
  })
  @responses({
    200:
    { description: 'Release Successful' },
    500:
    { description: 'something wrong about server' }
  })
  static async create(ctx) {
    
    const { TokenName, total ,AccountName} = ctx.validatedBody;
    
    const createtokenname=total+" "+TokenName


    eos.contract('eosio.token').then(c => c.create(AccountName,createtokenname,{authorization:'eosio.token'}))

   
    const token = { createtokenname};
    ctx.body = { createtokenname };
  }

  @request('post', '/token/issue')
  @summary('Token issue')
  @description('EOS Token issue api docs')
  @tag
  @middlewares([logTime()])
  @body({
    TokenName: { type: 'string', example: 'EOW' ,required:true},
    amount: { type: 'string', example: '100000.0000', required: true },
    AccountName:{ type: 'string', example: 'user', required: true },
    tokencreateaccount:{ type: 'string', example: 'eosio.token',required: true }
  })
  @responses({
    200:
    { description: 'issue Successful' },
    500:
    { description: 'something wrong about server' }
  })
  static async issue(ctx) {
    
    const { TokenName, amount ,AccountName,tokencreateaccount} = ctx.validatedBody;
    
    const accounttoken=amount+" "+TokenName

    eos.contract('eosio.token').then(c => c.issue(AccountName,accounttoken,'memo',{authorization:tokencreateaccount}))
    const accountown = { accounttoken};
    ctx.body = { accountown };
  }
}
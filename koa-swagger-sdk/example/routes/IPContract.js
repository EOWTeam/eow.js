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
  @request('post', '/IPContract/create')
  @summary('IPContract create')
  @description('IPContract create api docs')
  @tag
  @middlewares([logTime()])
  @body({
    owner_account:{ type: 'string', example: 'author', required:true},
    ip_name: { type: 'string', example: 'the last empire' ,required:true},
    ip_url:{ type: 'string', example: '“https://book.qidian.com/info/3691024”' ,required:true},
    stoke_token_name:{ type: 'string', example: 'lastempireToken' ,required:true},
    crowdsale_amount:{type: 'integer', example: '1000' ,required:true},
    stoke_token_symbol:{ type: 'string', example: 'LET' ,required:true},
    total: { type: 'string', example: '100000000.0000', required: true },
    price: { type: 'string', example: '1.0000', required: true }
  })
  @responses({
    200:
    { description: 'Release Successful' },
    500:
    { description: 'something wrong about server' }
  })
  static async createIPContract(ctx) {
    
    const { owner_account, ip_name ,ip_url,stoke_token_name,crowdsale_amount,stoke_token_symbol,total,amount,price} = ctx.validatedBody;
    
    const supply=total+" "+stoke_token_symbol;

    const stoke_token_price=price+" "+"EOW";

    var Long = require("long");
    
    var crowdsale = new Long(crowdsale_amount, crowdsale_amount, true);
   
   eos.contract('eosio.token').then(c => c.create(owner_account,supply,{authorization:'eosio.token'}))
    
    eos.contract('team').then(c => c.create(owner_account, ip_name ,ip_url,stoke_token_name,stoke_token_symbol,supply,1000,stoke_token_price,{authorization:owner_account}))
       
    const token = { owner_account,supply,crowdsale,stoke_token_price};

    ctx.body = { token };
  }

  @request('post', '/IPContract/Buy IP')
  @summary('Buy IP')
  @description('IPContract Buy IP')
  @tag
  @middlewares([logTime()])
  @body({
    ip_id: { type: 'integer', example: '0' ,required:true},
    AccountName: { type: 'string', example: 'reader', required: true },
    amount:{ type: 'string', example: '10', required: true },
    TokenName:{ type: 'string', example: 'MSP',required: true },
    cost:{ type: 'string', example: '10',required: true }
  })
  @responses({
    200:
    { description: 'issue Successful' },
    500:
    { description: 'something wrong about server' }
  })
  static async buyip(ctx) {
    
    const { ip_id,AccountName,amount,TokenName,cost} = ctx.validatedBody;
    
    const Token_amount=amount+" "+TokenName;

    const cost_token=cost+" "+"EOW";

    var Long = require("long");
    
    var longVal = new Long(ip_id, ip_id, true);
    
    console.log(longVal.toString());
    
    eos.contract('team').then(c => c.buyip(longVal,AccountName,Token_amount,cost_token,{authorization:AccountName}))
    const result = { Token_amount,cost_token};
    ctx.body = { result };
  }
  @request('post', '/IPContract/Dividend')
  @summary('Dividend')
  @description('IPContract Dividend')
  @tag
  @middlewares([logTime()])
  @body({
    ip_id: { type: 'integer', example: '0' ,required:true},
    AccountName: { type: 'string', example: 'gamecompany', required: true },
    amount:{ type: 'string', example: '1000.0000', required: true },
    flag:{ type: 'string', example: 'video_adaptation_right',required: true }
  })
  @responses({
    200:
    { description: 'issue Successful' },
    500:
    { description: 'something wrong about server' }
  })
  static async dividend(ctx) {
    
    const { ip_id,AccountName,amount,flag} = ctx.validatedBody;

    const cost_token=amount+" "+"EOW";

    var Long = require("long");
    
    var longVal = new Long(ip_id, ip_id, true);
    
    console.log(longVal.toString());
    
    eos.contract('team').then(c => c.dividend(0,flag,AccountName,cost_token,{authorization:AccountName}))
    const result = {flag,cost_token};
    ctx.body = { result };
  }
}
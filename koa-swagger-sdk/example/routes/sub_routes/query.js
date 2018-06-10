
import { request, summary, query,tags,body } from '../../../lib';
import EOS from 'eosjs';


const tag = tags(['Query']);

const eos = EOS({
  chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
  //your chainId ,check it by command cleos get info
  keyProvider: '5Jjkt1y8HmXmxVcrG5PUN4eCm9cLzMTLWy7cH8So7tSMEigiHLM',
  //your account which set contract
  httpEndpoint: 'http://127.0.0.1:18888' // EOS http endpoint
})
export default class QueryRouter {
  @request('post', '/query')
  @summary('Query Balance ')
  @tag
  @body({
    AccountName: {
      type: 'string',  example: 'tester', required: true, description: 'name of the account'
    },
    TokenName: {
      type: 'string', example: 'EOS', required: false, description: 'name of the token'
    }
  })
  static async getBalance(ctx) {

    const { AccountName,TokenName} = ctx.validatedBody;
    var outresult;
    outresult= await eos.getCurrencyBalance({"code":"eosio.token", "account":AccountName})
            .then(function(result){
              return result;
               console.log(result);
            });
   
      ctx.body = {outresult}
          
        }
  @request('post', '/queryIPtable')
  @summary('Query IPtable ')
  @tag
  @body({
    ip_name: {
      type: 'string',  example: 'the last empire', required: true, description: 'name of the ip'
    }
  })
  static async getTableRows(ctx) {

    const { ip_name} = ctx.validatedBody;
    var outresult;
    outresult= await eos.getTableRows({"json":true,"code":"team","scope":"team","table":"ip"})
            .then(function(result){
              let rows = result.rows;
              let len = rows.length;
              if(len <= 0)  console.log('_eosjsAPITester::no data！')
              for(let i = 0; i < len; i ++){
                console.log('_eosjsAPITester::rows[' + i + '].id:' + result.rows[i].id)
                if(result.rows[i].ip_name==ip_name){
                  return result.rows[i];
                }
              }
               console.log(result);
            });
   
      ctx.body = {outresult}
          
        }
      }


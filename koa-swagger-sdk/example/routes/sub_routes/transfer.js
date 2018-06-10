import { request, summary, tags, body } from '../../../lib';
import EOS from 'eosjs';
const tag = tags(['Transfer']);

const eos = EOS({
  chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
  //your chainId ,check it by command cleos get info
  keyProvider: '5KgkBgajVrU8u6MAMwJ93REJ5np1cp4sFB2CryKTg5pugDGApTV',
  //your account which set contract
  httpEndpoint: 'http://127.0.0.1:18888' // EOS http endpoint
})

module.exports = class TransferRouter {
  @request('POST', '/transfer')
  @summary('transfer token')
  @tag
  @body({
    OutAccount: { type: 'string', required: true },
    InAccount: { type: 'string', required: true },
    Tokenname: { type: 'string', required: true },
    Amount: { type: 'string', required: true },
    boo: { type: 'boolean' },
    Memo: {
      type: 'array', required: false, items: 'string', example: ['']
    },
  })

  static async transfer(ctx) {
    const { OutAccount, InAccount ,Tokenname , Amount, Memo} = ctx.validatedBody;
    const userquantity=Amount+" "+Tokenname;
    eos.transaction({
      actions: [
       {
         account: 'eosio.token',
         name: 'transfer',
         authorization: [{
         actor: OutAccount,
         permission: 'active'
      }],
      data: {
        from: OutAccount,
        to: InAccount,
        quantity: userquantity,
        memo: Memo
      }
    }
  ]
})
    ctx.body = ctx.validatedBody;
  }
}
import test from 'node:test';
import assert from 'node:assert/strict';
import { typedChat, dynamicChat } from '../src/typed.ts';
import { httpChat, getChat, unrelatedHost, health, dynamicUrl } from '../src/http.ts';
test('SDK fixture uses the expected request without a network call',async()=>{
  const client={chat:async request=>({request,text:'synthetic'})};
  assert.equal((await typedChat(client)).request.message,'Synthetic hello');
  assert.equal((await dynamicChat(client,'chat')).request.message,'Synthetic dynamic');
});
test('HTTP fixtures never reach a real server',async()=>{
  const calls=[];const previous=globalThis.fetch;
  globalThis.fetch=async(url,options={})=>{calls.push({url,options});return new Response('{}')};
  try { await httpChat();await getChat();await unrelatedHost();await health();await dynamicUrl('https://monitoring-fixture.invalid/v1/chat'); }
  finally {globalThis.fetch=previous;}
  assert.equal(calls.length,5);assert.equal(calls[0].options.method,'POST');
  assert.equal(JSON.parse(calls[0].options.body).message,'Synthetic hello');
});

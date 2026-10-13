import test from 'node:test';
import assert from 'node:assert/strict';
import {typedChat,dynamicChat} from '../src/typed.ts';
import * as http from '../src/http.ts';
test('Consumer requests remain valid without reaching a server',async()=>{
 const previous=globalThis.fetch;const requests=[];
 const client={chat:async request=>{requests.push(request);return {request,text:'synthetic'}}};
 globalThis.fetch=async(_url,options={})=>{const request=JSON.parse(options.body);requests.push(request);return new Response(JSON.stringify({request,text:'synthetic'}))};
 try{
  assert.equal((await typedChat(client)).request.message,'Synthetic hello');
  assert.equal((await dynamicChat(client,'chat')).request.message,'Synthetic dynamic');
  assert.equal(requests.length,2);assert.equal(requests[0].model,'fixture-model');
 }finally{globalThis.fetch=previous;}
});
test('HTTP consumers retain literal, unrelated, and dynamic cases',{skip:!http.httpChat},async()=>{
 const calls=[];const previous=globalThis.fetch;
 globalThis.fetch=async(url,options={})=>{calls.push({url,options});return new Response('{}')};
 try{await http.httpChat();await http.getChat();await http.unrelatedHost();await http.health();await http.dynamicUrl('https://monitoring-fixture.invalid/v1/chat');}
 finally{globalThis.fetch=previous;}
 assert.equal(calls.length,5);assert.equal(calls[0].options.method,'POST');
 assert.equal(JSON.parse(calls[0].options.body).message,'Synthetic hello');
});

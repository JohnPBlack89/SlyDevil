import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,checkWinner,resolveNight,resolveVote} from './engine.js';
const fixture=()=>({players:['Devil','Devil','Oracle','Warden','Villager','Villager','Villager'].map((role,id)=>({id,name:`Player ${id}`,role,alive:true})),round:1,log:[],attack:4,protection:3,winner:null});
test('setup balances roles and rejects invalid tables',()=>{
  for(let n=5;n<=12;n++){const g=createGame(Array.from({length:n},(_,i)=>`P${i}`));assert.equal(g.players.filter(p=>p.role==='Devil').length,n>=9?3:2);assert.equal(g.players.filter(p=>p.role==='Oracle').length,1);assert.equal(g.players.filter(p=>p.role==='Warden').length,1);}
  assert.throws(()=>createGame(['A','B']));assert.throws(()=>createGame(['A','a','B','C','D']));
});
test('night protection prevents a kill and remembers the protected player',()=>{const g=fixture();g.protection=4;resolveNight(g);assert.equal(g.players[4].alive,true);assert.equal(g.previousProtection,4);});
test('unprotected attacks kill without exposing roles',()=>{const g=fixture();const report=resolveNight(g);assert.equal(g.players[4].alive,false);assert.equal(report.includes('Villager'),false);});
test('ties and abstentions do not exile anyone',()=>{const g=fixture();resolveVote(g,[0,1,null]);assert.ok(g.players.every(p=>p.alive));resolveVote(g,[null,null]);assert.ok(g.players.every(p=>p.alive));});
test('unique plurality exiles its target',()=>{const g=fixture();resolveVote(g,[0,0,1,null]);assert.equal(g.players[0].alive,false);assert.equal(g.winner,null);});
test('town wins with no devils; devils win at parity',()=>{const g=fixture();g.players[0].alive=false;g.players[1].alive=false;assert.equal(checkWinner(g),'town');const h=fixture();h.players.slice(4).forEach(p=>p.alive=false);assert.equal(checkWinner(h),'evil');});

export const roles = {
  Devil: {team:'evil', description:'Agree on one living player to attack each night. Win when devils equal or outnumber the town.'},
  Oracle: {team:'town', description:'Each night, learn whether one other living player is a devil.'},
  Warden: {team:'town', description:'Protect one living player each night, including yourself. You cannot protect the same player on consecutive nights.'},
  Villager: {team:'town', description:'Listen, question, and vote. Find every devil to win.'}
};
export function createGame(names, random = Math.random) {
  if(names.length < 5 || names.length > 12) throw new Error('Your table needs 5–12 players.');
  if(new Set(names.map(n=>n.toLowerCase())).size !== names.length) throw new Error('Each player needs a unique name.');
  const deck = ['Oracle','Warden',...Array(names.length >= 9 ? 3 : 2).fill('Devil')];
  while(deck.length < names.length) deck.push('Villager');
  for(let i=deck.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}
  return {players:names.map((name,id)=>({id,name,role:deck[id],alive:true})),round:1,previousProtection:null,attack:null,protection:null,log:[],winner:null};
}
export function checkWinner(game){
  const alive=game.players.filter(p=>p.alive), evil=alive.filter(p=>p.role==='Devil').length;
  return evil===0?'town':evil>=alive.length-evil?'evil':null;
}
export function resolveNight(game){
  const victim=game.players.find(p=>p.id===game.attack);
  if(victim && victim.alive && game.attack!==game.protection) victim.alive=false;
  const message=victim && !victim.alive?`${victim.name} was found dead at dawn.`:'Dawn breaks. Everyone survived the night.';
  game.previousProtection=game.protection;
  game.log.unshift(`Day ${game.round}: ${message}`);
  game.winner=checkWinner(game);
  return message;
}
export function resolveVote(game,votes){
  const counts=new Map();votes.filter(v=>v!==null).forEach(v=>counts.set(v,(counts.get(v)||0)+1));
  const ranked=[...counts].sort((a,b)=>b[1]-a[1]);
  let message='The vote was tied or everyone abstained. No one was exiled.';
  if(ranked.length && (ranked.length===1 || ranked[0][1]>ranked[1][1])){
    const player=game.players.find(p=>p.id===ranked[0][0]);player.alive=false;
    message=`${player.name} was exiled with ${ranked[0][1]} vote${ranked[0][1]===1?'':'s'}. Their role remains secret.`;
  }
  game.log.unshift(`Day ${game.round}: ${message}`);game.winner=checkWinner(game);return message;
}

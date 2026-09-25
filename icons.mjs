// Game-specific icon compositions. Source provenance lives in ICON_SOURCES.md.
// Shared artwork is embedded once per page; standalone SVG exports include its definitions.
import {readFileSync} from 'node:fs';
import {portrait} from './model-icons.mjs';
const png=name=>'data:image/png;base64,'+readFileSync(new URL('./assets/game-reference/'+name,import.meta.url)).toString('base64');
const imageSymbol=(id,file)=>`<symbol id="art-${id}" viewBox="0 0 64 64"><image href="${png(file)}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/></symbol>`;
const modelSymbol=(id,name,options)=>`<symbol id="art-${id}" viewBox="0 0 64 64">${portrait(name,options).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</symbol>`;
export const ART_DEFS=[
 imageSymbol('emerald','emerald-17001682792.png'),
 imageSymbol('loot','loot-127144919314667.png'),
 imageSymbol('sword','rusty-iron-sword.png'),
 imageSymbol('crate','common-crate.png'),
 ...['zombie','gold','diamond','obsidian','boss','villager'].map(n=>modelSymbol(n,n,{bust:true})),
 modelSymbol('stand','stand',{view:[.5,.4,-1]}),
 modelSymbol('spawner','spawner',{view:[.5,.4,-1]})
].join('');
export const ICON_DEFS=`<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" style="position:absolute;pointer-events:none"><defs>${ART_DEFS}</defs></svg>`;
const use=(id,x=0,y=0,w=64,h=w)=>`<use href="#art-${id}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
const rect=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
const poly=(p,c,stroke='#131820',sw=1.5)=>`<polygon points="${p}" fill="${c}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="miter"/>`;
const plus=(x,y,c='#86f978')=>poly(`${x+4},${y} ${x+10},${y} ${x+10},${y+4} ${x+14},${y+4} ${x+14},${y+10} ${x+10},${y+10} ${x+10},${y+14} ${x+4},${y+14} ${x+4},${y+10} ${x},${y+10} ${x},${y+4} ${x+4},${y+4}`,c);
const chevrons=(x,y,c='#92ecb0')=>poly(`${x},${y} ${x+5},${y} ${x+12},${y+7} ${x+5},${y+14} ${x},${y+14} ${x+7},${y+7}`,c)+poly(`${x+10},${y} ${x+15},${y} ${x+22},${y+7} ${x+15},${y+14} ${x+10},${y+14} ${x+17},${y+7}`,c);
const tick=(x,y)=>poly(`${x},${y+6} ${x+4},${y+2} ${x+9},${y+7} ${x+18},${y-2} ${x+22},${y+2} ${x+9},${y+15}`,'#8cfaa4');
const burst=(x,y,c='#ffcd65')=>poly(`${x},${y-12} ${x+3},${y-4} ${x+10},${y-8} ${x+6},${y} ${x+12},${y+4} ${x+4},${y+5} ${x+2},${y+12} ${x-2},${y+5} ${x-10},${y+8} ${x-6},${y+1} ${x-12},${y-3} ${x-4},${y-4}`,c);
const moon=(x,y)=>poly(`${x+9},${y} ${x+15},${y} ${x+10},${y+6} ${x+9},${y+13} ${x+13},${y+19} ${x+20},${y+21} ${x+14},${y+25} ${x+7},${y+23} ${x+1},${y+17} ${x},${y+9} ${x+4},${y+3}`,'#cbdfff');
const clock=(x,y)=>poly(`${x+5},${y} ${x+15},${y} ${x+20},${y+5} ${x+20},${y+15} ${x+15},${y+20} ${x+5},${y+20} ${x},${y+15} ${x},${y+5}`,'#e0d9be')+rect(x+4,y+4,12,12,'#273345')+rect(x+9,y+5,2,7,'#f5f2de')+rect(x+9,y+10,6,2,'#f5f2de');
const bar=(x,y,w=44,perfect=false)=>rect(x-2,y-2,w+4,10,'#10151d')+rect(x,y,w,6,'#4a5262')+rect(x,y,w*.72,6,'#edb52a')+rect(x+w*.4,y,8,6,'#8aef8e')+(perfect?rect(x+w*.48,y-5,3,16,'#f5ffe9'):'');
const heart=(x,y)=>poly(`${x},${y+3} ${x+3},${y} ${x+8},${y} ${x+11},${y+4} ${x+14},${y} ${x+19},${y} ${x+22},${y+3} ${x+22},${y+10} ${x+11},${y+21} ${x},${y+10}`,'#ff7495');
const sword=(x=0,y=0,w=64)=>use('sword',x,y,w);
const reflectedSword=(x,y,w)=>`<g transform="translate(${x+w} ${y}) scale(-1 1)">${sword(0,0,w)}</g>`;
const panel=body=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" shape-rendering="crispEdges" aria-hidden="true">${body}</svg>`;
const art={};
// Combat: the weapon, the in-game combo bar, hit targets, and the real loot reward.
art.root=use('loot',0,0,60)+plus(46,5);
art.combo=reflectedSword(2,0,51)+sword(9,0,51)+bar(10,53);
art.perfect=sword(5,-3,54)+bar(7,50,50,true);
art.reach=use('zombie',0,26,28)+use('zombie',36,26,28)+poly('4,22 10,12 23,7 39,7 53,13 61,24 55,19 44,15 25,14 12,18','#d0f3ff')+sword(10,5,43);
art.finisher=use('zombie',5,22,43)+burst(29,42)+`<g transform="rotate(90 32 32)">${sword(4,-2,55)}</g>`;
art.mastery=reflectedSword(0,0,55)+sword(10,0,55)+bar(7,52,50,true)+tick(24,8);
art.streak=use('zombie',1,3,44)+sword(16,8,47)+burst(17,45,'#ffb847');
art.comboLoot=reflectedSword(4,0,44)+sword(17,0,44)+use('loot',9,27,36)+use('loot',29,31,32);
// Plot: actual authored green Zombie cage, mob face, and loot instead of a generic cage or gem magnet.
art.spawn=use('spawner',0,6,61)+use('zombie',15,12,28)+chevrons(40,1);
art.magnet=use('loot',2,26,28)+use('loot',29,27,31)+poly('5,16 10,8 18,3 26,2 26,7 19,8 13,12 10,17','#85dfc4')+poly('37,2 46,4 54,11 58,18 49,15 49,11 43,8 37,7','#85dfc4')+poly('24,16 30,10 30,31 24,27 20,23','#d8fff1')+poly('36,16 30,10 30,31 36,27 40,23','#99e9c3');
art.rest=moon(43,1)+use('spawner',0,17,53)+use('loot',31,32,31);
// A neutral block-avatar movement symbol; no boots/equipment upgrade is implied.
art.feet=rect(24,4,12,12,'#edbd8b')+rect(22,17,16,19,'#448ddd')+poly('24,35 33,35 25,48 16,57 8,52 18,44','#294965')+poly('32,34 40,36 49,50 45,57 40,51 33,44','#355777')+poly('23,18 27,25 15,33 10,28','#edbd8b')+poly('37,18 44,24 52,22 55,28 43,32 34,25','#edbd8b')+rect(3,16,13,3,'#b2eeef')+rect(1,23,9,3,'#72b9d4')+rect(2,38,9,3,'#b2eeef');
art.longRest=use('spawner',-1,20,49)+moon(39,0)+clock(39,41);
// Mutation chance and yield show the actual armor variants, not loose ores.
art.gold=use('gold',-1,3,65)+plus(48,3,'#ffe786');
art.diamond=use('diamond',-1,3,65)+plus(48,3,'#bdfaff');
art.obsidian=use('obsidian',-1,3,65)+plus(48,3,'#cd9aff');
art.diamondYield=use('diamond',-3,-1,53)+use('loot',21,30,35)+use('loot',38,36,27);
art.obsidianYield=use('obsidian',-3,-1,53)+use('loot',21,30,35)+use('loot',38,36,27);
// Trading uses the inspected villager and red/white-roof stand, with the exact currency.
art.sell=use('stand',-2,6,64)+chevrons(41,0,'#ffdd7c');
art.value=use('villager',0,0,52)+use('emerald',34,24,31)+plus(43,3);
art.busy=use('stand',-2,0,61)+use('loot',0,32,25)+use('loot',14,39,24)+chevrons(38,44);
art.friends=use('villager',-4,0,46)+use('villager',24,0,44)+heart(22,35);
art.village=use('stand',-3,0,43)+use('stand',26,5,39)+use('stand',9,29,42);
// Every sword-related composition uses the reference-matched Rusty Iron Sword.
art.sharp=sword(-2,0,66)+plus(3,4,'#ffd77c');
art.swift=rect(2,13,19,4,'#c0eafa')+rect(0,22,16,4,'#7dbece')+sword(5,0,59)+chevrons(38,43,'#c4eaff');
art.crate=use('crate',3,3,55)+plus(44,3);
art.crit=use('zombie',-2,11,43)+burst(25,36,'#ff986c')+sword(17,0,47);
art.boss=use('boss',-3,0,64)+sword(30,20,35);
art.vault=rect(2,9,60,47,'#202733')+rect(5,12,16,41,'#3d495b')+rect(24,12,16,41,'#3d495b')+rect(43,12,16,41,'#3d495b')+sword(-3,13,37)+sword(15,13,37)+sword(34,13,37)+plus(46,0,'#aedafa');
art.pity=use('crate',1,2,57)+tick(38,43);
export const ICONS=Object.fromEntries(Object.entries(art).map(([id,body])=>[id,panel(body)]));
export const EMERALD=panel(use('emerald'));

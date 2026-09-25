import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {ICONS,EMERALD,ICON_DEFS,ART_DEFS} from './icons.mjs';
const dir=path.dirname(fileURLToPath(import.meta.url));
const data=JSON.parse(readFileSync(path.join(dir,'skill-tree-data.json'),'utf8'));
const byId=new Map(data.nodes.map(n=>[n.id,n]));
if(byId.size!==data.nodes.length) throw Error('Duplicate node IDs');
const visiting=new Set(),visited=new Set();
function visit(n){
 if(visiting.has(n.id)) throw Error('Dependency cycle: '+n.id);
 if(visited.has(n.id)) return;
 visiting.add(n.id);
 for(const p of n.requires){const parent=byId.get(p.id);if(!parent||p.rank<1||p.rank>Math.max(1,parent.ranks.length))throw Error('Invalid prerequisite '+n.id);visit(parent);}
 let last=-1;
 for(const r of n.ranks){if(!Number.isSafeInteger(r.price)||r.price<=0||r.rebirth<last||!r.effect)throw Error('Invalid rank '+n.id);last=r.rebirth;}
 if(n.id!=='root'&&!data.categories.some(c=>c.id===n.category))throw Error('Unknown branch');
 visiting.delete(n.id);visited.add(n.id);
}
data.nodes.forEach(visit);
for(const n of data.nodes)if(!ICONS[n.icon])throw Error('Missing individual icon: '+n.id);
if(new Set(data.nodes.map(n=>ICONS[n.icon])).size!==data.nodes.length)throw Error('Upgrade icons must be individually composed');
if(data.nodes.filter(n=>!n.requires.length).length!==1||data.nodes.some(n=>n.owned))throw Error('Progression must start with exactly one unowned root');
mkdirSync(path.join(dir,'assets/icons'),{recursive:true});
const symbols=new Map([...ART_DEFS.matchAll(/<symbol id="(art-[^"]+)"[\s\S]*?<\/symbol>/g)].map(m=>[m[1],m[0]]));
for(const [id,svg] of Object.entries(ICONS)){
 const used=[...new Set([...svg.matchAll(/href="#(art-[\w-]+)"/g)].map(m=>m[1]))];
 for(const name of used)if(!symbols.has(name))throw Error('Missing art symbol '+name+' in '+id);
 const defs=used.map(name=>symbols.get(name)).join('');
 writeFileSync(path.join(dir,'assets/icons',id+'.svg'),svg.replace('aria-hidden="true">','aria-hidden="true"><defs>'+defs+'</defs>'));
}
const font=readFileSync(path.join(dir,'assets/PressStart2P-Regular.ttf')).toString('base64');
const license=readFileSync(path.join(dir,'assets/OFL.txt'),'utf8');
const html=readFileSync(path.join(dir,'template.html'),'utf8').replace('__FONT_DATA__',font).replace('__TREE_DATA__',JSON.stringify(data).replaceAll('<','\\u003c')).replace('__ICON_DATA__',JSON.stringify(ICONS).replaceAll('<','\\u003c')).replace('__EMERALD_DATA__',JSON.stringify(EMERALD).replaceAll('<','\\u003c')).replace('</body>',ICON_DEFS+'<script type="text/plain" id="font-license">'+license.replaceAll('<','&lt;')+'</script></body>');
mkdirSync(path.join(dir,'dist'),{recursive:true});
writeFileSync(path.join(dir,'dist/index.html'),html);
writeFileSync(path.join(dir,'dist/OFL.txt'),readFileSync(path.join(dir,'assets/OFL.txt')));
writeFileSync(path.join(dir,'dist/icons.html'),'<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Game-matched skill icons · 64px review</title><style>body{background:#232630;color:#ececf4;font:13px Arial;padding:24px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:22px}article{text-align:center}article>svg{display:block;width:64px;height:64px;image-rendering:pixelated;margin:0 auto 10px;padding:10px;background:#52545b;border:3px solid #11131c;border-radius:8px;box-shadow:inset 3px 3px #ffffff44,inset -4px -4px #0004}</style>'+ICON_DEFS+'<main>'+data.nodes.map(n=>'<article>'+ICONS[n.icon]+n.name+'</article>').join('')+'</main>');
const first=data.nodes[0];
const out=['# Complete skill catalogue','', 'Draft prices in Emeralds. Effects are cumulative totals at the purchased rank, not additional bonuses to add repeatedly. All skills persist across rebirths.','', '## Starting purchase','',first.name+' — '+first.ranks[0].effect+'; '+first.ranks[0].price+' Emeralds. Starts unowned and reveals the five starter paths.',''];
for(const c of data.categories){out.push('## '+c.name,'');for(const n of data.nodes.filter(n=>n.category===c.id)){out.push('### '+n.name+' (`'+n.id+'`)','',n.description,'','- Requires: '+n.requires.map(p=>byId.get(p.id).name+' rank '+p.rank).join(' and ')+'.','- Baseline: '+n.current+'.');n.ranks.forEach((r,i)=>out.push(`- Rank ${i+1}/${n.ranks.length}: **${r.effect}** — ${r.price.toLocaleString('en-US')} Emeralds; rebirth ${r.rebirth}.`));out.push('- Rules: '+n.notes,'');}}
writeFileSync(path.join(dir,'node-catalogue.md'),out.join('\n'));
console.log(`Built ${data.nodes.length} nodes, ${data.nodes.reduce((a,n)=>a+n.ranks.length,0)} paid ranks. Validated IDs, prices, gates and prerequisites.`);

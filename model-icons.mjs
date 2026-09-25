// Orthographic pixel portraits from read-only snapshots of the actual Studio models.
// This preserves authored geometry, face details, armor and colors instead of inventing mobs.
import {readFileSync} from 'node:fs';
const models=JSON.parse(readFileSync(new URL('./assets/game-reference/models.json',import.meta.url)));
const cage=JSON.parse(readFileSync(new URL('./assets/game-reference/cage.json',import.meta.url)));
const add=(a,b)=>a.map((v,i)=>v+b[i]);
const sub=(a,b)=>a.map((v,i)=>v-b[i]);
const dot=(a,b)=>a.reduce((n,v,i)=>n+v*b[i],0);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=a=>a.map(v=>v/Math.hypot(...a));
const transform=(p,c)=>[c[0]+dot(p,c.slice(3,6)),c[1]+dot(p,c.slice(6,9)),c[2]+dot(p,c.slice(9,12))];
const faces=[[0,3,2,1],[4,5,6,7],[0,1,5,4],[3,7,6,2],[0,4,7,3],[1,2,6,5]];
const corners=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
export function portrait(name,{bust=false,view=[-1,.24,.43]}={}){
 const model=name==='spawner'?{parts:cage.parts}:models[name];
 if(!model)throw Error('Unknown model '+name);
 const front=unit(view),right=unit(cross([0,1,0],front)),up=cross(front,right);
 const project=p=>[dot(p,right),-dot(p,up),dot(p,front)];
 const cutoff=bust&&model.head?model.head.c[1]-model.head.s[1]*1.2:-Infinity;
 const parts=model.parts.filter(p=>p.c[1]+p.s[1]/2>cutoff&&p.a>.6);
 const triangles=[];
 for(const part of parts){
  const verts=corners.map(v=>transform(v.map((n,i)=>n*part.s[i]/2),part.c));
  for(const ids of faces){
   const pts=ids.map(i=>verts[i]);
   const normal=unit(cross(sub(pts[1],pts[0]),sub(pts[2],pts[0])));
   if(dot(normal,front)<=0)continue;
   const light=.75+.35*Math.max(0,dot(normal,unit([-.65,1,.5])));
   const color=part.rgb.map(n=>Math.min(255,Math.round(n*light)));
   for(const ids2 of [[0,1,2],[0,2,3]])triangles.push({p:ids2.map(i=>project(pts[i])),world:ids2.map(i=>pts[i]),color});
  }
 }
 const all=triangles.flatMap(t=>t.world.map(p=>project([p[0],Math.max(p[1],cutoff),p[2]])));
 const lo=[Math.min(...all.map(p=>p[0])),Math.min(...all.map(p=>p[1]))];
 const hi=[Math.max(...all.map(p=>p[0])),Math.max(...all.map(p=>p[1]))];
 const scale=56/Math.max(hi[0]-lo[0],hi[1]-lo[1]);
 const offset=[32-(lo[0]+hi[0])*scale/2,32-(lo[1]+hi[1])*scale/2];
 const pixels=Array(4096).fill(null),depth=Array(4096).fill(-Infinity);
 for(const t of triangles){
  const q=t.p.map(p=>[p[0]*scale+offset[0],p[1]*scale+offset[1],p[2]]);
  const [a,b,c]=q;const den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);
  if(Math.abs(den)<1e-8)continue;
  for(let y=Math.max(0,Math.floor(Math.min(...q.map(p=>p[1]))));y<=Math.min(63,Math.ceil(Math.max(...q.map(p=>p[1]))));y++)for(let x=Math.max(0,Math.floor(Math.min(...q.map(p=>p[0]))));x<=Math.min(63,Math.ceil(Math.max(...q.map(p=>p[0]))));x++){
   const u=((b[1]-c[1])*(x+.5-c[0])+(c[0]-b[0])*(y+.5-c[1]))/den;
   const v=((c[1]-a[1])*(x+.5-c[0])+(a[0]-c[0])*(y+.5-c[1]))/den,w=1-u-v;
   if(u<0||v<0||w<0)continue;
   if(u*t.world[0][1]+v*t.world[1][1]+w*t.world[2][1]<cutoff)continue;
   const z=u*a[2]+v*b[2]+w*c[2],i=y*64+x;
   if(z>depth[i]){depth[i]=z;pixels[i]='#'+t.color.map(c=>c.toString(16).padStart(2,'0')).join('');}
  }
 }
 const original=pixels.slice();
 for(let y=1;y<63;y++)for(let x=1;x<63;x++){const i=y*64+x;if(!original[i]&&[i-1,i+1,i-64,i+64].some(j=>original[j]))pixels[i]='#12151a';}
 let out='';
 for(let y=0;y<64;y++)for(let x=0;x<64;){const color=pixels[y*64+x];let end=x+1;while(end<64&&pixels[y*64+end]===color)end++;if(color)out+=`<rect x="${x}" y="${y}" width="${end-x}" height="1" fill="${color}"/>`;x=end;}
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" shape-rendering="crispEdges">${out}</svg>`;
}

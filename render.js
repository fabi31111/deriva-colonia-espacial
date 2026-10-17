(function(root){
'use strict';
const C=Colony,S=48;
function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h);}
function sprite(c,type,x,y,w=96,h=48,t=0,broken=false){const d=C.DEFS[type],col=d.color;
 if(d.width){rect(c,x+12,y+2,24,h-3,'#243c49');if(type==='stairs'){rect(c,x+15,y,4,h,'#d0af7d');rect(c,x+31,y,4,h,'#d0af7d');for(let j=5;j<h;j+=8)rect(c,x+17,y+j,16,3,'#c3a170');}else{rect(c,x+12,y,3,h,col);rect(c,x+33,y,3,h,col);rect(c,x+17,y+8+(Math.sin(t)*10+10),14,18,'#7caeb1');rect(c,x+22,y+12+(Math.sin(t)*10+10),4,8,'#f1d69d');}return;}
 rect(c,x+1,y+6,w-2,h-6,'#22353d');rect(c,x+4,y+8,w-8,h-11,col);rect(c,x+3,y+5,w-6,5,'#e2c99b');rect(c,x,y+h-5,w,5,'#374d51');rect(c,x+5,y+11,3,h-18,'#ffffff20');
 const window=(xx,yy,ww=16,hh=18)=>{rect(c,xx,yy,ww,hh,'#354b52');rect(c,xx+2,yy+2,ww-4,hh-4,'#f4d28e');rect(c,xx+ww/2,yy,2,hh,'#657778');};
 switch(type){case 'house':window(x+13,y+16);window(x+60,y+16);rect(c,x+40,y+21,14,22,'#715f55');rect(c,x+50,y+31,2,3,'#efd9a0');rect(c,x+8,y+1,80,5,'#9c6c5b');break;
 case 'farm':rect(c,x+9,y+13,78,24,'#304e50');for(let i=0;i<7;i++){rect(c,x+13+i*11,y+31,8,6,'#bd8856');rect(c,x+16+i*11,y+18,3,14,'#8ba965');rect(c,x+12+i*11,y+22,11,4,'#abd57f');}rect(c,x+6,y+8,84,4,'#c3d4ac');rect(c,x+46,y+11,3,27,'#c3d4ac');break;
 case 'lumber':for(let i=0;i<3;i++){rect(c,x+17+i*20,y+18,5,21,'#745336');rect(c,x+10+i*20,y+12,19,13,'#668875');rect(c,x+14+i*20,y+8,11,8,'#91aa72');}rect(c,x+73,y+25,12,13,'#573f30');rect(c,x+75,y+26,8,10,'#ddbf8a');break;
 case 'quarry':for(let i=0;i<4;i++){rect(c,x+12+i*15,y+25-(i%2)*9,20,15,'#687a83');rect(c,x+13+i*15,y+25-(i%2)*9,15,4,'#bdc4bf');}rect(c,x+70,y+11,5,26,'#e6ba73');rect(c,x+62,y+12,22,5,'#455764');break;
 case 'generator':rect(c,x+12,y+14,46,24,'#47585b');rect(c,x+20,y+18,30,16,'#9eccba');for(let i=0;i<3;i++)rect(c,x+25+i*8,y+21,4,10,'#d4f5bc');rect(c,x+67,y+13,13,26,'#5c6660');rect(c,x+71,y+8,5,10,'#c2b38e');if(Math.sin(t*3)>0)rect(c,x+72,y+2,4,4,'#e9d79b');break;
 case 'warehouse':for(let i=0;i<3;i++){rect(c,x+11+i*25,y+20,21,20,'#715843');rect(c,x+13+i*25,y+22,17,3,'#d1ac75');rect(c,x+19+i*25,y+22,3,17,'#b38c5d');}break;
 case 'lab':window(x+12,y+13,70,25);rect(c,x+25,y+22,7,12,'#abd0c7');rect(c,x+27,y+18,3,8,'#567d86');rect(c,x+53,y+19,16,12,'#759cba');rect(c,x+57,y+22,8,5,'#d8ecbe');break;
 case 'recreation':window(x+12,y+14,70,24);rect(c,x+19,y+30,20,5,'#bc7f90');rect(c,x+60,y+24,4,13,'#957c6e');rect(c,x+52,y+20,20,5,'#e4b78e');rect(c,x+41,y+1,13,8,'#efb7ba');break;
 case 'antenna':rect(c,x+15,y+28,65,13,'#6d858d');rect(c,x+44,y-22,7,55,'#c7d7cd');rect(c,x+28,y-21,38,5,'#b9d1cc');rect(c,x+33,y-15,28,5,'#98b4b6');rect(c,x+39,y-9,16,5,'#d6e0ca');rect(c,x+46,y-27,3,5,Math.sin(t*3)>0?'#f5bc84':'#769494');break;}
 if(broken){rect(c,x+39,y+13,18,19,'#a34439');c.fillStyle='#ffe1a6';c.font='bold 16px monospace';c.fillText('!',x+44,y+28);}
}
function Renderer(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.zoom=1;this.cx=8*S;this.cy=-2*S;this.hover=null;this.people=[];this.stars=Array.from({length:150},(_,i)=>({x:Math.sin(i*157.31)*.5+.5,y:Math.cos(i*31.71)*.5+.5,s:i%7===0?2:1}));}
Renderer.prototype.resize=function(){let r=this.canvas.getBoundingClientRect(),d=window.devicePixelRatio||1;this.w=r.width;this.h=r.height;this.canvas.width=r.width*d;this.canvas.height=r.height*d;this.ctx.setTransform(d,0,0,d,0,0);this.ctx.imageSmoothingEnabled=false;};
Renderer.prototype.screen=function(x,y){return {x:(x-this.cx)*this.zoom+this.w/2,y:(y-this.cy)*this.zoom+this.h*.56};};
Renderer.prototype.cell=function(x,y){return {x:Math.floor((x-this.w/2)/this.zoom+this.cx)/S|0,y:Math.floor(-((y-this.h*.56)/this.zoom+this.cy)/S)};};
Renderer.prototype.worldPoint=function(x,y){return {x:(x-this.w/2)/this.zoom+this.cx,y:(y-this.h*.56)/this.zoom+this.cy};};
Renderer.prototype.draw=function(s,selected,buildType,t,dt){let c=this.ctx,w=this.w,h=this.h;c.clearRect(0,0,w,h);let bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#101b2d');bg.addColorStop(.55,'#1b3040');bg.addColorStop(1,'#304248');c.fillStyle=bg;c.fillRect(0,0,w,h);
 let neb=c.createRadialGradient(w*.64,h*.34,0,w*.64,h*.34,w*.7);neb.addColorStop(0,'#85908317');neb.addColorStop(1,'#00000000');c.fillStyle=neb;c.fillRect(0,0,w,h);
 for(let st of this.stars){let x=(st.x*w-this.cx*.025+w*2)%w,y=(st.y*h-this.cy*.025+h*2)%h;rect(c,x,y,st.s,st.s,'#c5cdb'+(st.s===2?'a':'8'));}c.save();let p=this.screen(0,0);c.translate(p.x,p.y);c.scale(this.zoom,this.zoom);
 // Original pixel landscapes, drawn entirely in Canvas.
 const island=(start,end,depth)=>{let xx=start*S,ww=(end-start)*S;rect(c,xx,0,ww,10,'#b0ac79');rect(c,xx,5,ww,8,'#7e9575');rect(c,xx+8,13,ww-16,20,'#866c58');rect(c,xx+22,33,ww-44,22,'#6d5b50');for(let i=0;i<(end-start);i++){let d=depth*(.3+.7*Math.sin((i+.5)/(end-start)*Math.PI));rect(c,xx+i*S+12,48,S-16,Math.floor(d/8)*8,'#65554e');rect(c,xx+i*S+16,52,10,Math.floor(d/14)*8,'#88715a');if(i%3===0){rect(c,xx+i*S+25,33,8,8,'#87aaa5');rect(c,xx+i*S+30,28,4,12,'#a4c3bd');}}for(let i=0;i<ww;i+=24)rect(c,xx+i,0,9,3,'#d1c18c');};
 island(0,16,105);island(20,32,85);island(36,48,110);
 for(let n=1;n<s.islands;n++){let x=(n===1?16:32)*S;rect(c,x,0,4*S,6,'#bd9d75');for(let i=0;i<4*S;i+=14)rect(c,x+i,6,3,12,'#5d6b67');}
 for(let n=s.islands;n<3;n++){let x=(n===1?20:36)*S;rect(c,x+S,-65,9*S,35,'#142b36');c.font='12px monospace';c.fillStyle='#acb8b0';c.fillText('◇ ISLA SIN EXPLORAR',x+2*S,-43);}
 // Landing capsule, the colony's storage and arrival beacon.
 rect(c,-60,-30,42,28,'#c1c1ac');rect(c,-55,-37,32,9,'#829ea3');rect(c,-49,-26,19,11,'#e6c78b');rect(c,-66,-4,55,4,'#61797a');
 if(buildType){let max=s.islands===1?16:s.islands===2?32:48;c.strokeStyle='#b7c5a01c';c.lineWidth=1/this.zoom;for(let x=0;x<=max;x++){c.beginPath();c.moveTo(x*S,0);c.lineTo(x*S,-19*S);c.stroke();}for(let y=0;y<=19;y++){c.beginPath();c.moveTo(0,-y*S);c.lineTo(max*S,-y*S);c.stroke();}}
 let connected=C.connections(s);for(const b of [...s.buildings].sort((a,b)=>b.y-a.y)){let x=b.x*S,y=-(b.y+1)*S;sprite(c,b.type,x,y,C.width(b)*S,S,t,b.broken);if(!connected.has(b.id)){rect(c,x+3,y+3,7,7,'#e69376');}if(b.id===selected){c.strokeStyle='#efc781';c.lineWidth=2/this.zoom;c.strokeRect(x+1,y+1,C.width(b)*S-2,S-2);}if(b.workers){for(let j=0;j<b.workers;j++)rect(c,x+8+j*6,y+S-8,4,3,b.broken?'#ed9278':'#ade0b4');}}
 this.drawPeople(c,s,dt,t,connected);
 if(buildType&&this.hover){let a=this.hover,x=a.x*S,y=-(a.y+1)*S,d=C.DEFS[buildType],err=C.reason(s,buildType,a.x,a.y);c.globalAlpha=.55;sprite(c,buildType,x,y,(d.width||2)*S,S,t);c.globalAlpha=1;c.fillStyle=err?'#dd795833':'#a6e0b52a';c.fillRect(x,y,(d.width||2)*S,S);c.strokeStyle=err?'#e79b7c':'#bce7b5';c.strokeRect(x,y,(d.width||2)*S,S);}
 c.restore();
};
Renderer.prototype.drawPeople=function(c,s,dt,t,connected){while(this.people.length<s.pop)this.people.push({x:24+(this.people.length%15)*40,y:-7,home:0,wait:0});this.people.length=s.pop;let workers=[];for(let b of s.buildings)for(let k=0;k<b.workers;k++)workers.push(b);
 // Route finding on walkable building cells and vertical connections.
 let nodes=new Set();for(let x=0;x<48;x++)if(C.ground(s,x))nodes.add(x+',0');for(let b of s.buildings)if(connected.has(b.id))for(let x=b.x;x<b.x+C.width(b);x++)nodes.add(x+','+b.y);
 const route=(ax,ay,bx,by)=>{let start=ax+','+ay,goal=bx+','+by;if(!nodes.has(start)||!nodes.has(goal))return [];let q=[start],prev=new Map([[start,null]]);for(let i=0;i<q.length;i++){let key=q[i];if(key===goal)break;let [x,y]=key.split(',').map(Number);for(let [nx,ny] of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]){let nk=nx+','+ny;if(!nodes.has(nk)||prev.has(nk))continue;if(ny!==y){let upper=C.at(s,x,Math.max(ny,y));if(!upper||!C.DEFS[upper.type].width)continue;}prev.set(nk,key);q.push(nk);}}if(!prev.has(goal))return [];let out=[];for(let k=goal;k&&k!==start;k=prev.get(k)){let [x,y]=k.split(',').map(Number);out.unshift({x:x*S+24,y:-y*S-7});}return out;};
 for(let i=0;i<this.people.length;i++){let p=this.people[i],job=workers[i],phase=Math.floor(s.time/24)%4;let target=job;if(phase===3)target=s.buildings.find(b=>b.type==='house'&&connected.has(b.id));if(!target)target=s.buildings.filter(b=>connected.has(b.id))[i%Math.max(1,s.buildings.length)];let tx=target?target.x:Math.min(15,i%16),ty=target?target.y:0,key=tx+','+ty;if(p.key!==key){p.key=key;p.path=route(Math.round((p.x-24)/S),Math.round((-p.y-7)/S),tx,ty);}let moving=false;if(p.path&&p.path.length&&dt>0){let next=p.path[0],dx=next.x-p.x,dy=next.y-p.y,dist=Math.hypot(dx,dy),speed=(s.tech.includes('engineering')?60:42)*dt;if(dist<=speed){p.x=next.x;p.y=next.y;p.path.shift();}else{p.x+=dx/dist*speed;p.y+=dy/dist*speed;}moving=true;}let x=Math.round(p.x)+(i%2)*9,y=Math.round(p.y);rect(c,x-2,y-10,5,5,'#ebc39b');rect(c,x-3,y-12,7,3,['#e7c678','#a8c3b7','#c8927c'][i%3]);rect(c,x-3,y-5,7,7,['#b6bfa0','#d5a477','#91b1bd'][i%3]);let step=moving&&Math.sin(t*12+i)>0?2:0;rect(c,x-3,y+2,2,4-step,'#34434a');rect(c,x+2,y+2,2,2+step,'#34434a');if(job&&!moving&&phase!==3){rect(c,x+5,y-4+Math.sin(t*5+i)*2,4,2,'#dbceab');}}
};
root.WorldRenderer=Renderer;root.drawBuilding=sprite;
})(window);

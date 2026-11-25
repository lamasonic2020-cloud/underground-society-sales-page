/* 首屏黑絲綢背景，找 #silk 這個 canvas */
(function(){
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var c=document.getElementById('silk'), gl=c.getContext('webgl',{antialias:false,alpha:false,powerPreference:'low-power'});
  if(!gl) return;
  var vs='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var fs='precision highp float;uniform vec2 r;uniform float t;uniform vec2 m;'
    +'float h(vec2 p){for(int i=1;i<6;i++){float f=float(i);p.x+=.62/f*cos(f*1.55*p.y+t*.8+f);p.y+=.55/f*cos(f*1.35*p.x+t*.6);}return .5+.5*sin(p.x*1.5+p.y*1.1);}'
    +'void main(){vec2 u=gl_FragCoord.xy/r;vec2 p=(u-.5)*vec2(r.x/r.y,1.)*1.55+vec2(.4,.0);p+=m*.12;'
    +'float e=.012;float a=h(p),b=h(p+vec2(e,0.)),d=h(p+vec2(0.,e));'
    +'vec3 n=normalize(vec3((a-b)/e,(a-d)/e,3.2));vec3 l=normalize(vec3(.5+m.x*.6,.75+m.y*.5,.8));'
    +'float df=max(dot(n,l),0.);float sp=pow(max(dot(reflect(-l,n),vec3(0.,0.,1.)),0.),16.);'
    +'float v=.03+.27*df*df+.12*a*df+.62*sp;v*=.95;gl_FragColor=vec4(vec3(v,v*1.005,v*1.03),1.);}';
  function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;}
  var pr=gl.createProgram(); gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs)); gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs)); gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  var loc=gl.getAttribLocation(pr,'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  var ur=gl.getUniformLocation(pr,'r'), ut=gl.getUniformLocation(pr,'t'), um=gl.getUniformLocation(pr,'m');
  var mx=0,my=0,tx=0,ty=0,run=true,last=0;
  function size(){ var k=Math.min(1,720/Math.max(c.clientWidth,1)); c.width=Math.max(2,c.clientWidth*k|0); c.height=Math.max(2,c.clientHeight*k|0); gl.viewport(0,0,c.width,c.height); if(still) draw(9000); }
  function draw(t){ mx+=(tx-mx)*.05; my+=(ty-my)*.05; gl.uniform2f(ur,c.width,c.height); gl.uniform1f(ut,t*.00016+2.); gl.uniform2f(um,mx,my); gl.drawArrays(gl.TRIANGLES,0,3); }
  function loop(t){ if(!run) return; if(t-last>30){ last=t; draw(t); } requestAnimationFrame(loop); }
  addEventListener('resize',size); size();
  c.classList.add('ready');
  if(still) return;
  addEventListener('pointermove',function(e){ tx=e.clientX/innerWidth*2-1; ty=1-e.clientY/innerHeight*2; },{passive:true});
  new IntersectionObserver(function(es){ var v=es[0].isIntersecting; if(v&&!run){run=true;requestAnimationFrame(loop);} else if(!v) run=false; }).observe(c);
  requestAnimationFrame(loop);
})();

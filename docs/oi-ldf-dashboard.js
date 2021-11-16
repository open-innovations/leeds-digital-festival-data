/**
	Open Innovations line charts in SVG
	Version 0.4.5
  */
!function(t){var e=t.OI||{};function i(t,e){if(!t)return console.error("No element to attach to"),this;var i,h,d,c,u,p,f,g,y,b,k,x,m,w,v,L,M,P;e||(e={}),c=new function(t){var e=document.createElement("div");return e.classList.add("spinner"),e.setAttribute("style","position:absolute;left:50%;top:50%;transform:translate3d(-50%,-50%,0);"),o(e,t),this.loading=function(){return e.innerHTML="Loading...",this},this.loaded=function(){return e.innerHTML="",this},this.remove=function(){return e&&e.parentNode.removeChild(e),this},this.error=function(t){return e&&(console.error(t),e.innerHTML='<span class="error">ERROR: '+t+"</span>"),this},this}(t).loading(),this.el=t,M="linechart",d="http://www.w3.org/2000/svg",m="number"==typeof e.duration?e.duration:"0s",i=t.clientWidth,h=t.clientHeight;var A=getComputedStyle(t);function S(){var t=s(u,"."+M+"-tooltip");return t&&t.parentNode.removeChild(t),P.hidetooltip&&P.hidetooltip.trigger(),!0}function C(t,e){return{x:t=w.left+(t-f)/(y-f)*(i-w.left-w.right),y:e=w.top+(1-(e-g)/(b-g))*(h-w.bottom-w.top)}}function N(t){return document.createElementNS(d,t)}function T(t,e,s){var d={line:{show:!0,stroke:"black","stroke-width":1,"stroke-linecap":"round","stroke-dasharray":""},grid:{show:!1,stroke:"black","stroke-width":1,"stroke-linecap":"round","stroke-dasharray":""},title:{},ticks:{show:!0},labels:{}};this.ticks={},this.line={},this.el=N("g"),a(this.el,[M+"-grid",M+"-grid-"+t]),this.title=N("text"),this.title.classList.add(M+"-grid-title"),o(this.title,this.el);var c=w["font-size"]||16;return o(this.el,u),this.setProperties=function(t){return r(d,t),this},this.getProperty=function(t){return d.hasOwnProperty(t)?d[t]:null},this.update=function(){var r,a,u,p,k,x,m,v,L;for(r in d.labels||(d.labels={}),this.title.innerHTML=d.title.label||"",a="x"==t?w.left+(i-w.right-w.left)/2:c/2,u="y"==t?w.top+(h-w.top-w.bottom)/2:h-c/2,l(this.title,{x:a,y:u,transform:"y"==t?"rotate(-90,"+a+","+u+")":""}),this.el.removeAttribute("style"),this.line.el||(this.line.el=N("path"),this.line.el.classList.add("line"),this.line.el.setAttribute("vector-effect","non-scaling-stroke"),o(this.line.el,this.el),this.line.animate=new H(this.line.el)),p=[{x:w.left-.5,y:h-w.bottom-.5},{x:"x"==t?i-w.right:w.left-.5,y:"x"==t?h-w.bottom-.5:w.top-.5}],this.line.animate.set({d:{from:"",to:p}}),l(this.line.el,{style:d.line.show?"display:block":"display:none",stroke:d.line.stroke,"stroke-width":d.line["stroke-width"],"stroke-dasharray":d.line["stroke-dasharray"]}),this.ticks)r&&!d.ticks.show&&(this.ticks[r].line&&this.ticks[r].line.parentNode.removeChild(this.ticks[r].line),this.ticks[r].text&&this.ticks[r].text.parentNode.removeChild(this.ticks[r].text),delete this.ticks[r]);for(r in d.labels)void 0!==r&&(x=d.labels[r].align||("x"==t?"bottom":"left"),m=d.labels[r]["text-anchor"]||("y"==t?"left"==x?"end":"start":"middle"),k="number"==typeof d.labels[r].length?d.labels[r].length:5,a="x"==t?parseFloat(r):"left"==x?f:y,u="x"==t?"bottom"==x?g:b:parseFloat(r),(e=C(a,u)).x=Math.round(e.x),s.x=Math.round(s.x),s=n(e),"x"==t?(d.grid.show&&a!=f&&(e.y="bottom"==x?w.top:h-w.bottom),s.y+="bottom"==x?k:-k):(d.grid.show&&u!=g&&(e.x="left"==x?i-w.right:w.left),s.x+="left"==x?-k:k),"x"==t&&(a<f||a>y)||"y"==t&&(u<g||u>b)?this.ticks[r]&&(this.ticks[r].line&&this.ticks[r].line.el.setAttribute("style","display:none"),this.ticks[r].text&&this.ticks[r].text.el.setAttribute("style","display:none")):(this.ticks[r]?(this.ticks[r].line&&this.ticks[r].line.el.removeAttribute("style"),this.ticks[r].text.el.removeAttribute("style")):(this.ticks[r]={text:{el:N("text")}},k>0&&(this.ticks[r].line={el:N("line")},this.ticks[r].line.animate=new H(this.ticks[r].line.el),o(this.ticks[r].line.el,this.el)),this.ticks[r].text.animate=new H(this.ticks[r].text.el),this.ticks[r].text.el.setAttribute("text-anchor",d["text-anchor"]||m),o(this.ticks[r].text.el,this.el)),this.ticks[r].line&&(this.ticks[r].line.animate.set({x1:{to:e.x-.5},x2:{to:s.x-.5},y1:{to:e.y-.5},y2:{to:s.y-.5}}),l(this.ticks[r].line.el,{stroke:d.grid.stroke,"stroke-width":d.grid["stroke-width"]})),this.ticks[r].text.el.innerHTML=d.labels[r].label,l(this.ticks[r].text.el,{stroke:d.labels[r].stroke||"black","stroke-width":d.labels[r]["stroke-width"]||0,fill:d.labels[r].fill||"black"}),v=s.x+(d.labels[r].dx||0)+("y"==t?4*("right"==d.labels[r].align?1:-1):0),L=s.y+(d.labels[r].dy||0)+("x"==t?4*("bottom"==d.labels[r].align?-1:1):0),this.ticks[r].text.animate.set({x:{to:v},y:{to:L}})));o(this.line.el,this.el)},this}function E(e,i,h){var d,c,p,k,x;function m(e){var r=parseInt(e.target.getAttribute("data-i"));i[r]?function(e,i,r,n,l){var h,d,c,p,f;if(L)(d=s(L,"."+M+"-tooltip"))||(a(d=document.createElement("div"),[M+"-tooltip"]),o(d,L)),h=s(e,"title").innerHTML,n.label||(n.label=h),"function"==typeof l.label?h=l.label.call(e,{series:i,i:r,data:n}):"string"==typeof l.label&&(h=l.label),h=h.replace(/\n/g,"<br />"),d.innerHTML=h,c="","function"==typeof l.class?c=l.class.call(e,{series:i,i:r,data:n}):"string"==typeof l.class&&(c=l.class),c&&d.setAttribute("class",c),p=e.getBoundingClientRect(),f=u.getBoundingClientRect(),d.setAttribute("style","position:absolute;left:"+Math.round(p.left+p.width/2-f.left+t.scrollLeft)+"px;top:"+Math.round(p.top+p.height/2-f.top)+"px;transform:translate3d(-50%,-100%,0);display:"+(h?"block":"none")),o(L,u),P.showtooltip&&P.showtooltip.trigger({i:r})}(e.target,d,r,i[r],d.tooltip):console.error("Bad tooltip "+r,e)}return i||(i=[]),d={points:{show:!0,color:"black","stroke-linecap":"round",stroke:"black","stroke-width":0,"fill-opacity":1},line:{show:!0,color:"#000000","stroke-width":4,"stroke-linecap":"round","stroke-linejoin":"round","stroke-dasharray":"",fill:"none"}},c={},p="",k=[],label="",this.el=N("g"),(x={id:d.id||"series-"+(e+1)})[M+"-series"]=e+1,l(this.el,x),a(this.el,[M+"-series",M+"-series-"+(e+1)]),this.select=function(){return c.el.classList.add("on"),this},this.selectItem=function(t){return t>=0&&k[t].el?m({target:k[t].el}):S(),this},this.deselect=function(){return c.el.classList.remove("on"),this},this.setData=function(t){return i=t||[],this},this.updateRange=function(){for(var t=0;t<i.length;t++)f=Math.min(f,i[t].x),g=Math.min(g,i[t].y),y=Math.max(y,i[t].x),b=Math.max(b,i[t].y);return this},this.getStyle=function(t,e){return d.hasOwnProperty(t)&&d[t].hasOwnProperty(e)?d[t][e]:null},this.getProperty=function(t){return d.hasOwnProperty(t)?d[t]:null},this.getProperties=function(){return d},this.setProperties=function(t){if(t||(t={}),r(d,t),d.class){var e=d.class.split(/ /);a(this.el,e)}return this},this.update=function(){var t,r,s,a,h,u,f,g;if(c.el||(c.el=N("path"),c.el.classList.add("line"),l(c.el,{d:"M0 0 L 100,100",stroke:d.line.color||"black"}),o(c.el,this.el),c.animate=new H(c.el),c.el.addEventListener("click",O)),l(c.el,{style:d.line.show?"display:block":"display:none",stroke:d.line.color||"black","stroke-width":this.getStyle("line","stroke-width"),"stroke-linecap":this.getStyle("line","stroke-linecap"),"stroke-linejoin":this.getStyle("line","stroke-linejoin"),"stroke-dasharray":this.getStyle("line","stroke-dasharray"),fill:this.getStyle("line","fill"),"vector-effect":"non-scaling-stroke"}),k.length>i.length)for(t=k.length-1;t>=i.length;t--)k[t].el.remove(),k.pop();if(k.length<i.length){for(r=k.length;r<i.length;r++)s=N("circle"),(g={cx:0,cy:0,"data-i":r,tabindex:0})[M+"-series"]=e+1,l(s,g),k[r]={el:s,title:N("title"),old:{}},i[r].label||(i[r].label="Point "+(r+1)),d.tooltip||(d.tooltip={}),a=i[r].label+": "+i[r].y.toFixed(2),"function"==typeof d.tooltip.label?a=d.tooltip.label.call(s,{series:d,i:r,data:i[r]}):"string"==typeof d.tooltip.label&&(a=d.tooltip.label),k[r].title.innerHTML=a,o(k[r].title,s),d.tooltip.label&&(s.addEventListener("mouseover",function(t){t.target.focus()}),s.addEventListener("focus",m)),o(s,this.el),k[r].c=new H(k[r].el);if(d.line.label){label=N("text"),label.innerHTML=d.title;var y=C(i[k.length-1].x,i[k.length-1].y);y["dominant-baseline"]="middle",y.fill=d.line.color||"black",d.line.label.padding&&(y.x+=d.line.label.padding),l(label,y),o(label,this.el)}}for(h=[],r=0;r<k.length;r++)u=(d["stroke-width"]||1)/2,d.points&&("number"==typeof d.points.size&&(u=Math.max(d.points.size,u)),"function"==typeof d.points.size&&(u=d.points.size.call(s,{series:e,i:r,data:i[r]}))),l(k[r].el,{r:u,fill:d.points.color,"fill-opacity":d.points["fill-opacity"],stroke:d.points.stroke,"stroke-width":d.points["stroke-width"]}),f=C(i[r].x,i[r].y),h.push(f),k[r].c.set({cx:{from:k[r].old.x||null,to:f.x},cy:{from:k[r].old.y||null,to:f.y}}),k[r].old=f;return label,c.animate.set({d:{from:p,to:h}}),p=n(h),this},this.setData(i),this.setProperties(h),o(this.el,u),this}function H(e,i){var r,s,a;return r=window.getComputedStyle(t),s=e.tagName.toLowerCase(),i||(i={}),a={},r["animation-duration"]&&(this.duration=r["animation-duration"]),i.duration&&(this.duration=i.duration),this.duration||(this.duration=m),this.duration=parseFloat(this.duration),this.set=function(t){var i,r,h,d,c,u;for(i in e.querySelectorAll("animate").forEach(function(t){t.parentNode.removeChild(t)}),t)if(i){if(c=t[i].from||"",u=t[i].to,!c&&a[i]&&(c=a[i].value),h=null,d=null,"path"==s){for(h="",d="",r=0;r<c.length;r++)h+=(r>0?"L":"M")+c[r].x.toFixed(2)+","+c[r].y.toFixed(2);for(r=0;r<u.length;r++)d+=(r>0?"L":"M")+u[r].x.toFixed(2)+","+u[r].y.toFixed(2);h||(h=null)}else c&&(h=n(c)),d=n(u);this.duration&&null!==h&&(a[i]||(a[i]={}),a[i].el=N("animate"),l(a[i].el,{attributeName:i,dur:this.duration||0,repeatCount:"1"}),o(a[i].el,e)),e.setAttribute(i,d),this.duration&&null!==h&&(l(a[i].el,{from:h,to:d,values:h+";"+d}),a[i].el.beginElement(),a[i].value=u)}return this},this}function F(){f=1e100,g=1e100,y=-1e100,b=-1e100;for(var t=0;t<p.length;t++)p[t].updateRange();"number"==typeof v.x.getProperty("min")&&(f=v.x.getProperty("min")),"number"==typeof v.x.getProperty("max")&&(y=v.x.getProperty("max")),"number"==typeof v.y.getProperty("min")&&(g=v.y.getProperty("min")),"number"==typeof v.y.getProperty("max")&&(b=v.y.getProperty("max"))}function O(t){for(var e=parseInt(t.currentTarget.closest("g").getAttribute(M+"-series"))-1,i=0;i<p.length;i++)e==i?p[i].select():p[i].deselect();o(p[e].el,p[e].el.closest("svg")),x&&o(x.el,x.el.closest("svg")),s(t.target.parentNode,"circle").focus(),o(L,u)}return h-=parseFloat(A.paddingTop)+parseFloat(A.paddingBottom),i-=parseFloat(A.paddingLeft)+parseFloat(A.paddingRight),p=[],P={},r(w={left:0,top:0,right:0,bottom:0,tick:5,"font-size":16,tooltip:{},key:{show:!1,border:{stroke:"black","stroke-width":1,fill:"none"},text:{"text-anchor":"start","dominant-baseline":"hanging","font-weight":"bold",fill:"black","stroke-width":0,"font-family":"sans-serif"}},axis:{x:{},y:{}}},e),u||(l(u=N("svg"),{xmlns:d,version:"1.1",width:i,height:h,viewBox:"0 0 "+i+" "+h,overflow:"visible",style:"max-width:100%;",preserveAspectRatio:"xMinYMin meet"}),o(k=N("defs"),u),o(u,t),t.addEventListener("mouseleave",function(t){S()}),l(L=N("foreignObject"),{width:1,height:1,overflow:"visible"}),o(L,u)),(v={x:new T("x",w.left,i-w.right-w.left),y:new T("y",w.bottom,h-w.top-w.bottom)}).x.setProperties(w.axis.x||{}),v.y.setProperties(w.axis.y||{}),this.on=function(t,e,i){return"function"==typeof e&&(i=n(e),delete e),P[t]=new function(t,e){"function"==typeof t&&(e=t,t={});this.trigger=function(i){var s=t;r(s,i),e.call(s.this||this,s)}}(e,i),this},this.off=function(t){return delete P[t],this},this.getSVG=function(){return u.querySelectorAll("animate").forEach(function(t){t.parentNode.removeChild(t)}),u.outerHTML},this.setProperties=function(t){return r(w,t||{}),v.x.setProperties(w.axis.x||{}),v.y.setProperties(w.axis.y||{}),this},this.addSeries=function(t,e){return t?(e||(e={}),p.push(new E(p.length,t,e)),F(),this.series=p,this):(c.error("No data in series"),this)},this.draw=function(){var t,e,r,n,h,d,c,f,g,y,b,L,P,A;for(S(),F(),v.x.update(),v.y.update(),t="<style>",t+="\t."+M+"-series circle { transition: transform "+m+" linear, r "+m+" linear; }\n",t+="\t."+M+"-series circle:focus { stroke-width: 4; }\n",t+="\t."+M+"-series:hover path.line, ."+M+"-series.on path.line { cursor:pointer; }\n",e=0;e<p.length;e++)p[e].update(),t+="\t."+M+"-series-"+(e+1)+":hover path.line, ."+M+"-series-"+(e+1)+".on path.line { stroke-width: "+(p[e].getProperty("stroke-width-hover")||4)+"; }\n";if(w.key.show){if(r=w["font-size"]||16,n=w.key.padding||5,h=(w.key.label?1:0)*r+2*n+p.length*r,c=0,f=0,!x){if((x={el:N("g"),g:[],border:N("rect")}).el.classList.add("key"),l(x.border,{x:0,y:w.top,width:i,height:h}),"object"==typeof w.key.border)for(P in w.key.border)x.border.setAttribute(P,w.key.border[P]);o(x.border,x.el),o(x.el,u)}for(d=0,g=0;g<p.length;g++)x.g[g]||(x.g[g]=N("g"),x.g[g].setAttribute(M+"-series",g),A=[M+"-series",M+"-series-"+(g+1)],p[g].getProperty("class")&&A.concat(p[g].getProperty("class").split(/ /)),a(x.g[g],A),o(x.g[g],x.el),x.g[g].addEventListener("mouseover",O)),x.g[g].innerHTML='<text><tspan dx="'+2*r+'" dy="0">'+(p[g].getProperty("title")||"Series "+(g+1))+'</tspan></text><path d="M0 0 L 1 0" class="line" class="" stroke-width="3" stroke-linecap="round"></path><circle cx="0" cy="0" r="5" fill="silver"></circle>',d=Math.max(d,x.g[g].getBoundingClientRect().width);for(c=i-w.right-d-n,f=w.top,l(x.border,{x:c,width:d+n}),f+=n,c+=n,g=0;g<p.length;g++){if(y=s(x.g[g],"text"),b=s(x.g[g],"path"),L=s(x.g[g],"circle"),y.setAttribute("x",c),y.setAttribute("y",f+g*r+.2*r),"object"==typeof w.key.text)for(P in w.key.text)y.setAttribute(P,w.key.text[P]);b.setAttribute("d","M"+c+","+(f+(.5+g)*r)+" l "+1.5*r+" 0"),l(L,{cx:c+.75*r,cy:f+(.5+g)*r,fill:(P=p[g].getProperties()).points.color||"","stroke-width":P.points["stroke-width"]||0,stroke:P.points.stroke||""}),P.line.color&&b.setAttribute("stroke",P.line.color)}}return t+="\t."+M+"-grid."+M+"-grid-x ."+M+"-grid-title,."+M+"-grid."+M+"-grid-y ."+M+"-grid-title { text-anchor: middle; dominant-baseline: central; }\n",t+="\t."+M+"-grid."+M+"-grid-x text { dominant-baseline: hanging; }\n",t+="\t."+M+"-grid."+M+"-grid-y text { dominant-baseline: "+((w.axis.y.labels?w.axis.y.labels.baseline:"")||"middle")+"; }\n",t+="\t."+M+"-tooltip { background: black; color: white; padding: 0.25em 0.5em; margin-top: -1em; transition: left 0.1s linear, top 0.1s linear; border-radius: 4px; white-space: nowrap; }\n",t+="\t."+M+'-tooltip::after { content: ""; position: absolute; bottom: auto; width: 0; height: 0; border: 0.5em solid transparent; left: 50%; top: 100%; transform: translate3d(-50%,0,0); border-color: transparent; border-top-color: black; }\n',t+="\t</style>\n",k&&(k.innerHTML=t),this},c.remove(),this}function r(t,e){for(var i in e)try{e[i].constructor==Object?t[i]=r(t[i],e[i]):t[i]=e[i]}catch(r){t[i]=e[i]}return t}function s(t,e){return t.querySelector(e)}function o(t,e){return e.appendChild(t)}function n(t){return JSON.parse(JSON.stringify(t))}function l(t,e){for(var i in e)t.setAttribute(i,e[i]);return t}function a(t,e){for(var i=0;i<e.length;i++)t.classList.add(e[i]);return t}e.ready||(e.ready=function(t){"loading"!=document.readyState?t():document.addEventListener("DOMContentLoaded",t)}),e.linechart=function(t,e){return new i(t,e)},t.OI=e}(window||this);

/**
  Leeds Digital Festival Reporting tool
  (c) Open Innovations 2021
*/
(function(root){
	var OI = root.OI || {};
	OI.ready = function(fn){ if(document.readyState != 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); };
	var regions = {
		'North East':'UKC',
		'North West':'UKD',
		'Yorkshire and the Humber':'UKE',
		'Yorkshire and The Humber':'UKE',
		'East Midlands':'UKF',
		'West Midlands':'UKG',
		'East of England':'UKH',
		'London':'UKI',
		'South East':'UKJ',
		'South West':'UKK',
		'Wales':'UKL',
		'Scotland':'UKM',
		'Northern Ireland':'UKN'
	};

	function Panel(opts){
		if(!opts) opts = {};
		this.el = document.createElement('li');
		var sty = '';
		if(opts.rows > 0) sty += 'grid-row:auto / span '+opts.rows+';';
		if(opts.cols > 0) sty += 'grid-col:auto / span '+opts.cols+';';
		this.el.setAttribute('style',sty);
		this.el.setAttribute('tabindex',0);
		this.set = function(dat){
			for(var key in dat) this[key] = dat[key]||"";
			return this;
		}
		this.update = function(){
			this.el.innerHTML = '<span class="title">'+(this.title||"")+'</span>'+(this.content||'<div class="number">?</div>')+(this.footnote ? '<p class="footnote">'+this.footnote+'</p>':'');
			if(typeof this.callback==="function") this.callback.call(this);
			return this;
		}
		this.set(opts).update();
		return this;
	}
	function Dashboard(el){
		var list = document.createElement('ul');
		list.classList.add('panels');
		if(el){
			el.appendChild(list);
		}
		var panels = [];
		this.addPanel = function(opts){
			panels.push(new Panel(opts));
			list.appendChild(panels[panels.length-1].el);
			return this;
		}
		this.updatePanel = function(id,dat){
			var p = this.getPanelNumber(id);
			if(p >= 0) panels[p].set(dat).update();
			return this;
		}
		this.getPanelNumber = function(id){
			for(var p = 0; p < panels.length; p++){
				if(panels[p].id==id) return p;
			}
			return -1;
		}
		this.getPanels = function(){ return panels; }
		return this;
	}

	function Report(el,opts){
		if(!opts) opts = {};
		var data = opts.data||{};
		if(!data.host) data.host = "data/2021-09/host-returns.json";
		if(!data.UK) data.UK = "docs/UK.svg";
		if(!data.twitter) data.twitter = "data/2021-09/twitter.csv";
		if(!data.linkedin) data.linkedin = "data/2021-09/linkedin-visitors.csv";
		if(!data.website) data.website = "data/2021-09/website.csv";
		if(!data.sponsors) data.sponsors = "data/2021-09/sponsors.json";
		if(!data.events) data.events = "data/2021-09/events.json";
		if(!el){
			console.warn('No element to attach report to');
			return true;
		}
		var range = {'start':new Date("2021-09-20"),'end':new Date("2021-10-01")};
		var dashboard = new Dashboard(el);
		var main = document.createElement('section');
		el.appendChild(main);
		html = '<h2>More info here</h2>';
		html += '<div id="website" class="sub-section"></div>';
		html += '<div id="twitter" class="sub-section"></div>';
		main.innerHTML = html;

		dashboard.addPanel({'id':'events','title':"Events",'content':'','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
		dashboard.addPanel({'id':'sponsors','title':"Sponsors",'content':''});
		dashboard.addPanel({'id':'UK-regions','title':'UK region attendees','rows':3});
		dashboard.addPanel({'id':'host-returns','title':'Host returns'});
		dashboard.addPanel({'id':'first-time','title':'First time hosts'});
		dashboard.addPanel({'id':'attended','title':'People attended'});
		dashboard.addPanel({'id':'website-views','title':"Website pageviews"});
		dashboard.addPanel({'id':'tweet-impressions','title':"Tweet impressions"});
		dashboard.addPanel({'id':'tweet-engagements','title':"Tweet engagements"});
		dashboard.addPanel({'id':'tweet-number','title':"Tweets"});
		dashboard.addPanel({'id':'tweet-RT','title':"Retweets"});
		dashboard.addPanel({'id':'tweet-likes','title':"Tweet likes"});
		dashboard.addPanel({'id':'linkedin-visits','title':"LinkedIn unique visitors"});

		
		function inRange(dt,s,e){
			// Fix US date format
			if(typeof dt!=="string") dt = dt.toISOString().substr(0,10);
			var s = (s||range.start).toISOString().substr(0,10);
			var e = (e||range.end).toISOString().substr(0,10);
			return (dt >= s && dt <= e);
		}

		this.update = function(){
			console.log(data)
			var i,r,t,dt,html,impressions;
			var counts = {};

			if(typeof data.events==="object"){
				console.log(data.events.total);
				dashboard.updatePanel('events',{'content':'<div class="number">'+data.events.total.events+'</div>'});
			}
			
			if(data.linkedin.csv){
				visitors = 0;
				for(r = 0; r < data.linkedin.csv.rows.length; r++){
					dt = data.linkedin.csv.rows[r].date.replace(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/,function(m,p1,p2,p3){ return p3+"-"+p1+"-"+p2; });
					if(inRange(dt,range.start,range.end)) visitors += data.linkedin.csv.rows[r]['total_unique_visitors_total'];
				}
				dashboard.updatePanel('linkedin-visits',{'content':'<div class="number">'+visitors.toLocaleString()+'</div>','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
			}

			months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

			if(data.website.csv){
				pageviews = 0;
				totalusers = 0;
				//for(r = 0; r < data.website.csv.rows.length; r++){
				//	dt = data.website.csv.rows[r].date.replace(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/,function(m,p1,p2,p3){ return p3+"-"+p1+"-"+p2; });
				//	if(inRange(dt,range.start,range.end)) pageviews += data.website.csv.rows[r]['pageviews'];
				//}
				xlabels = {};
				data.website.processed = {'views':{'total':0,'v':[]},'users':{'total':0,'v':[]}};
				for(r = 0; r < data.website.csv.rows.length; r++){
					dt = data.website.csv.rows[r].date.replace(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})/,function(m,p1,p2,p3){ return p3+"-"+(p1<10?"0":"")+p1+"-"+(p2<10?"0":"")+p2; });
					users = data.website.csv.rows[r].users;
					views = data.website.csv.rows[r].pageviews;
					pageviews += views;
					totalusers += users;
					data.website.processed.users.v.push({'x':r,'y':users,'d':dt});
					data.website.processed.views.v.push({'x':r,'y':views,'d':dt});
					if(dt.match(/01$/)) xlabels[r] = {'label':dt.replace(/^[0-9]{4}\-([0-9]{1,2})\-.*$/,function(m,p1){ return (p1 ? months[parseInt(p1)-1]:"")})};
					if(inRange(dt,range.start,range.end)){
						data.website.processed.users.total += users;
						data.website.processed.views.total += views;
					}
				}
				dashboard.updatePanel('website-views',{'content':'<div class="number">'+data.website.processed.views.total.toLocaleString()+'</div>','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
				website = main.querySelector('#website');
				website.innerHTML = '<h2>Website statistics</h2><p>During the festival ('+range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()+') there were '+data.website.processed.views.total.toLocaleString()+' pageview'+(data.website.processed.views.total==1 ? '':'s')+' from '+data.website.processed.users.total.toLocaleString()+' users. Below is a barchart showing the number of pageviews per day:</p><div id="website-views" class="chart"></div>';
				OI.linechart(document.getElementById('website-views'),{
					'left':50,'right':10,'top':10,'bottom':30,
					'axis':{
						'x':{ 'labels': xlabels, 'line':{'stroke': '#0C0C33', 'stroke-width': 1.5} },
						'y':{
							'line': {'show':false},
							'grid': {'show':true, 'stroke': '#0C0C33', 'stroke-width': 1.5},
							'labels':{
								0: {'label':0},
								2000: {'label':'2,000'},
								4000: {'label':'4,000'},
								6000: {'label':'6,000'}
							}
						}
					}
				}).addSeries(data.website.processed.views.v,{
					'title': 'Views',
					'points':{ 'size':4, 'color': 'rgba(61,242,186,1)' },
					'line':{ 'color': 'rgba(61,242,186,1)' },
					'tooltip':{
						'label': function label(d){
							return ''+(new Date(d.data.d)).toLocaleDateString()+'\nViews: '+d.data.y+'';
						}
					}
				}).draw();
			}

			if(data.twitter.csv){
				impressions = 0;
				tweets = 0;
				retweets = 0;
				likes = 0;
				engagements = 0;
				xlabels = {};
				tw = {'tweets':{'total':0,'v':[]},'impressions':{'total':0,'v':[]},'retweets':{'total':0,'v':[]},'likes':{'total':0,'v':[]},'engagements':{'total':0,'v':[]},'rate':{'v':[]}};
				months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
				for(r = 0; r < data.twitter.csv.rows.length; r++){
					dt = data.twitter.csv.rows[r].date.replace(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})/,function(m,p1,p2,p3){ return p3+"-"+(p1<10?"0":"")+p1+"-"+(p2<10?"0":"")+p2; });
					impressions = data.twitter.csv.rows[r].impressions + data.twitter.csv.rows[r]['promoted_impressions'];
					engagements = data.twitter.csv.rows[r].engagements + data.twitter.csv.rows[r]['promoted_engagements'];
					retweets = data.twitter.csv.rows[r].retweets + data.twitter.csv.rows[r]['promoted_retweets'];
					likes = data.twitter.csv.rows[r].likes + data.twitter.csv.rows[r]['promoted_likes'];
					tweets = data.twitter.csv.rows[r]['tweets_published'];
					
					tw.impressions.v.push({'x':r,'y':impressions,'d':dt});
					tw.engagements.v.push({'x':r,'y':engagements,'d':dt});
					tw.retweets.v.push({'x':r,'y':retweets,'d':data.twitter.csv.rows[r].date});
					tw.likes.v.push({'x':r,'y':likes,'d':dt});
					tw.tweets.v.push({'x':r,'y':tweets,'d':dt});
					tw.rate.v.push({'x':r,'y':100*engagements/impressions,'d':dt,'impressions':impressions,'engagements':engagements});

					if(dt.match(/01$/)) xlabels[r] = {'label':dt.replace(/^[0-9]{4}\-([0-9]{1,2})\-.*$/,function(m,p1){ return (p1 ? months[parseInt(p1)-1]:"")})};
					if(inRange(dt,range.start,range.end)){
						tw.impressions.total += impressions;
						tw.engagements.total += engagements;
						tw.retweets.total += retweets;
						tw.likes.total += likes;
						tw.tweets.total += tweets;
					}
				}
				dashboard.updatePanel('tweet-number',{'content':'<div class="number">'+tw.tweets.total.toLocaleString()+'</div>','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
				dashboard.updatePanel('tweet-impressions',{'content':'<div class="number">'+tw.impressions.total.toLocaleString()+'</div>','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
				dashboard.updatePanel('tweet-engagements',{'content':'<div class="number">'+tw.engagements.total.toLocaleString()+'</div>','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
				dashboard.updatePanel('tweet-RT',{'content':'<div class="number">'+tw.retweets.total.toLocaleString()+'</div>','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
				dashboard.updatePanel('tweet-likes',{'content':'<div class="number">'+tw.likes.total.toLocaleString()+'</div>','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
				// More info area
				twitter = main.querySelector('#twitter');
				twitter.innerHTML = '<h2>Twitter statistics</h2><p>During the festival ('+range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()+') we tweeted '+tw.tweets.total+' time'+(tw.tweets.total==1 ? '':'s')+'. These tweets received '+tw.impressions.total.toLocaleString()+' impressions and '+tw.engagements.total.toLocaleString()+' engagements including '+tw.likes.total.toLocaleString()+' likes and '+tw.retweets.total.toLocaleString()+' retweets. Below is a barchart showing the response rate (ratio of engagements to impressions) by day:</p><div id="twitter-impressions" class="chart"></div>';

				OI.linechart(document.getElementById('twitter-impressions'),{
					'left':50,'right':10,'top':10,'bottom':30,
					'axis':{
						'x':{ 'labels': xlabels, 'line':{'stroke': '#0C0C33', 'stroke-width': 1.5} },
						'y':{
							'line': {'show':false},
							'grid': {'show':true, 'stroke': '#0C0C33', 'stroke-width': 1.5},
							'labels':{
								1: {'label':'1%'},
								2: {'label':'2%'},
								3: {'label':'3%'},
								4: {'label':'4%'}
							}
						}
					}
				}).addSeries(tw.rate.v,{
					'title': 'Response rate',
					'points':{ 'size':4, 'color': 'rgba(61,242,186,1)' },
					'line':{ 'color': 'rgba(61,242,186,1)' },
					'tooltip':{
						'label': function label(d){
							return ''+(new Date(d.data.d)).toLocaleDateString()+'\nResponse rate: '+d.data.y.toFixed(1)+'%\nEngagement: '+d.data.engagements.toLocaleString()+'\nImpressions: '+d.data.impressions.toLocaleString()+'';
						}
					}
				}).draw();
			}

			if(typeof data.host==="object"){
				dashboard.updatePanel('host-returns',{'content':'<div class="number">'+data.host.total_returns.toLocaleString()+'</div>','footnote':'Out of '+(data.events.total ? data.events.total.hosts : '?')+' hosts'});
				dashboard.updatePanel('first-time',{'content':'<div class="number">'+data.host.first_time_ldf_host.toLocaleString()+'</div>'});
				if(data.host.uk_region_attendees && data.UK.svg){
					// Work out region sums
					for(r in regions) counts[regions[r]] = 0;
					for(r in data.host.uk_region_attendees){
						if(r) counts[regions[r]] = data.host.uk_region_attendees[r];
					}
					dashboard.updatePanel('UK-regions',{
						'content':'<div>'+data.UK.svg.replace(/<svg/,'<svg id="UK-map" style="max-width:100%;height:auto;" ')+'</div>',
						'footnote':'Based on regions reported in '+data.host.total_returns.toLocaleString()+' host returns.',
						'counts':counts,
						'callback':function(){
							// Update the UK map region colours
							var r,svg,max,path,region,rg,title;
							svg = this.el.querySelector('svg');
							// Remove tooltip when mouse leaves the panel
							this.el.addEventListener('mouseleave',removeTooltip);
							max = 0;
							for(r in this.counts) max = Math.max(max,this.counts[r]);
							for(r in this.counts){
								path = svg.querySelector('#'+r);
								region = "";
								for(rg in regions){
									if(regions[rg] == r) region = rg;
								}
								if(path){
									path.setAttribute('fill','rgba(61, 242, 186,'+(this.counts[r]/max)+')');
									path.innerHTML = "";
									path.addEventListener('mouseover',makeTooltip);
									title = document.createElementNS('http://www.w3.org/2000/svg','title');
									title.innerHTML = counts[r]+' host'+(this.counts[r]==1 ? '':'s')+' record'+(this.counts[r]==1 ? 's':'')+' '+region;
									path.appendChild(title);
								}
							}
						}
					});
				}
				if(data.host.attended){
					t = 0;
					for(i = 0; i < data.host.attended.length; i++) t += data.host.attended[i];
					dashboard.updatePanel('attended',{'content':'<div class="number">'+t.toLocaleString()+'</div>','footnote':'From '+data.host.total_returns.toLocaleString()+' host returns'});
				}
			}
			
			this.resize();
			return this;
		};
		
		this.resize = function(){
			var i;
			var li = el.querySelectorAll('li');
			var scale = 1;
			// Find minimum scale
			for(i = 0; i < li.length; i++) scale = Math.min(scale,li[i].offsetWidth/328);
			// Set scale
			for(i = 0; i < li.length; i++) li[i].style['font-size'] = scale+'em';
			return this;
		};
		
		window.onresize = this.resize;

		function makeTooltip(ev){
			var parent = this.closest('div');
			var tooltip = parent.querySelector('.tooltip');
			// Clear or make a new tooltip
			if(tooltip) tooltip.innerHTML = "";
			else tooltip = document.createElement('div');
			tooltip.innerHTML = this.querySelector('title').innerHTML;
			tooltip.classList.add('tooltip');
			parent.appendChild(tooltip);
			parent.style.position = 'relative';
			bb = this.getBoundingClientRect();
			pt = parent.getBoundingClientRect();
			tooltip.style.position = "absolute";
			tooltip.style.left = (100 * (bb.left+(bb.width/2)-pt.left)/pt.width).toFixed(1)+'%';
			tooltip.style.top = (100 * (bb.top+bb.height-pt.top)/pt.height).toFixed(1)+'%';
		}
		function removeTooltip(){
			var tooltip = document.querySelector('.tooltip');
			if(tooltip) tooltip.parentNode.removeChild(tooltip);
		}
		// Get the data
		if(typeof data.host==="string"){
			fetch(data.host,{cache: "no-cache"}).then(response => { return response.json(); }).then(json => {
				f = data.host;
				data.host = json;
				data.host._file = f;
				this.update();
				return true;
			});	
		}
		// Get the data
		if(typeof data.UK==="string"){
			fetch(data.UK,{cache: "no-cache"}).then(response => { return response.text(); }).then(text => {
				f = data.UK;
				data.UK = { 'svg': text,'_file':f };
				this.update();
				return true;
			});
		}
		// Get the data
		if(typeof data.twitter==="string"){
			fetch(data.twitter,{cache: "no-cache"}).then(response => { return response.text(); }).then(text => {
				f = data.twitter;
				data.twitter = { 'csv':parseCSV(text) };
				data.twitter._file = f;
				this.update();
				return true;
			});
		}
		// Get the data
		if(typeof data.linkedin==="string"){
			fetch(data.linkedin,{cache: "no-cache"}).then(response => { return response.text(); }).then(text => {
				data.linkedin = {'csv':parseCSV(text)};
				this.update();
				return true;
			});
		}
		// Get the data
		if(typeof data.website==="string"){
			fetch(data.website,{cache: "no-cache"}).then(response => { return response.text(); }).then(text => {
				data.website = { 'csv': parseCSV(text) };
				this.update();
				return true;
			});
		}
		// Get the data
		if(typeof data.sponsors==="string"){
			fetch(data.sponsors,{cache: "no-cache"}).then(response => { return response.json(); }).then(json => {
				data.sponsors = json;
				this.update();
				return true;
			});	
		}
		// Get the data
		if(typeof data.events==="string"){
			fetch(data.events,{cache: "no-cache"}).then(response => { return response.json(); }).then(json => {
				data.events = json;
				this.update();
				return true;
			});
		}
		return this;
	}
	function parseCSV(text){
		var r,c,rows,dat,row;
		rows = text.split(/\n/);
		for(r = rows.length-1; r >= 0 ; r--){
			rows[r] = rows[r].replace(/[\n\r]/g,"");
			rows[r] = rows[r].split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/);
			if(rows[r].length==1) rows.splice(r,1);
		}
		dat = {'head':rows[0],'rows':[]};
		for(r = 1; r < rows.length; r++){
			row = {};
			if(rows[r]!=""){
				for(c = 0; c < rows[r].length; c++){
					v = rows[r][c];
					if(v == parseInt(v)) v = parseInt(v);
					if(v == parseFloat(v)) v = parseFloat(v);
					row[dat.head[c]] = v;				
				}
			}
			dat.rows.push(row);
		}
		return dat;
	}
	function parseTSV(text){
		var r,c,rows,dat,row;
		rows = text.split(/\n/);
		for(r = rows.length-1; r >= 0 ; r--){
			rows[r] = rows[r].replace(/[\n\r]/g,"");
			rows[r] = rows[r].split(/\t/);
			if(rows[r].length==1) rows.splice(r,1);
		}
		dat = {'head':rows[0],'rows':[]};
		for(r = 1; r < rows.length; r++){
			row = {};
			if(rows[r]!=""){
				for(c = 0; c < rows[r].length; c++){
					v = rows[r][c];
					if(v == parseInt(v)) v = parseInt(v);
					if(v == parseFloat(v)) v = parseFloat(v);
					row[dat.head[c]] = v;				
				}
			}
			dat.rows.push(row);
		}
		return dat;
	}
	OI.report = Report;
	root.OI = OI;
})(window || this);
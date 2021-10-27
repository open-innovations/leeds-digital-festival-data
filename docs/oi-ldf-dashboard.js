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
		if(!data.host) data.host = {"file":"https://raw.githubusercontent.com/open-innovations/leeds-digital-festival-data/main/data/2021-09/host-returns.json"};
		if(!data.UK) data.UK = {"file":"https://raw.githubusercontent.com/open-innovations/leeds-digital-festival-data/main/docs/UK.svg"};
		if(!data.twitter) data.twitter = {"file":"../data/twitter.tsv"};
		if(!el){
			console.warn('No element to attach report to');
			return true;
		}
		var range = {'start':new Date("2021-09-20"),'end':new Date("2021-10-01")};
		var dashboard = new Dashboard(el);
		var main = document.createElement('section');
		el.appendChild(main);

		dashboard.addPanel({'id':'events','title':"Events",'content':'','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
		dashboard.addPanel({'id':'sponsors','title':"Sponsors",'content':''});
		dashboard.addPanel({'id':'UK-regions','title':'UK region attendees','rows':2});
		dashboard.addPanel({'id':'registered','title':'Registered'});
		dashboard.addPanel({'id':'attended','title':'Attended'});
		dashboard.addPanel({'id':'host-returns','title':'Host returns'});
		dashboard.addPanel({'id':'first-time','title':'First time host'});
		dashboard.addPanel({'id':'tweet-impressions','title':"Tweet impressions"});
		dashboard.addPanel({'id':'tweet-engagements','title':"Tweet engagements"});
		dashboard.addPanel({'id':'tweet-number','title':"Tweets"});
		dashboard.addPanel({'id':'tweet-RT','title':"Retweets"});
		dashboard.addPanel({'id':'tweet-likes','title':"Tweet likes"});
		dashboard.addPanel({'id':'website-visits','title':"Website visits"});

		html = '<h2>More info here</h2>';
		html += '<p>Some text</p>';
		main.innerHTML = html;
		
		function inRange(dt,s,e){
			// Fix US date format
			if(typeof dt==="string") dt = dt.replace(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})/,function(m,p1,p2,p3){ return p3+"-"+(p1<10?"0":"")+p1+"-"+(p2<10?"0":"")+p2; });
			else dt = dt.toISOString().substr(0,10);
			var s = (s||range.start).toISOString().substr(0,10);
			var e = (e||range.end).toISOString().substr(0,10);
			return (dt >= s && dt <= e);
		}

		this.update = function(){
			var i,r,t,dt,html,impressions;
			var counts = {};

			if(data.twitter.tsv){
				impressions = 0;
				tweets = 0;
				retweets = 0;
				likes = 0;
				engagements = 0;
				for(r = 0; r < data.twitter.tsv.rows.length; r++){
					if(inRange(data.twitter.tsv.rows[r].Date,range.start,range.end)){
						impressions += data.twitter.tsv.rows[r].impressions + data.twitter.tsv.rows[r]['promoted impressions'];
						engagements += data.twitter.tsv.rows[r].engagements + data.twitter.tsv.rows[r]['promoted engagements'];
						retweets += data.twitter.tsv.rows[r].retweets + data.twitter.tsv.rows[r]['promoted retweets'];
						likes += data.twitter.tsv.rows[r].likes + data.twitter.tsv.rows[r]['promoted likes'];
						tweets += data.twitter.tsv.rows[r]['Tweets published'];
					}
				}
				dashboard.updatePanel('tweet-number',{'content':'<div class="number">'+tweets.toLocaleString()+'</div>','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
				dashboard.updatePanel('tweet-impressions',{'content':'<div class="number">'+impressions.toLocaleString()+'</div>','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
				dashboard.updatePanel('tweet-engagements',{'content':'<div class="number">'+engagements.toLocaleString()+'</div>','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
				dashboard.updatePanel('tweet-RT',{'content':'<div class="number">'+retweets.toLocaleString()+'</div>','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
				dashboard.updatePanel('tweet-likes',{'content':'<div class="number">'+likes.toLocaleString()+'</div>','footnote':range.start.toLocaleDateString()+' to '+range.end.toLocaleDateString()});
			}

			if(data.host.json){
				dashboard.updatePanel('host-returns',{'content':'<div class="number">'+data.host.json.total_returns.toLocaleString()+'</div>','footnote':'Out of XX hosts'});
				dashboard.updatePanel('first-time',{'content':'<div class="number">'+data.host.json.first_time_ldf_host.toLocaleString()+'</div>'});
				if(data.host.json.uk_region_attendees && data.UK.text){
					// Work out region sums
					for(r in regions) counts[regions[r]] = 0;
					for(i = 0; i < data.host.json.uk_region_attendees.length; i++){
						r = regions[data.host.json.uk_region_attendees[i]];
						if(r) counts[r]++;
					}
					dashboard.updatePanel('UK-regions',{
						'content':'<div>'+data.UK.text.replace(/<svg/,'<svg id="UK-map" style="max-width:100%;height:auto;" ')+'</div>',
						'footnote':'*Note that this is based on regions reported in host returns and doesn\'t necessarily match the regions of all attendees.',
						'counts':counts,
						'callback':function(){
							// Update the UK map region colours
							var r,svg,max,path,region,rg,title;
							svg = this.el.querySelector('svg');
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
									title.innerHTML = counts[r]+' response'+(this.counts[r]==1 ? '':'s')+' for '+region;
									path.appendChild(title);
								}
							}
						}
					});
				}
				if(data.host.json.registered){
					t = 0;
					for(i = 0; i < data.host.json.registered.length; i++) t += data.host.json.registered[i];
					dashboard.updatePanel('registered',{'content':'<div class="number">'+t.toLocaleString()+'</div>'});
				}
				if(data.host.json.attended){
					t = 0;
					for(i = 0; i < data.host.json.attended.length; i++) t += data.host.json.attended[i];
					dashboard.updatePanel('attended',{'content':'<div class="number">'+t.toLocaleString()+'</div>'});
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
		// Get the data
		fetch(data.host.file,{cache: "no-cache"}).then(response => { return response.json(); }).then(json => {
			data.host.json = json;
			this.update();
			return true;
		});	
		// Get the data
		fetch(data.UK.file,{cache: "no-cache"}).then(response => { return response.text(); }).then(text => {
			data.UK.text = text;
			this.update();
			return true;
		});
		// Get the data
		fetch(data.twitter.file,{cache: "no-cache"}).then(response => { return response.text(); }).then(text => {
			data.twitter.tsv = parseTSV(text);
			this.update();
			return true;
		});
		return this;
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
			console.log(row,rows[r]);
			dat.rows.push(row);
		}
		return dat;
	}
	OI.report = Report;
	root.OI = OI;
})(window || this);
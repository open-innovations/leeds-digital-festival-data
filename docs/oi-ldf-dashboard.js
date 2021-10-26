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

	function Report(el,opts){
		if(!opts) opts = {};
		var data = opts.data||{};
		if(!data.host) data.host = {"file":"https://raw.githubusercontent.com/open-innovations/leeds-digital-festival-data/main/data/2021-09/host-returns.json"};
		if(!data.UK) data.UK = {"file":"https://raw.githubusercontent.com/open-innovations/leeds-digital-festival-data/main/docs/UK.svg"};
		if(!el){
			console.warn('No element to attach report to');
			return true;
		}
		this.update = function(){
			var i,panels,a,t,html;
			panels = [];
			var counts = {};
			if(data.host.json){
				panels.push('<li><span class="title">Host returns</span><div class="number">'+data.host.json.total_returns.toLocaleString()+'</div></li>');
				panels.push('<li><span class="title">First time host</span><div class="number">'+data.host.json.first_time_ldf_host.toLocaleString()+'</div></li>');
				if(data.host.json.uk_region_attendees && data.UK.text){
					// Work out region sums
					for(r in regions) counts[regions[r]] = 0;
					for(i = 0; i < data.host.json.uk_region_attendees.length; i++){
						r = regions[data.host.json.uk_region_attendees[i]];
						if(r) counts[r]++;
					}
					panels.push('<li style="grid-row: auto / span 2;"><span class="title">UK region attendees</span><div>'+data.UK.text.replace(/<svg/,'<svg id="UK-map" style="max-width:100%;height:auto;" ')+'</div></li>');
				}
				if(data.host.json.registered){
					t = 0;
					for(i = 0; i < data.host.json.registered.length; i++) t += data.host.json.registered[i];
					panels.push('<li><span class="title">Registered</span><div class="number">'+t.toLocaleString()+'</div></li>');
				}
				if(data.host.json.attended){
					a = 0;
					for(i = 0; i < data.host.json.attended.length; i++) a += data.host.json.attended[i];
					panels.push('<li><span class="title">Attended</span><div class="number">'+a.toLocaleString()+'</div></li>');
				}
			}
			html = '';
			html += '<ul class="panels">';
			for(i = 0; i < panels.length; i++) html += panels[i];
			html += '</ul>';
			
			if(el) el.innerHTML = html;

			var svg = el.querySelector('#UK-map');
			if(svg){
				// Update the UK map region colours
				var max = 0;
				for(r in counts) max = Math.max(max,counts[r]);
				for(r in counts){
					path = svg.querySelector('#'+r);
					region = "";
					for(rg in regions){
						if(regions[rg] == r) region = rg;
					}
					if(path){
						path.setAttribute('fill','rgba(61, 242, 186,'+(counts[r]/max)+')');
						path.innerHTML = "";
						path.addEventListener('mouseover',makeTooltip);
						title = document.createElementNS('http://www.w3.org/2000/svg','title');
						title.innerHTML = counts[r]+' response'+(counts[r]==1 ? '':'s')+' for '+region;
						path.appendChild(title);
					}
				}
			}
			
			this.resize();
		};
		
		this.resize = function(){
			var i;
			var li = el.querySelectorAll('li');
			var scale = 1;
			// Find minimum scale
			for(i = 0; i < li.length; i++) scale = Math.min(scale,li[i].offsetWidth/328);
			// Set scale
			for(i = 0; i < li.length; i++) li[i].style['font-size'] = scale+'em';
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
		return this;
	}
	OI.report = Report;
	root.OI = OI;
})(window || this);
dojo.provide("imashup.components.widgets.FlightsCtrip");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("imashup.core.all");
dojo.require("dojo.io.iframe");
dojo.require("dojo.io.script");

dojo.declare(
    "imashup.components.widgets.FlightsCtrip",
    [dijit._Widget, dijit._Templated],
    {
	imashup_webos_large_icon_url: dojo.moduleUrl("imashup.components.widgets", "templates/Ctrip_large.png"),
	imashup_webos_small_icon_url: dojo.moduleUrl("imashup.components.widgets", "templates/Ctrip_small.png"),
	
	templatePath: dojo.moduleUrl("imashup.components.widgets", "templates/FlightsCtrip.html"),
		
	resizable: false,
	maxable: false,
	width: 1000,
	height: 600,
	
	imashup_human_name: "FlightsCtrip",
	imashup_catergories: ['Entertaiment'],
	
	if_flights_Ctrip:null,
	
	/*loadJs: function(file){
		var scriptTag = this.document.getElementById('loadScript');
		var head = this.document.getElementsByTagName('head').item(0);
		if(scriptTag) head.removeChild(scriptTag);
		script = this.document.createElement('script');
		script.src = file;
		script.type = 'text/javascript';
		script.id = 'loadScript';
		head.appendChild(script);
	},
	
	loadCss: function(file){
		var cssTag = this.document.getElementById('loadCss');
		var head = this.document.getElementsByTagName('head').item(0);
		if(cssTag) head.removeChild(cssTag);
		css = this.document.createElement('link');
		css.href = file;
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.id = 'loadCss';
		head.appendChild(css);
	},*/
	
	postCreate: function(){
		if_flights_Ctrip = this.if_flights_Ctrip;
		this.if_flights_Ctrip.height = this.height-30;
		this.if_flights_Ctrip.width = this.width-10;
		
		var mythis = this;
		this.if_flights_Ctrip.onload = function(){
			mythis.search(mythis);
			
			//mythis.loadJs("components/widgets/jquery-1.3.2.min.js");
			mythis.addFootpanel(mythis);
		};
		
	},
	
	addFootpanel:function(mythis){
		function fun(if1){
			var cssTag = this.document.getElementById('loadCss');
			var head = this.document.getElementsByTagName('head').item(0);
			if(cssTag) head.removeChild(cssTag);
			css = this.document.createElement('link');
			css.href = "http://localhost/imashup/components/widgets/footpanel.css";
			css.rel = 'stylesheet';
			css.type = 'text/css';
			css.id = 'loadCss';
			head.appendChild(css);
			
			//mythis.loadCss("components/widgets/footpanel.css");
			var footpanel = this.document.createElement("div");
			footpanel.id = "footpanel";
			footpanel.setAttribute("class", "stoolbar");
			footpanel.innerHTML = "<div class=\"inner\"><img id='home_icon' src='http://localhost/imashup/components/widgets/templates/home_icon.gif' title='go home' />Go to:<img id='goto_ctrip_icon' src='http://localhost/imashup/components/widgets/templates/ctrip_icon.png' title='go to ctrip' /><img id='goto_qunar_icon' src='http://localhost/imashup/components/widgets/templates/qunar_icon.png' title='go to qunar' />Rewrite with:<img id='rewritewith_ctrip_icon' src='http://localhost/imashup/components/widgets/templates/ctrip_icon.png' title='rewrite with ctrip' /><img id='rewritewith_qunar_icon' src='http://localhost/imashup/components/widgets/templates/qunar_icon.png' title='rewrite with qunar' /></div>";			
			this.document.body.appendChild(footpanel);
			this.document.getElementById('home_icon').onclick = function(){
				//set ctrip to be home
				for(var i in imashup.core.instanceManager._hash){if(i.match(/imashup_components_widgets_FlightsCtrip_\d*/)) break;}
				imashup.core.instanceManager.byId(i).if_flights_Ctrip.src = "http://flights.ctrip.com/Domestic/SearchFlights.aspx";
				//set qunar to be home
				for(var i in imashup.core.instanceManager._hash){if(i.match(/imashup_components_widgets_FlightsQunar_\d*/)) break;}
				imashup.core.instanceManager.byId(i).if_flights_Qunar.src = "http://flight.qunar.com/";
			};
			this.document.getElementById('goto_ctrip_icon').onclick = function(){
				for(var i in imashup.core.instanceManager._hash){if(i.match(/imashup_components_widgets_FlightsQunar_\d*/)) break;}
				imashup.core.instanceManager.byId(i).floatingpane.minimize();
				for(var i in imashup.core.instanceManager._hash){if(i.match(/imashup_components_widgets_FlightsCtrip_\d*/)) break;}
				imashup.core.instanceManager.byId(i).floatingpane.show();
			};
			this.document.getElementById('goto_qunar_icon').onclick = function(){
				for(var i in imashup.core.instanceManager._hash){if(i.match(/imashup_components_widgets_FlightsCtrip_\d*/)) break;}
				imashup.core.instanceManager.byId(i).floatingpane.minimize();
				for(var i in imashup.core.instanceManager._hash){if(i.match(/imashup_components_widgets_FlightsQunar_\d*/)) break;}
				imashup.core.instanceManager.byId(i).floatingpane.show();
				console.log('qunar');
			};
			this.document.getElementById('rewritewith_ctrip_icon').onclick = function(){
				if(!mythis.if_flights_Ctrip)
					mythis.SearchFlightsFrom("Ctrip","Ctrip");
			};
			this.document.getElementById('rewritewith_qunar_icon').onclick = function(){
				if(!mythis.if_flights_Qunar)
					mythis.SearchFlightsFrom("Qunar","Ctrip");
			};
			
			if(!this.document.getElementById('search_btn')){
				this.document.getElementById('goto_qunar_icon').src = "http://localhost/imashup/components/widgets/templates/new_icon.png";
				//console.log(this.document);
				//console.log(this.document.location.host);
			}
		}
		execInFrame(fun,mythis.if_flights_Ctrip);
	},
	
	search:function(mythis){
		function fun(if1){
			var button = this.document.getElementById('search_btn');
			//console.log(button);
			if(button){
				button.onmousedown=function(even){
					//console.log(if_flights_Ctrip);
					function fun1(){
						var depart = this.document.getElementById('DepartCity1TextBox').value;
						var arrive = this.document.getElementById('ArriveCity1TextBox').value;
						var date = this.document.getElementById('DepartDate1TextBox').value;
						//console.log(depart,arrive,date);
						mythis.SearchFlights(depart,arrive,date);
					};
					execInFrame(fun1,if_flights_Ctrip);
				};
			};
			
		}
		execInFrame(fun,mythis.if_flights_Ctrip);
	},
	
	SearchFlights: function(/* String */depart, /* String */arrive, /* String */date) {
		//console.log(depart,arrive,date);
	},
	
	SearchFlightsFrom: function(/* String */webFrom, /* String */webBase) {
		//console.log("SearchFlightsFrom "+webFrom+" "+webBase);
	},
	
	ToReWrite: function(/* String */web, /* Object */data){
		
	},
	
	Redirect: function(/* String */depart, /* String */arrive, /* String */date){
		function go(if1){
			this.document.getElementById('DepartCity1TextBox').value = depart;
			this.document.getElementById('ArriveCity1TextBox').value = arrive;
			this.document.getElementById('DepartDate1TextBox').value = date;
			this.document.getElementById('search_btn').onclick();
		}
		execInFrame(go,if_flights_Ctrip);
	},
	
	ResponseForSearchFlightsFrom: function(/* String */webFrom, /* String */webBase) {
		if(webFrom == "Ctrip")
			this.ToReWrite(webBase, "Ctrip");
	},
	
	ReWrite: function(/* String */web, /* Object */data) {
		//console.log("ReWrite "+web+" "+data);
		if(web == "Ctrip")
			console.log(data);//rewrite
	},
	
    }
);

imashup.core.componentTypeManager.registerComponentType({
    impl_name : 'imashup.components.widgets.FlightsCtrip',
    interface: {
        properties: {},
        methods: {
        	"Redirect" : { Function: "Redirect", CustomMethod: "/* arguments[0]: String, arguments[1]: String, arguments[2]: String */" },
        	"ResponseForSearchFlightsFrom" : { Function: "ResponseForSearchFlightsFrom", CustomMethod: "/* arguments[0]: String, arguments[1]: String */" },
        	"ReWrite" : { Function: "ReWrite", CustomMethod: "/* arguments[0]: String, arguments[1]: Object */" },
        },
        events: {
        	"SearchFlights" : { Function: "SearchFlights", CustomMethod: "/* arguments[0]: String, arguments[1]: String, arguments[2]: String */" },
        	"SearchFlightsFrom" : { Function: "SearchFlightsFrom", CustomMethod: "/* arguments[0]: String, arguments[1]: String */" },
        	"ToReWrite" : { Function: "ToReWrite", CustomMethod: "/* arguments[0]: String, arguments[1]: Object */" },
		}
    },
    mixin_types : ['window']
});

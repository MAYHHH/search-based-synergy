dojo.provide("imashup.components.widgets.Ctrip");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("imashup.core.all");
dojo.require("dojo.io.iframe");
dojo.require("dojo.io.script");

dojo.declare(
    "imashup.components.widgets.Ctrip",
    [dijit._Widget, dijit._Templated],
    {
	imashup_webos_large_icon_url: dojo.moduleUrl("imashup.components.widgets", "templates/Ctrip_large.png"),
	imashup_webos_small_icon_url: dojo.moduleUrl("imashup.components.widgets", "templates/Ctrip_small.png"),
	
	templatePath: dojo.moduleUrl("imashup.components.widgets", "templates/Ctrip.html"),
		
	resizable: true,
	maxable: false,
	width: 600,
	height: 500,
	
	imashup_human_name: "Ctrip",
	imashup_catergories: ['Entertaiment'],
	if1:null,
	if2:null,
	oldHash:null,
	postCreate: function(){
		this.if1.id = 'if1';
		this.if1.height = this.height-30;
		this.if1.width = this.width-10;
		this.if1.src='http://www.ctrip.com';
		
		this.if1.parentElement.parentElement.onresize=function(){
			document.getElementById('if1').height = document.getElementById('if1').parentElement.parentElement.innerHeight-30;
			document.getElementById('if1').width = document.getElementById('if1').parentElement.parentElement.innerWidth-10;
			}
		if11 = document.getElementById('if1');

		var mythis = this;
		this.if1.onload = function(){
			mythis.HomeCity(mythis);
			mythis.ParseFlight(mythis);
		};
		
	
	//	window.setTimeout(this.HomeCity,6000,this);	
	
	},
	ParseFlight:function(mythis){
		
	},
	HomeCity:function(mythis){
		//console.log('in afterpc');
		var	if11 = document.getElementById('if1');
	//	console.log(if11);
		var fun1 = function(ifa,ifb){
			var homecityname = this.document.getElementById('homecity_name');
		//	console.log('this');
		//	console.log('homecity::'+homecityname);
			homecityname.onblur = function(even){	
 	 		//	console.log(even);
			//	console.log(this);
			//	console.log(window);
			//	console.log(document);
			//	console.log('ifa='+ifa);
				var ifbb = this.ownerDocument.getElementById('crossDomain');
				var ifbSrc = ifbb.src.toString();	
				var i = 0; 
				while (i<ifbSrc.length&&ifbSrc.charAt(i)!='#') i++;
				var ifbHash = ifbSrc.slice(i+1);	
				var ifbHost = ifbSrc.slice(0,i); 
				ifbb.src = ifbHost+'#'+even.target.value;			
				console.log('IF2 getHash'+even.target.value);		
			};
		
		};
		this.if2 = setIframeCrossDomain(fun1,if11);
		//console.log(this.if2);
		this.if2.id = 'crossDomain';
		this.if2.src = 'http://localhost/';
		this.if2.hidden = true;
		var id=	window.setInterval(mythis.HomeCityListener,4000,mythis);
		console.log('setIntervalOK!'+id);

		
	},
	HomeCityListener:function(mythis){
	//	alert("listen!!!\n");
		var ifbSrc = mythis.if2.src.toString();
		var i = 0;
		//console.log(' if2 '+mythis.if2.src.toString());
		//console.log(mythis.MarkerHomeCity);
		while (i<ifbSrc.length&&ifbSrc.charAt(i)!='#') i++;
		var ifbHash = ifbSrc.slice(i+1);
		var ifbHost = ifbSrc.slice(0,i);     
	 //	if (!(this.oldHash==ifbHash)&&!(this.oldHash==''))
		{ 
			mythis.oldHash = ifbHash; 
			console.log(mythis.oldHash);
			mythis.MarkerHomeCity(mythis.oldHash);
		}
	},
	MarkerHomeCity: function(/* String */location) {
	},
		
	}

);

imashup.core.componentTypeManager.registerComponentType({
    impl_name : 'imashup.components.widgets.Ctrip',
    interface: {
        properties: {},
        methods: {},
        events: {
	"MarkerHomeCity" : { Function: "MarkerHomeCity", CustomMethod: "/* arguments[0]: String */" },
		}
    },
    mixin_types : ['window']
});

dojo.provide('imashup.core.Configure');

dojo.require('imashup.core.ConfigureItem');

// imashup.core.Configure
dojo.declare("imashup.core.Configure", null, {
    configureItems : [],
	constructor : function() {
		//this.channels = {};
	}
})

imashup.core.configure = new imashup.core.Configure();

//配置imashup.components.widgets.GobangBoard存取方式
configureItem = new imashup.core.ConfigureItem();
configureItem.typeName = "imashup.components.widgets.GobangBoard";
configureItem.typeState = "private";
configureItem.typeLocation = "local";

imashup.core.configure.configureItems.push(configureItem);
/*
configureItem1 = new imashup.core.ConfigureItem();
configureItem1.typeName = "imashup.components.widgets.Doc";
configureItem1.typeState = "public";
configureItem1.typeLocation = "remote";

imashup.core.configure.configureItems.push(configureItem1);

configureItem2 = new imashup.core.ConfigureItem();
configureItem2.typeName = "imashup.components.widgets.Draft";
configureItem2.typeState = "private";
configureItem2.typeLocation = "local";

imashup.core.configure.configureItems.push(configureItem2);
*/

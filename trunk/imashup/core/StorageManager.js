dojo.provide('imashup.core.StorageManager');

dojo.require('imashup.core.LocalStorage');
dojo.require('imashup.core.RemoteStorage');

// imashup.core.StorageManager
dojo.declare("imashup.core.StorageManager", null, {
    configure:null,
	constructor : function() {
        //从Local Storage读取config
        var localStorage =  new imashup.core.LocalStorage();
        var configureInLocal = localStorage.findAll("imashup.core.Configure");

        if(configureInLocal!=undefined && configureInLocal !=null && configureInLocal.length > 0){
            this.configure = configureInLocal[0];
        }else{  
            //从config直接得到config
            this.configure = imashup.core.configure;
        }
    },
    
    getClassName: function(objClass){
        if(objClass.declaredClass!=undefined && objClass.declaredClass!=null){
            return objClass.declaredClass;
        }
        if (objClass && objClass.constructor) {
            var strFun = objClass.constructor.toString();
            var className = strFun.substr(0, strFun.indexOf('('));
            className = className.replace('function', '');
            return className.replace(/(^\s*)|(\s*$)/ig, '');
        }
        return typeof(objClass);
    },
    
    getConfig:function(obj){
        var configureItems = this.configure.configureItems;

        var length = configureItems.length;
        //alert(length);
        //get obj type
        var typeName = this.getClassName(obj);
        //alert(typeName);
        for(var i = 0; i < length; i++){
            if(configureItems[i].typeName==typeName){
                return configureItems[i];
            }
        }
        return null;
    },
    
    getStorageFromConfig:function(config){
        if(config == null){
            return new imashup.core.LocalStorage();
        }
        if(config.typeLocation == "local"){
            return (new imashup.core.LocalStorage());
        }else{
            return (new imashup.core.RemoteStorage());
        }
    },

    getStorage: function(obj){
        var configureItems = this.configure.configureItems;
        
        var length = configureItems.length;
        //get obj type
        var typeName = this.getClassName(obj);
        for(var i = 0; i < length; i++){
            if(configureItems[i].typeName==typeName){
                if(configureItems[i].typeLocation == "local"){
                    return (new imashup.core.LocalStorage());
                }else{
                    return (new imashup.core.RemoteStorage());
                }
            }
        }
        //没有找到，默认local
        //return new imashup.core.LocalStorage();
    }
})

//imashup.core.StorageManager = new imashup.core.StorageManager();

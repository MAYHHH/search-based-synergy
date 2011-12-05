dojo.provide('imashup.core.RemoteStorage')


dojo.declare("imashup.core.RemoteStorage", null, {
    constructor: function(insManager){
        //this.componentTypeManager = componentTypeManager;
        this.instanceManager = insManager;
    },
    
    result: null,

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

    sendRequest: function(/* String */url, /*String Array*/params) {
        var self = this;
        //var url = 'http://ajax.googleapis.com/ajax/services/search'
        if (imashup.configs && imashup.configs.proxy) 
            url = imashup.configs.proxy[url] ? imashup.configs.proxy[url] : url; 
        var jsonArgs = {
            url: url,
            content: params,
            sync: true,
            load: function(response, ioArgs) {
                //Set the data from the search into the viewbox in nicely formatted JSON
                //self.searchResult = dojo.fromJson(response);
                //self.displayResult();
                //alert(response);
                self.result = response;
            },
            error: function(response, ioArgs) {
                console.log("An unexpected error occurred");
            }
        }
        dojo.xhrGet(jsonArgs);
    },

    save: function(obj){
    	//获取类名
	    var type = this.getClassName(obj);

        //userid
        var userId = 1;

        //获取id,远程调用
        var id = this.getId(type);
        //生成key
        //var key = type + "$" + id;
        //添加设置id
        obj.id = id;
        //将对象属性值转化为JSON格式
        var value = this.getJSONString(obj);
        //存储
	    /**window.localStorage.setItem(key, value);**/

        var url = 'http://127.0.0.1:8080/RemoteStorage/servlet/doSave';
        var params = {
            userId:userId,
            type:type,
            id:id,
            value:value 
        }
        this.sendRequest(url,params);

    },

    remove: function(obj){
	    //获取类名
	    var type = this.getClassName(obj);
        /**判断是否有id*/
        if(obj.id != undefined && obj.id != null){
            var id = obj.id;
            //生成key
            //var key = type + "$" + id;
            //window.localStorage.removeItem(key);
            
            //删除
            var userId = 1;
            var url = 'http://127.0.0.1:8080/RemoteStorage/servlet/doRemove';
            var params = {
                userId:userId,
                type:type,
                id:id
            }
            this.sendRequest(url,params);    
        }else{
            throw new Error("obj has not persisten");
        }
    },

    update: function(obj){
        //获取类名
        var type = this.getClassName(obj);
        //获取id
        ///**判断是否有id*/
        if(obj.id != undefined && obj.id != null){
            var id = obj.id;
            //生成key
            var key = type + "$" + id;
            //将对象属性值转化为JSON格式
            var value = this.getJSONString(obj);
            /**window.localStorage.setItem(key, value);**/
            var userId = 1;
            var url = '';
            var params = {
                userId:userId,
                type:type,
                id:id,
                value:value
            }
            this.sendRequest(url,params);
        }else{
            throw new Error("obj has not persisten");
        }
    },

    get: function(type, id){
        /***var key = type + "$" + id;**/
        //返回对象

        /**var obj = this.getObject(type,window.localStorage.getItem(key));**/
        var url = 'http://127.0.0.1:8080/RemoteStorage/servlet/doFind';
        var userId = 1;
        var params = {
            userId:userId,
            type:type,
            id:id
        }
        this.sendRequest(url,params);
        var value = this.result;
        var obj = this.getObject(type,value);
        //var obj = eval(evalString);
        if(obj == null){
            throw new Error("obj not exsist in local storage");
        }else{
            return obj;
        }
    },
        
    getObject: function(type,JSONString){
        //alert(JSONString);
        var obj = eval("(" + JSONString + ")");

        var type_obj = eval("(" + "new " + type + "()" + ")");

        //Array
        if(type == "Array"){
            var length = obj.length;
            for(var i = 0; i < obj.length; i++){
                if(typeof (obj[i]) == "object"){
                    //alert("here");
                    //not array
                    if(!(Object.prototype.toString.apply(obj[i]) === '[object Array]')){
                        var typeInner_id = obj[i].objectId;
                        var typeInner = typeInner_id.split("$")[0];
                        var id = typeInner_id.split("$")[1];
                        /**var JSONStringInner = window.localStorage.getItem(typeInner_id);**/
                        var userId = 1;
                        var url = 'http://127.0.0.1:8080/RemoteStorage/servlet/doFind';
                        var params = {
                            userId:userId,
                            type:typeInner,
                            id:id
                        }
                        var JSONStringInner = this.result;
                        //alert("InArray_Object:" + i + ":" + obj[i]);
                        eval("(" + "type_obj[" + i + "]" + "= this.getObject(typeInner,JSONStringInner)"+")");
                    }else{
                        //alert("InArray_Array:" + i + ":" + obj[i]);
                        eval("(" + "type_obj[" + i + "]" + "= this.getObject(\"Array\",this.getJSONString1(obj[i]))"+")");
                    }
                }           
                else{
                    //alert("InArray_simple" + i + ":" + obj[i]);
                    eval("(" + "type_obj[" + i + "]" + "= obj[i]" + ")");
                }
            }
            //alert(this.getJSONString(type_obj));
            return type_obj;
        } 
        for (var key in obj){
            var value = obj[key];
            if(typeof value == "object"){
                //alert("here");
                //not array
                if(!(Object.prototype.toString.apply(value) === '[object Array]')){
                    //alert("Object:" + key + ":" + value); 
                    var typeInner_id = value.objectId;
                    var typeInner = typeInner_id.split("$")[0];
                    var id = typeInner_id.split("$")[1];
                    
                    /**var JSONStringInner = window.localStorage.getItem(typeInner_id);**/
                    var userId = 1;
                    var url = 'http://127.0.0.1:8080/RemoteStorage/servlet/doFind';
                    var params = {
                        userId:userId,
                        type:typeInner,
                        id:id
                    }
                    var JSONStringInner = this.result;
                    
                    eval("(" + "type_obj." + key + "= this.getObject(typeInner,JSONStringInner)"+")");
                }else{
                    //alert("Array:" + key + ":" + value);
                    eval("(" + "type_obj." + key + "= this.getObject(\"Array\",this.getJSONString1(value))"+")");
                }
            }
            else{
                //alert("simple:" + key + ":" + value);
                eval("(" + "type_obj." + key + "= value" + ")");
            }
        }
        //alert(this.getJSONString(type_obj));
        return type_obj;
    },

    findAll: function(type)
    {
        var result = [];
        
        var url = 'http://127.0.0.1:8080/RemoteStorage/servlet/doFindAll';
        var userId = 1;
        var params = {
            userId:userId,
            type:type
        }
        this.sendRequest(url,params);
        var responseText = this.result;
        //alert("findAll");
        /*
        //遍历storage
        for (var i = 0; i < window.localStorage.length; i++) {
            var key =  window.localStorage.key(i);
            var currentType = key.split("$")[0];
            //alert("currentType:" + currentType);
            if(currentType == type){
                var obj = this.getObject(type,window.localStorage.getItem(key));
                result.push(obj);
            }
        }*/
        if(responseText!=""){
            //split "\n"
            var values = responseText.split("#");
            //alert(values.length);
            for (var i = 0; i < values.length; i++){
                //alert(values[i]);
                values[i] = values[i].replace(/\n/g,'\\n');
                var obj = this.getObject(type,values[i]);
                result.push(obj);
            }
        }
        return result;
    },

    removeAll: function(type){
       //alert("type:"+type);
       var keys = [];
       //遍历storage
       //alert(window.localStorage.length);
       for (var i = 0; i < window.localStorage.length; i++) {
           var key =  window.localStorage.key(i);
           var currentType = key.split("$")[0];
           //alert("currentType:" + currentType);
           if(currentType == type){
               //alert("remove" + i);
               //window.localStorage.removeItem(key);
               keys.push(key);
           }
       }
       for (var i = 0; i < keys.length; i++){
           window.localStorage.removeItem(keys[i]);
       }
    },

    getJSONString: function(object){
        var parts = [];
        var is_list = (Object.prototype.toString.apply(object) === '[object Array]');

        for (var key in object) {
            var value = object[key];
            if (typeof value == "object") {
                //parts.push(getJSONString(value));
                //not array
                if(!(Object.prototype.toString.apply(value) === '[object Array]')){
                    if(value.id == undefined || value.id == null){
                        //alert("new obj here");
                        this.save(value);
                    }
                    else{
                        this.update(value);
                    }
                    var type = this.getClassName(value);
                    key = key.replace(/"/,'\"');
                    var objString = "";
                    if(isNaN(key)){
                        objString = '\"' + key + '\":';
                    }                   
                    //var objString = '\"' + key + '\":';
                    objString += '{' + '\"objectId\":' + '\"' + type + '$' + value.id + '\"' + '}';
                    parts.push(objString);
                }else{          //array
                    //var arrayString = '\"' + key + '\":';
                    var arrayString = "";
                    if(isNaN(key)){
                        arrayString = '\"' + key + '\":';
                    }
                    arrayString = arrayString + this.getJSONString(value);
                    parts.push(arrayString); 
                }
            }
            else 
                if (typeof value == "function") {
                    //function是否保存
                    //value = value.toString().replace(/(\n[\s|\t]*\r*\n)/g, '').replace(/\n|\r|(\r\n)/g, '').replace(/\s{2,}/, '').replace(/"/, '\"');
                    //parts.push('\"' + value + '\"');
                }
                else {
                    var str = "";
                    if (!is_list) {
                        key = key.replace(/"/, '\"');
                        str = '\"' + key + '\":';
                    }

                    //Custom handling for multiple data types
                    if (typeof value == "number") {//Numbers
                        str += value;
                    }
                    else 
                        if (value === false) {//The booleans false
                            str += 'false';
                        }
                        else 
                            if (value === true) {//The booleans true
                                str += 'true';
                            }
                            else {//string
                                value = value.replace(/"/, '\"');
                                
                                value = value.replace(/\n/g,'\\n');
                                value = value.replace(/\r/g,'\\r');
                                value = value.replace(/\t/g,'\\t');
                                str += '\"' + value + '\"';
                            }

                    parts.push(str);
                }
        }
        var json = parts.join(",");
        if (is_list) 
            return '[' + json + ']';//array
        return '{' + json + '}';//object
    },
    
    getJSONString1: function(object){
        var parts = [];
        var is_list = (Object.prototype.toString.apply(object) === '[object Array]');

        for (var key in object) {
            var value = object[key];
            if (typeof value == "object") {
                //parts.push(getJSONString(value));
                //not array
                if(!(Object.prototype.toString.apply(value) === '[object Array]')){
                    if(value.id == undefined || value.id == null){
                        //alert("new obj here");
                        //this.save(value);
                    }
                    else{
                        //this.update(value);
                    }
                    var type = this.getClassName(value);
                    if(type == "Object"){
                        var objString = '{' + '\"objectId":' + '\"' + value.objectId + '\"' + '}';
                        parts.push(objString);
                    }else{
                        key = key.replace(/"/,'\"');
                        var objString = "";
                        if(isNaN(key)){
                            objString = '\"' + key + '\":';
                        }
                        //var objString = '\"' + key + '\":';
                        objString += '{' + '\"objectId\":' + '\"' + type + '$' + value.id + '\"' + '}';
                        parts.push(objString);
                    }
                }else{          //array
                    //var arrayString = '\"' + key + '\":';
                    var arrayString = "";
                    if(isNaN(key)){
                        arrayString = '\"' + key + '\":';
                    }
                    arrayString = arrayString + this.getJSONString(value);
                    parts.push(arrayString); 
                }
            }
            else 
                if (typeof value == "function") {
                    //function是否保存
                    //value = value.toString().replace(/(\n[\s|\t]*\r*\n)/g, '').replace(/\n|\r|(\r\n)/g, '').replace(/\s{2,}/, '').replace(/"/, '\"');
                    //parts.push('\"' + value + '\"');
                }
                else {
                    var str = "";
                    if (!is_list) {
                        key = key.replace(/"/, '\"');
                        str = '\"' + key + '\":';
                    }

                    //Custom handling for multiple data types
                    if (typeof value == "number") {//Numbers
                        str += value;
                    }
                    else 
                        if (value === false) {//The booleans false
                            str += 'false';
                        }
                        else 
                            if (value === true) {//The booleans true
                                str += 'true';
                            }
                            else {//string
                                value = value.replace(/"/, '\"');
                                /*
                                value = value.replace(/\n/,'\\n');
                                value = value.replace(/\r/,'\\r');
                                value = value.replace(/\t/,'\\t');
                                */
                                str += '\"' + value + '\"';
                            }

                    parts.push(str);
                }
        }
        var json = parts.join(",");
        if (is_list) 
            return '[' + json + ']';//array
        return '{' + json + '}';//object
    },
   
    getId: function(type){
        //计算id
        var url = 'http://127.0.0.1:8080/RemoteStorage/servlet/doGetTypeId';
        var userId = 1;
        var params = {
            userId:userId,
            type:type
        }
        this.sendRequest(url,params);
        return this.result*1;
    }        
});



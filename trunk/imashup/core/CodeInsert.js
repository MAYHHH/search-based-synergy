dojo.provide('imashup.core.CodeInsert');

dojo.require('imashup.core.CodeInsertItem');

// imashup.core.Configure
dojo.declare("imashup.core.CodeInsert", null, {
    codeInsertItems: [],
    constructor: function () {
        //this.channels = {};
    },
    insertAll: function () {
        var i = 0;
        // alert("in insertAll\n");
        var j = this.codeInsertItems.length;
        // alert("length=" + j);
        while (i < this.codeInsertItems.length) {
            this.insertItem(this.codeInsertItems[i]);
            i++;
        }
    }
    ,
    insertItem: function (ciItem) {
        // alert("in insertItem!!\n");
        // alert(ciItem.className + ".prototype." + ciItem.functionName + ".toString();");
        var functionString = eval(ciItem.className + ".prototype." + ciItem.functionName + ".toString();");
        var newFunName = '_' + ciItem.functionName;
        var judge = eval(ciItem.className + ".prototype." + newFunName.toString());
        //if (judge) alert("def\n");        else alert("udef\n");
        while (judge) { newFunName = '_' + newFunName; judge = eval(ciItem.className + ".prototype." + newFunName.toString()); }
        //alert(newFunName);
        eval(ciItem.className + ".prototype." + newFunName + "=" + functionString + ";");
        //alert(eval(ciItem.className + ".prototype." + newFunName.toString()));
        //  var functionString = imashup.components.widgets.Gobang.prototype.onSave.toString();
        // alert(functionString);
        // alert("in insertItem1!!\n");
        //  alert("in insertItem2!!\n");
        var midFunString = "this." + newFunName + ".apply(this,arguments);"
        if (ciItem.insertPos.charAt(0) == 'a') {
            functionString = "function(){" + midFunString + ciItem.insertCode + "}";

        } else {
            functionString = "function(){" + ciItem.insertCode + midFunString + "}";
        }
        // alert(functionString);
        eval(ciItem.className + ".prototype." + ciItem.functionName + " = " + functionString + ";");

        var functionString2 = eval(ciItem.className + ".prototype." + ciItem.functionName + ".toString();");
     //   alert(functionString2);
    }
})
dojo.require('imashup.components.codeinsertinit');


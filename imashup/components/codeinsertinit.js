dojo.provide("imashup.components.codeinsertinit");
imashup.core.codeInsert = new imashup.core.CodeInsert();
//≈‰÷√imashup.components.widgets.GobangBoard¥Ê»°∑Ω Ω
gobangSave = new imashup.core.CodeInsertItem();
gobangSave.className = "imashup.components.widgets.Gobang";
gobangSave.insertPos = "before";
gobangSave.functionName = "onSave";
gobangSave.insertCode = "var storageManager = new imashup.core.StorageManager(); \n  var storage = storageManager.getStorage(this.gBoard);  \nstorage.save(this.gBoard);";
imashup.core.codeInsert.codeInsertItems.push(gobangSave);

gobangLoad = new imashup.core.CodeInsertItem();
gobangLoad.className = "imashup.components.widgets.Gobang";
gobangLoad.insertPos = "after";
gobangLoad.functionName = "onLoad";
gobangLoad.insertCode = "var storageManager = new imashup.core.StorageManager();\n var storage = storageManager.getStorage(this.gBoard);\n this.gBoard = storage.findAll(\"imashup.components.widgets.GobangBoard\")[0];\n this.synchBoard(this.gBoard.array);";
imashup.core.codeInsert.codeInsertItems.push(gobangLoad);

imashup.core.codeInsert.insertAll();
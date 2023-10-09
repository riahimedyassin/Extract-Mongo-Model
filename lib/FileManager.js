const convert = require("convert-excel-to-json");

class FileManager {
    sourcePath = "";
    constructor(sourcePath) {
      this.sourcePath = sourcePath;
    }
    getColumnsNames(feuille,type=false) {
      if (this.sourcePath == null) return null;
      const json = convert({
        sourceFile: this.sourcePath,
        header: {
          rows: 0,
        },
        range: "A1:L1",
      });
      if(type) {
        
        return [...Object.keys(json[feuille][0])]
      }
      return [...Object.values(json[feuille][0])];
    }
    getColumnsTypes(feuille) {
      const regex = /^\s*\d+(\s*\d+)*\s*$/ig
      if (this.sourcePath == null) return null;
      const identifyType = convert({
        sourceFile: this.sourcePath,
        header: {
          rows: 1,
        },
        range: "A2:L2",
      });
      const Cols = this.getColumnsNames("Feuille 1",true); 
      const local_keys = [...Object.keys(identifyType[feuille][0])]
      const res = Cols.map((value) => {
        if(local_keys.indexOf(value)==-1) return "String"
        return  !isNaN(value) ? "Number" : "String";
      });
      return res ; 
    }
    getFileName() {
      const path = require("path");
      return path.basename(this.sourcePath).split(".")[0];
    }
    formatFileName(file) {
      return file.split(" ").join("")
    }
    async setFile(file, dist, columns, types) {
      const fs = require('fs/promises');
      const fileName = this.formatFileName(file)
      const finalFile = `${process.env.DIST}/${fileName}.model.js`;
      await fs.appendFile(
          finalFile,
        `const mongoose=require('mongoose') \nconst ${fileName}Schema = mongoose.Schema({`,
        { flag: "a" }
      );
      const template = "name : {type:checktype}";
      columns.forEach((column, index) => {
        const tempTemplate = String(template);
        fs.appendFile(
          finalFile,
          `${tempTemplate
            .replace("name", column)
            .replace("checktype", types[index])}, \n`,
          {
            flag: "a",
          }
        );
      });
      await fs.appendFile(
          finalFile,
          `}) \nmodule.exports=mongoose.model("${fileName}",${fileName}Schema)`,
          { flag: "a" }
        );
        return true ; 
    }
  }

  module.exports={FileManager}

  
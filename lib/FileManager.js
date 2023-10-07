const convert = require("convert-excel-to-json");


class FileManager {
    sourcePath = "";
    constructor(sourcePath) {
      this.sourcePath = sourcePath;
    }
    getColumnsNames(feuille) {
      if (this.sourcePath == null) return null;
      const json = convert({
        sourceFile: this.sourcePath,
        header: {
          rows: 0,
        },
        range: "A1:L1",
      });
      return [...Object.values(json[feuille][0])];
    }
    getColumnsTypes(feuille) {
      const regex = /^[0-9]+ [0-9]$/gi;
      if (this.sourcePath == null) return null;
      const identifyType = convert({
        sourceFile: this.sourcePath,
        header: {
          rows: 1,
        },
        range: "A2:L2",
      });
      return [...Object.values(identifyType[feuille][0])].map((value) => {
        return regex.test(value) ? "number" : "string";
      });
    }
    getFileName() {
      const path = require("path");
      return path.basename(this.sourcePath).split(".")[0];
    }
    formatFileName(file) {
      return file.split(" ").join("")
    }
    setFile(file, dist, columns, types) {
      const fs = require('fs-extra');
      const fileName = this.formatFileName(file)
      const finalFile = `${__dirname}/${dist}/${fileName}.model.js`
      fs.appendFile(
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
      fs.appendFile(
          finalFile,
          `}) \nmodule.exports=mongoose.model("${fileName}",${fileName}Schema)`,
          { flag: "a" }
        );
    }
  }

  module.exports={FileManager}
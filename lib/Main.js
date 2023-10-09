const  { FileManager } = require('./FileManager');

class Main extends FileManager {
    constructor(sourcePath) {
      super(sourcePath);
    }
    test() {
      const path = require('path')
      const fs = require('fs')
      console.log(path.extname(this.sourcePath))
      const extension = this.sourcePath.split(".")[1]
      if(!this.sourcePath) {
        throw new Error("Source Path should be provided")
      }
      if(extension!="xls" && extension!="xlsx" ) {
          throw new Error("Only Excel file supported")
      }
      if(!fs.existsSync(this.sourcePath)) {
          throw new Error("File does not exist")
      }
    }
    excute() {
          this.test()
          const data = this.getColumnsNames("Feuille 1");
          const types = this.getColumnsTypes("Feuille 1");
          const fileName = this.getFileName() ;
          if(this.setFile(fileName,"dist",data,types)) {
            console.log("Done !")
          }
    }
  }

  module.exports={Main}
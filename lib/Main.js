import { FileManager } from "./FileManager";

class Main extends FileManager {
  constructor(sourcePath) {
    super(sourcePath);
  }
  test() {
    const path = require("path");
    const fs = require("fs");
    const extension = this.sourcePath.split(".")[1];
    if (extension != "xlsx" || extension != "xlsx") {
      throw new Error("Only Excel file supported");
    }
    if (!fs.existsSync(this.sourcePath)) {
      throw new Error("File does not exist");
    }
  }
  excute() {
    this.test();
    const data = this.getColumnsNames("Feuille 1");
    const types = this.getColumnsTypes("Feuille 1");
    const fileName = this.getFileName();
    this.setFile(fileName, "dist", data, types);
  }
}

module.exports = { Main };

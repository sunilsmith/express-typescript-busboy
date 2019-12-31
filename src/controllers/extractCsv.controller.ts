const csv = require('csv-parser');

export class ExtractCSV {
  static async extractCsv(file: any) {
    console.log("inside extractor..");
    const results: any[] = [];
    await file
      .pipe(csv())
      .on('data', (fileData: any) => results.push(fileData))
      .on('end', () => {
        console.log('//////////////////////////////////////////////////////////////');
      });
    
  }
}
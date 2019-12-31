import { Router } from 'express';
import { ExtractCSV } from './controllers';
import { fileSize } from './config'
const Busboy = require('busboy');

class Handler {
  public router: Router;
  constructor() {
    this.router = this.getRoute();
  }
  private getRoute(): Router {
    const router = Router();
    router.post('/upload', function (req, res) {
      var busboy = new Busboy({ headers: req.headers, limits: { fileSize: parseInt(fileSize) } });
      let sizeFlag:boolean = false;
      busboy.on('file', async function (_fieldname: string, file: { on: (arg0: string, arg1: (data: { length: number; }) => void) => void }, _filename: string) {
        file.on('limit', function(){
          console.log('inside file limit')
          sizeFlag = true;
        });
        file.on('data', function(){
          console.log('reached file end');
          if(!sizeFlag)
          {
            ExtractCSV.extractCsv(file);
          }
        })
      });
      busboy.on('finish', function () {
        if(sizeFlag)
        {
          res.writeHead(400);
          res.end("Invalid File Size or format!");
        }
        else{
          res.writeHead(200);
          res.end("Upload in progress!");
        } 
      });
      return req.pipe(busboy);
    });
    return router;
  }
}

export const handler = new Handler();

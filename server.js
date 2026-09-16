import http from 'node:http';
import {readFile} from 'node:fs/promises';
const files={'/':'index.html','/index.html':'index.html','/src/app.js':'src/app.js','/src/engine.js':'src/engine.js','/src/style.css':'src/style.css'};
const types={html:'text/html',js:'text/javascript',css:'text/css'};
const port=Number(process.env.PORT)||3000;
http.createServer(async(req,res)=>{
  const path=new URL(req.url,'http://localhost').pathname;
  if(!files[path]){res.writeHead(404);res.end('Not found');return;}
  try{const body=await readFile(new URL(files[path],import.meta.url));res.writeHead(200,{'Content-Type':`${types[files[path].split('.').pop()]}; charset=utf-8`});res.end(body);}catch{res.writeHead(500);res.end('Unable to load game');}
}).listen(port,process.env.HOST || '127.0.0.1',()=>console.log(`Sly Devil is ready on port ${port}`));

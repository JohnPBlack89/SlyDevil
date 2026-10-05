import http from 'node:http';
import { readFile } from 'node:fs/promises';

// Only these URLs can be served. Both home-page URLs load the same HTML file.
const files = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/src/app.js': 'src/app.js',
  '/src/engine.js': 'src/engine.js',
  '/src/style.css': 'src/style.css',
};

// Tell the browser how to interpret each kind of file.
const contentTypes = {
  html: 'text/html',
  js: 'text/javascript',
  css: 'text/css',
};

// Environment variables can override the local development defaults.
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '127.0.0.1';

const server = http.createServer(async (request, response) => {
  // Extract the URL path, ignoring query parameters such as ?version=1.
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const filePath = files[pathname];

  if (!filePath) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  try {
    // Resolve the file relative to this script, regardless of where Node starts.
    const fileUrl = new URL(filePath, import.meta.url);
    const body = await readFile(fileUrl);
    const extension = filePath.split('.').pop();
    const contentType = contentTypes[extension];

    response.writeHead(200, {
      'Content-Type': `${contentType}; charset=utf-8`,
    });
    response.end(body);
  } catch {
    // A known URL still fails if its file is missing or cannot be read.
    response.writeHead(500);
    response.end('Unable to load game');
  }
});

server.listen(port, host, () => {
  console.log(`Sly Devil is ready on port ${port}`);
});

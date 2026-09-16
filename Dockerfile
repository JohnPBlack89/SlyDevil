FROM node:22-alpine AS tested
WORKDIR /app
COPY package.json ./
COPY src/engine.js src/engine.test.js ./src/
RUN node --test src/engine.test.js

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
COPY --from=tested --chown=node:node /app/package.json ./
COPY --from=tested --chown=node:node /app/src/engine.js ./src/
COPY --chown=node:node server.js index.html ./
COPY --chown=node:node src/app.js src/style.css ./src/
USER node
EXPOSE 3000
CMD ["node", "server.js"]

# Compile and test with development dependencies; ship only runtime files.
FROM node:22-alpine AS tested
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json server.ts ./
COPY src/*.ts ./src/
RUN npm test

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
COPY --from=tested --chown=node:node /app/package.json ./
COPY --from=tested --chown=node:node /app/dist/server.js ./dist/server.js
COPY --from=tested --chown=node:node /app/dist/src/app.js /app/dist/src/engine.js ./dist/src/
COPY --chown=node:node index.html ./
COPY --chown=node:node src/style.css ./src/
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]

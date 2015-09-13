FROM nodesource/jessie:0.12.7
ADD package.json package.json
RUN npm install
ADD . .
CMD ["node","server.js"]
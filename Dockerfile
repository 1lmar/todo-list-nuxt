FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=build /app/.output ./.output
ENV NITRO_PORT=3000
CMD ["node", ".output/server/index.mjs"]

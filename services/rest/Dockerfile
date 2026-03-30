FROM node:22-bookworm-slim

WORKDIR /app

# Install dependencies without running lifecycle scripts (the project prepare script runs DB migrations).
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Generate Prisma client for the runtime image.
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npx prisma generate

# Application source.
COPY tsconfig.json ./
COPY src ./src

EXPOSE 3000

CMD ["npm", "start"]

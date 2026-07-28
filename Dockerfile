# Stage 1: Build the workspace application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY server/package*.json ./server/
COPY apps/website/package*.json ./apps/website/
COPY apps/super-admin/package*.json ./apps/super-admin/
COPY apps/school-admin/package*.json ./apps/school-admin/
COPY apps/parent-app/package*.json ./apps/parent-app/
COPY apps/driver-app/package*.json ./apps/driver-app/

RUN npm install --frozen-lockfile
COPY . .
RUN npm run build --workspaces --if-present

# Stage 2: Production service launcher
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000 3001 3002 3003 5000
CMD ["npm", "run", "start"]

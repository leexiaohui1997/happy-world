
# 后端Dockerfile
# 使用Node.js 20.19.5作为基础镜像
FROM node:20.19.5-alpine AS base

# 设置工作目录
WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/backend/tsconfig.json ./apps/backend/
COPY apps/backend/tsconfig.build.json ./apps/backend/
COPY apps/backend/nest-cli.json ./apps/backend/

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY apps/backend/src ./apps/backend/src

# 复制.env文件
COPY apps/backend/.env ./apps/backend/

# 构建应用
RUN  cd apps/backend && pnpm run build

# 生产阶段
FROM node:20.19.5-alpine AS production

# 设置工作目录
WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

# 只安装生产依赖
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

# 从构建阶段复制构建结果
COPY --from=base /app/apps/backend/dist ./apps/backend/dist

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production

# 启动命令
CMD ["pnpm", "run", "start:prod"]

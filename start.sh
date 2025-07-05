#!/bin/bash

export APOS_EXTERNAL_FRONT_KEY="hansen-website-key"

# 确保杀死所有可能占用端口的进程
echo "清理占用端口的进程..."
pkill -f "node" || true
sleep 1

# 启动后端（在后台）
echo "启动后端..."
cd backend
APOS_EXTERNAL_FRONT_KEY="hansen-website-key" npm run dev &
BACKEND_PID=$!
cd ..

# 等待后端启动
echo "等待后端启动..."
sleep 10

# 启动前端
echo "启动前端..."
cd frontend
APOS_EXTERNAL_FRONT_KEY="hansen-website-key" npm run dev


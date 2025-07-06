#!/bin/bash

# 设置颜色
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== 启动杨瀚森官方网站开发环境 ===${NC}"

# 检查并关闭占用端口的进程
check_and_kill_port() {
  local port=$1
  local pid=$(lsof -ti:$port)
  if [ -n "$pid" ]; then
    echo -e "${BLUE}端口 $port 被进程 $pid 占用，尝试关闭...${NC}"
    kill -9 $pid
    sleep 1
  fi
}

# 检查并关闭3000和4321端口
check_and_kill_port 3000
check_and_kill_port 4321

# 检查MongoDB是否运行
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${BLUE}MongoDB未运行，尝试启动...${NC}"
    mongod --config /usr/local/etc/mongod.conf --fork
    sleep 2
    if ! pgrep -x "mongod" > /dev/null; then
        echo -e "${RED}MongoDB启动失败，请手动启动MongoDB后再试${NC}"
        exit 1
    fi
    echo "MongoDB已启动"
fi

# 保存当前目录
CURRENT_DIR=$(pwd)

# 启动后端服务
echo -e "${BLUE}启动ApostropheCMS后端服务...${NC}"
cd "${CURRENT_DIR}/backend" && npm run dev &
BACKEND_PID=$!

# 等待后端服务启动
echo "等待后端服务启动..."
sleep 5

# 启动前端服务
echo -e "${BLUE}启动Astro前端服务...${NC}"
cd "${CURRENT_DIR}/frontend" && npm run dev &
FRONTEND_PID=$!

# 显示服务信息
echo -e "${GREEN}=== 服务已启动 ===${NC}"
echo "后端服务: http://localhost:3000"
echo "前端服务: http://localhost:4321"
echo "CMS管理界面: http://localhost:3000/apos/login"
echo -e "${GREEN}=== 按Ctrl+C停止所有服务 ===${NC}"

# 等待用户中断
trap "kill $BACKEND_PID $FRONTEND_PID; echo -e '${GREEN}已停止所有服务${NC}'; exit" INT
wait 
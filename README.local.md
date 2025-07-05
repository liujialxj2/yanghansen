# 项目启动指南

## 环境准备
- Node.js v18或更高版本
- MongoDB v6.0或更高版本

## 快速启动
1. 确保MongoDB服务已启动
2. 执行启动脚本：`./start.sh`
3. 访问前端：http://localhost:4321
4. 访问后端管理界面：http://localhost:3000/login (用户名:admin，密码:admin)

## 项目结构
- `backend/`: ApostropheCMS后端
- `frontend/`: Astro前端
- `start.sh`: 统一启动脚本

## 常见问题
- 如遇端口占用问题，请先运行`pkill -f node`清理进程
- 环境变量问题请检查`.env`文件配置
- API连接问题请确保APOS_EXTERNAL_FRONT_KEY一致

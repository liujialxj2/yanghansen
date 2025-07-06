#!/usr/bin/env node

/**
 * 开发服务器管理脚本 - 解决端口冲突问题
 * 
 * 使用方法:
 * - 启动: node dev-server.js start
 * - 停止: node dev-server.js stop
 * - 重启: node dev-server.js restart
 * - 状态: node dev-server.js status
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');

// 配置
const CONFIG = {
  backend: {
    defaultPort: 3000,
    directory: path.join(__dirname, 'apollo-project/backend/backend'),
    pidFile: path.join(os.tmpdir(), 'hansen-backend.pid'),
    logFile: path.join(os.tmpdir(), 'hansen-backend.log'),
    command: 'node',
    args: ['app.js'],
    env: { APOS_EXTERNAL_FRONT_KEY: 'dev' }
  },
  frontend: {
    defaultPort: 4321,
    directory: path.join(__dirname, 'frontend'),
    pidFile: path.join(os.tmpdir(), 'hansen-frontend.pid'),
    logFile: path.join(os.tmpdir(), 'hansen-frontend.log'),
    command: 'npm',
    args: ['run', 'dev'],
  }
};

// 工具函数
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
}

async function findAvailablePort(startPort) {
  let port = startPort;
  while (!(await isPortAvailable(port))) {
    console.log(`端口 ${port} 已被占用，尝试下一个端口...`);
    port++;
  }
  return port;
}

function savePid(pidFile, pid) {
  fs.writeFileSync(pidFile, String(pid));
}

function readPid(pidFile) {
  try {
    if (fs.existsSync(pidFile)) {
      return Number(fs.readFileSync(pidFile, 'utf8').trim());
    }
  } catch (e) {}
  return null;
}

function isPidRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (e) {
    return false;
  }
}

function killProcess(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 'SIGTERM');
    return true;
  } catch (e) {
    return false;
  }
}

function cleanupResources(config) {
  if (fs.existsSync(config.pidFile)) {
    fs.unlinkSync(config.pidFile);
  }
}

function stopService(name, config) {
  const pid = readPid(config.pidFile);
  if (!pid) {
    console.log(`${name} 服务未运行或PID文件不存在`);
    cleanupResources(config);
    return;
  }

  if (isPidRunning(pid)) {
    console.log(`停止 ${name} 服务 (PID: ${pid})...`);
    killProcess(pid);
    console.log(`${name} 服务已停止`);
  } else {
    console.log(`${name} 服务不在运行状态`);
  }

  cleanupResources(config);
}

async function startService(name, config) {
  // 先检查是否已运行
  const existingPid = readPid(config.pidFile);
  if (existingPid && isPidRunning(existingPid)) {
    console.log(`${name} 服务已在运行中 (PID: ${existingPid})`);
    return;
  }

  // 清理旧资源
  cleanupResources(config);

  // 寻找可用端口
  const port = await findAvailablePort(config.defaultPort);
  
  // 准备环境变量
  const env = { 
    ...process.env, 
    ...config.env,
    PORT: port.toString()
  };

  // 启动服务
  console.log(`启动 ${name} 服务，使用端口 ${port}...`);
  
  // 创建日志文件流
  const logStream = fs.openSync(config.logFile, 'a');
  
  let args = [...config.args];
  if (name === 'frontend') {
    args.push('--', '--port', port.toString());
  }

  const childProcess = spawn(config.command, args, {
    cwd: config.directory,
    env,
    detached: true,
    stdio: ['ignore', logStream, logStream]
  });

  // 保存PID
  savePid(config.pidFile, childProcess.pid);
  childProcess.unref();

  console.log(`${name} 服务已启动 (PID: ${childProcess.pid}, 端口: ${port})`);
  console.log(`日志保存在: ${config.logFile}`);
  
  if (name === 'backend') {
    console.log(`管理界面: http://localhost:${port}/admin`);
    console.log(`用户名: admin, 密码: admin`);
  } else {
    console.log(`前端网站: http://localhost:${port}`);
  }
}

function checkServiceStatus(name, config) {
  const pid = readPid(config.pidFile);
  if (!pid) {
    console.log(`${name} 服务未运行`);
    return false;
  }
  
  const isRunning = isPidRunning(pid);
  if (isRunning) {
    console.log(`${name} 服务正在运行 (PID: ${pid})`);
  } else {
    console.log(`${name} 服务已停止 (旧PID: ${pid})`);
    cleanupResources(config);
  }
  
  return isRunning;
}

async function restart(serviceName) {
  const config = CONFIG[serviceName];
  if (!config) return;
  
  stopService(serviceName, config);
  
  // 等待进程彻底终止
  console.log('等待进程彻底终止...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await startService(serviceName, config);
}

// 主函数
async function main() {
  const command = process.argv[2] || 'start';
  
  switch(command) {
    case 'start':
      // 先启动后端
      await startService('backend', CONFIG.backend);
      // 然后启动前端
      await startService('frontend', CONFIG.frontend);
      console.log('\n全部服务已启动！\n');
      break;
      
    case 'stop':
      // 停止所有服务
      stopService('backend', CONFIG.backend);
      stopService('frontend', CONFIG.frontend);
      console.log('\n全部服务已停止\n');
      break;
      
    case 'restart':
      // 重启所有服务
      await restart('backend');
      await restart('frontend');
      console.log('\n全部服务已重启\n');
      break;
      
    case 'status':
      // 检查服务状态
      checkServiceStatus('backend', CONFIG.backend);
      checkServiceStatus('frontend', CONFIG.frontend);
      break;
      
    default:
      console.log(`
用法: node dev-server.js [命令]

命令:
  start    启动前端和后端服务
  stop     停止所有服务
  restart  重启所有服务
  status   检查服务状态
      `);
  }
}

// 启动程序
main().catch(err => {
  console.error('发生错误:', err);
  process.exit(1);
}); 
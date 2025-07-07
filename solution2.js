const { execSync, spawn } = require('child_process');

console.log('方案二：更稳健的启动方式');

// 1. 首先确保清理所有现有的Node进程
try {
  console.log('清理可能存在的Node进程...');
  try {
    execSync('pkill -f node');
    console.log('已终止现有Node进程');
  } catch (e) {
    console.log('没有发现需要清理的Node进程');
  }
  
  // 等待进程完全终止
  console.log('等待2秒确保所有进程已终止...');
  execSync('sleep 2');

  // 2. 启动后端服务
  console.log('启动后端(apollo-project)...');
  console.log('后端使用端口: 3000');
  const backendProcess = spawn('cd', ['apollo-project/backend/backend', '&&', 'APOS_EXTERNAL_FRONT_KEY=dev', 'node', 'app.js'], { 
    stdio: 'inherit',
    shell: true,
    detached: true
  });
  
  console.log('后端服务已启动...');
  console.log('后端管理界面可通过: http://localhost:3000/admin 访问');
  console.log('用户名: admin, 密码: admin');

  // 等待后端完全启动
  console.log('等待5秒确保后端完全启动...');
  execSync('sleep 5');
  
  // 3. 启动前端服务，使用不同端口
  console.log('启动前端服务(原项目)...');
  console.log('前端使用端口: 4322');
  
  // 使用不同的端口启动前端
  const frontendProcess = spawn('cd', ['frontend', '&&', 'npm', 'run', 'dev', '--', '--port', '4322'], {
    stdio: 'inherit',
    shell: true,
    detached: true
  });
  
  console.log('前端服务已启动...');
  console.log('前端网站可通过: http://localhost:4322 访问');
  
  console.log('两个服务都已在后台运行。');
  console.log('如需停止服务，请在终端中运行: pkill -f node');
  
  // 父进程可以退出，子进程会继续在后台运行
  backendProcess.unref();
  frontendProcess.unref();
  
} catch (error) {
  console.error('发生错误:', error.message);
  process.exit(1);
} 
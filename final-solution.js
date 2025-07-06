const { execSync } = require('child_process');

// 使用exec同步执行，避免复杂的进程管理
try {
  // 1. 清理可能的进程
  console.log('清理现有进程...');
  try {
    execSync('pkill -f node', { stdio: 'ignore' });
  } catch (e) {
    // 忽略错误
  }
  
  // 等待进程终止
  execSync('sleep 1', { stdio: 'ignore' });
  
  // 2. 启动后端 - 使用nohup确保在后台运行，不会被终端中断
  console.log('启动后端服务(端口3000)...');
  execSync('cd apollo-project/backend/backend && nohup node app.js > /dev/null 2>&1 &', { 
    stdio: 'ignore'
  });
  
  // 3. 启动前端 - 使用nohup确保在后台运行
  console.log('启动前端服务(端口4322)...');
  execSync('cd frontend && nohup npm run dev -- --port 4322 > /dev/null 2>&1 &', { 
    stdio: 'ignore' 
  });
  
  // 4. 显示服务访问信息
  console.log('\n服务启动成功!');
  console.log('-------------------------------');
  console.log('前端网站: http://localhost:4322');
  console.log('后端管理界面: http://localhost:3000/admin');
  console.log('管理员账户: admin / admin');
  console.log('-------------------------------');
  console.log('如需停止所有服务，请运行: pkill -f node');
  
} catch (error) {
  console.error('启动失败:', error.message);
} 
const { spawn } = require('child_process');

console.log('正在准备启动服务器...');

try {
  console.log('正在启动前后端服务...');
  
  // 使用开发模式启动后端服务
  console.log('启动后端服务（开发模式）...');
  const backendProcess = spawn('cd', ['backend', '&&', 'npm', 'run', 'dev'], { 
    stdio: 'inherit',
    shell: true
  });

  console.log('后端服务正在启动...');
  console.log('后端管理界面可通过: http://localhost:3000/admin 访问');

  // 设置前端进程启动的延迟
  setTimeout(() => {
    // 启动前端服务（开发模式）
    console.log('启动前端服务（开发模式）...');
    const frontendProcess = spawn('cd', ['frontend', '&&', 'npm', 'run', 'dev'], {
      stdio: 'inherit',
      shell: true
    });
    
    console.log('前端服务正在启动...');
    console.log('前端网站可通过: http://localhost:4321 访问');
    
    // 处理进程退出
    process.on('SIGINT', () => {
      console.log('正在关闭所有服务...');
      backendProcess.kill();
      frontendProcess.kill();
      process.exit();
    });
  }, 3000); // 等待3秒后启动前端服务
  
} catch (error) {
  console.error('发生错误:', error);
  process.exit(1);
} 
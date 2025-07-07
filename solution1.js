const { spawn } = require('child_process');
const path = require('path');

console.log('方案一：使用apollo-project的后端 + 原项目的前端...');

// 使用完整项目中的后端和前端
try {
  console.log('启动后端(apollo-project)...');
  const backendProcess = spawn('cd', ['apollo-project/backend/backend', '&&', 'npm', 'run', 'dev'], { 
    stdio: 'inherit',
    shell: true
  });

  console.log('后端服务正在启动...');
  console.log('后端管理界面可通过: http://localhost:3000/admin 访问');
  console.log('用户名: admin, 密码: admin');

  // 设置前端进程启动的延迟
  setTimeout(() => {
    console.log('启动前端(原项目)...');
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
  }, 3000);
  
} catch (error) {
  console.error('发生错误:', error);
  process.exit(1);
} 
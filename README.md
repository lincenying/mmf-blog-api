# mmf-blog-api

安装nodejs, MongoDB, 并启动
```
// 安装依赖
npm install

// 启动 api 服务器
npm run server

添加管理员
http://localhost:3000/admin

管理员添加成功后, 会自动生成 admin.lock 文件锁定, 如果需要继续添加, 请把该文件删除

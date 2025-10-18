// ✅ server.js — Express 后端 for Render 部署
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// 加载环境变量（Render 的 Environment Variables 也会自动注入）
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// ✅ 基本测试路由（Render 用它来检查健康状态）
app.get('/', (req, res) => {
  res.send('✅ Server is running successfully on Render!')
})

// ✅ 示例 POST 路由（比如接收前端数据）
app.post('/api/message', (req, res) => {
  const { name, email, message } = req.body
  console.log(`📩 Received message from ${name} (${email}): ${message}`)
  res.json({ success: true, msg: 'Message received successfully!' })
})

// ✅ 示例 GET 路由（比如前端想获取一些数据）
app.get('/api/data', (req, res) => {
  res.json({
    success: true,
    data: ['Example 1', 'Example 2', 'Example 3'],
  })
})

// ✅ 端口设置（Render 自动提供 PORT 环境变量）
const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// ✅ 示例 API：返回应用状态
app.get('/api/status', (req, res) => {
  res.json({ success: true, message: 'Server running successfully on Render!' })
})

// ✅ 示例 API：返回模拟数据
app.get('/api/data', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Alice', role: 'User' },
      { id: 2, name: 'Bob', role: 'Admin' },
    ],
  })
})

// ✅ 启动服务器
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`)
})

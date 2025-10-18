import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('✅ Server is running successfully on Render!')
})

app.post('/api/message', (req, res) => {
  const { name, email, message } = req.body
  console.log(`📩 Received message from ${name} (${email}): ${message}`)
  res.json({ success: true, msg: 'Message received successfully!' })
})

app.get('/api/data', (req, res) => {
  res.json({
    success: true,
    data: ['Example 1', 'Example 2', 'Example 3'],
  })
})

const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5174' })) // 只允许前端端口
app.use(bodyParser.json())

// 发送邮件接口
app.post('/send-email', async (req, res) => {
  const { to, subject, text, attachmentBase64, attachmentName } = req.body

  try {
    // 调用 Sender.net API
    const response = await fetch('https://api.sender.net/v2/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDER_API_TOKEN}`,
      },
      body: JSON.stringify({
        from: 'your_verified_email@yourdomain.com',
        to: [{ email: to }],
        subject,
        text,
        attachments: [
          {
            name: attachmentName,
            content: attachmentBase64,
          },
        ],
      }),
    })
    const data = await response.json()
    console.log('Email sent successfully:', data)
    res.json({ message: 'Email sent successfully', data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to send email', error: err.message })
  }
})

// 不要用 app.options('*', ...)，直接用 cors() 中间件
// 全局404
app.use((req, res) => {
  res.status(404).send('Not Found')
})

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000')
})

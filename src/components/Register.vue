<template>
  <div class="d-flex justify-content-center align-items-center vh-100 login-bg">
    <div class="card shadow-lg p-4 text-dark login-card">
      <h2 class="text-center mb-4 text-gradient">Women's Health</h2>
      <form @submit.prevent="register">
        <!-- Username -->
        <div class="mb-3">
          <label class="form-label fw-bold">Username</label>
          <input
            type="text"
            v-model="username"
            class="form-control form-control-lg"
            placeholder="Enter your username"
            required
          />
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label class="form-label fw-bold">Email</label>
          <input
            type="email"
            v-model="email"
            class="form-control form-control-lg"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label class="form-label fw-bold">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control form-control-lg"
            placeholder="Enter your password (min 6 chars)"
            required
            minlength="6"
          />
          <small class="form-text text-muted">
            It is recommended to include uppercase letters, numbers, or special characters to
            enhance password strength.
          </small>
        </div>

        <!-- Role -->
        <div class="mb-3">
          <label class="form-label fw-bold">Role</label>
          <select v-model="role" class="form-control form-control-lg" required>
            <option disabled value="">Select role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <!-- Register Button -->
        <button type="submit" class="btn btn-login w-100 mt-3">Register</button>
      </form>

      <!-- Link to Login -->
      <p class="text-center mt-3">
        Already have an account?
        <a href="#" class="register-link" @click.prevent="$emit('go-login')">Login</a>
      </p>
    </div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import emailjs from '@emailjs/browser'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      role: '',
    }
  },
  methods: {
    async register() {
      if (!this.username || !this.email || !this.password || !this.role) {
        alert('Please fill in all fields.')
        return
      }

      try {
        // 创建 Firebase 用户
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password)
        const user = userCredential.user

        // 更新 displayName
        await updateProfile(user, { displayName: this.username })
        localStorage.setItem('userRole', this.role)

        // --- 调用 EmailJS 发送注册欢迎邮件 ---
        const templateParams = {
          email: this.email, // 收件人邮箱
          from_name: "Women's Health", // 发件人名称
          message: `Hi ${this.username}, welcome to Women's Health! Your role: ${this.role}`,
        }

        await emailjs.send(
          'service_ajg5x9c', // Service ID
          'template_6f4w7r9', // Template ID
          templateParams,
          'vUUGPr0zPRJiPJEWQ', // Public Key
        )

        alert(`User ${this.username} registered successfully as ${this.role}! Welcome email sent.`)

        // 重置表单
        this.username = ''
        this.email = ''
        this.password = ''
        this.role = ''

        this.$emit('go-login')
      } catch (error) {
        alert(error.message)
        console.error(error)
      }
    },
  },
}
</script>

<style scoped>
.login-bg {
  background: linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb);
}
.login-card {
  width: 90%;
  max-width: 380px;
  border-radius: 20px;
  background: #fff;
}
.text-gradient {
  background: linear-gradient(45deg, #ff6f91, #ff9671, #ffc75f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}
.btn-login {
  background: linear-gradient(45deg, #ff6f91, #ff9671, #ffc75f);
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 12px;
  border-radius: 30px;
  transition: 0.3s;
}
.btn-login:hover {
  opacity: 0.85;
}
.register-link {
  color: #ff6f91;
  font-weight: 600;
  text-decoration: none;
}
.register-link:hover {
  text-decoration: underline;
}
</style>

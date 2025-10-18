<template>
  <div class="d-flex justify-content-center align-items-center vh-100 login-bg">
    <div class="card shadow-lg p-4 text-dark login-card">
      <h2 class="text-center mb-4 text-gradient">Women's Health</h2>
      <form @submit.prevent="register">
        <!-- Username -->
        <div class="mb-3">
          <label for="username" class="form-label fw-bold">Username</label>
          <input
            id="username"
            type="text"
            v-model="username"
            class="form-control form-control-lg"
            placeholder="Enter your username"
            aria-required="true"
            required
            @keyup.enter="register"
          />
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label fw-bold">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="form-control form-control-lg"
            placeholder="Enter your email"
            aria-required="true"
            required
            @keyup.enter="register"
          />
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label for="password" class="form-label fw-bold">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="form-control form-control-lg"
            placeholder="Enter your password (min 6 chars)"
            aria-required="true"
            required
            minlength="6"
            @keyup.enter="register"
          />
          <small class="form-text text-muted">
            Include uppercase letters, numbers, or special characters to enhance password strength.
          </small>
        </div>

        <!-- Role -->
        <div class="mb-3">
          <label for="role" class="form-label fw-bold">Role</label>
          <select
            id="role"
            v-model="role"
            class="form-control form-control-lg"
            aria-required="true"
            required
          >
            <option disabled value="">Select role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <!-- Register Button -->
        <button type="submit" class="btn btn-login w-100 mt-3" aria-label="Register account">
          Register
        </button>
      </form>

      <!-- Screen reader live region for alerts -->
      <div v-if="statusMessage" role="alert" aria-live="assertive" class="sr-only">
        {{ statusMessage }}
      </div>

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
      statusMessage: '', // 用于屏幕阅读器提示
    }
  },
  methods: {
    async register() {
      this.statusMessage = '' // 清空提示
      if (!this.username || !this.email || !this.password || !this.role) {
        this.statusMessage = 'Please fill in all fields.'
        return
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password)
        const user = userCredential.user

        await updateProfile(user, { displayName: this.username })
        localStorage.setItem('userRole', this.role)

        const templateParams = {
          email: this.email,
          from_name: "Women's Health",
          message: `Hi ${this.username}, welcome! Your role: ${this.role}`,
        }

        await emailjs.send(
          'service_ajg5x9c',
          'template_6f4w7r9',
          templateParams,
          'vUUGPr0zPRJiPJEWQ',
        )

        this.statusMessage = `User ${this.username} registered successfully as ${this.role}! Welcome email sent.`

        // Reset form
        this.username = ''
        this.email = ''
        this.password = ''
        this.role = ''

        // 自动跳转到登录
        this.$emit('go-login')
      } catch (error) {
        this.statusMessage = error.message
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
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

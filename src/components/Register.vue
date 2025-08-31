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
            placeholder="Enter your password"
            required
            minlength="6"
          />
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
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    register() {
      if (!this.username || !this.email || !this.password) {
        alert('Please fill in all fields.')
        return
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]')

      if (users.find((u) => u.email === this.email)) {
        alert('This email is already registered.')
        return
      }

      users.push({ username: this.username, email: this.email, password: this.password })
      localStorage.setItem('users', JSON.stringify(users))

      alert(`User ${this.username} registered successfully!`)
      this.username = ''
      this.email = ''
      this.password = ''
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

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 login-bg">
    <div class="card shadow-lg p-4 text-dark login-card">
      <h2 class="text-center mb-4 text-gradient">Women’s Health</h2>
      <p class="text-center text-muted mb-4">Login to access your personal health space</p>

      <form @submit.prevent="login">
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

        <!-- Login Button -->
        <button type="submit" class="btn btn-login w-100 mt-3">Login</button>
      </form>

      <!-- Link to Register -->
      <p class="text-center mt-3">
        Don’t have an account?
        <a href="#" class="register-link" @click.prevent="$emit('go-register')">Sign Up</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      if (this.email === '' || this.password === '') {
        alert('Please fill in all fields.')
        return
      }
      alert(`Welcome back, ${this.email}!`)
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
  width: 380px;
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

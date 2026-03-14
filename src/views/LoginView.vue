<script setup lang="ts">
import SignInForm from '@/components/LoginForm.vue'
import { Mail, Lock } from 'lucide-vue-next'
import router from '@/router'
import { useAuthStore } from '@/stores/Auth'
import { storeToRefs } from 'pinia'
import { notify } from '@/services/alert'

const authStore = useAuthStore()
const { email, password } = storeToRefs(authStore)
const { signIn } = authStore

const handleSignIn = async () => {
  const success = await signIn()
  if (success) {
    router.push('/')
  } else {
    notify('Error', 'Email or Password inccorect', 'destructive', 20000)
  }
}
</script>

<template>
  <div class="form-container">
    <SignInForm title="Log in">
      <div class="form-group">
        <label for="email">EMAIL ADDRESS</label>
        <div class="input-wrapper">
          <Mail :size="18" class="input-icon" />
          <input
            type="email"
            placeholder="you@example.com"
            id="email"
            v-model="email"
            autocomplete="email"
          />
          <div class="input-accent"></div>
        </div>
      </div>

      <div class="form-group">
        <label for="password">PASSWORD</label>
        <div class="input-wrapper">
          <Lock :size="18" class="input-icon" />
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            v-model="password"
            autocomplete="current-password"
          />
          <div class="input-accent"></div>
        </div>
      </div>

      <div class="form-group">
        <button type="button" class="submit" @click="handleSignIn">Login</button>
      </div>

      <div class="login">
        <p>Don't have an account? <span @click="router.push('signup')">Register</span></p>
      </div>
    </SignInForm>
  </div>
</template>

<style scoped>
.form-container {
  height: 100vh;
  background: url('@/assets/images/chill-it-background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group > label {
  color: var(--black);
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: 2px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1rem 1.125rem;
  border: 1.5px solid var(--black);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.input-wrapper:focus-within {
  border-color: #4ecdc4;
}

.input-icon {
  color: var(--black);
  flex-shrink: 0;
  transition: color 0.3s ease;
}

.input-wrapper:focus-within .input-icon {
  color: #4ecdc4;
}

.input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
  color: #2c3e50;
}

.input-wrapper input::placeholder {
  color: var(--black);
}

.input-accent {
  position: absolute;
  bottom: -1.5px;
  left: 0;
  height: 3px;
  width: 0;
  background: linear-gradient(90deg, #4ecdc4, #44a3d5);
  border-radius: 0 0 8px 8px;
  transition: width 0.4s ease;
}

.input-wrapper:focus-within .input-accent {
  width: 100%;
}

.submit {
  padding: 0.5rem 1.25rem;
  border-radius: 10px;
  color: var(--black);
  position: relative;
  border: 1.5px solid var(--black);
  font-weight: 800;
  text-transform: uppercase;
}

.login span {
  color: var(--black);
  cursor: pointer;
  text-decoration: underline;
  font-weight: 700;
}
</style>

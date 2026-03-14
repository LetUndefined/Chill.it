<script setup lang="ts">
import SignInForm from '@/components/LoginForm.vue'
import { Mail, Lock, ArrowBigLeftDash } from 'lucide-vue-next'
import router from '@/router'
import { useAuthStore } from '@/stores/Auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { signUp } = authStore
const { email, password, confirmedPassword } = storeToRefs(authStore)

const handleSignUp = async () => {
  const success = await signUp()
  if (success) router.push('/login')
}
</script>

<template>
  <div class="form-container">
    <SignInForm title="Sign Up">
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
            autocomplete="new-password"
          />
          <div class="input-accent"></div>
        </div>
      </div>

      <div class="form-group">
        <label for="confirm-password">CONFIRM PASSWORD</label>
        <div class="input-wrapper">
          <Lock :size="18" class="input-icon" />
          <input
            type="password"
            placeholder="Confirm your password"
            id="confirm-password"
            v-model="confirmedPassword"
            autocomplete="new-password"
          />
          <div class="input-accent"></div>
        </div>
      </div>

      <div class="form-button">
        <button type="button" class="return" @click="router.go(-1)">
          <ArrowBigLeftDash color="var(--black)" class="arrow" />
          <span>Back</span>
        </button>
        <button type="button" @click="handleSignUp" class="submit">Sign up</button>
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

.form-button {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
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
}
.icon {
  opacity: 0.8;
}

.login span {
  color: var(--black);
  cursor: pointer;
}

.arrow {
  animation: moveLeft 2s infinite;
  opacity: 0.8;
}

.return {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: var(--black);
  gap: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  font-weight: 800;
  border: 1.5px solid var(--black);
}

.return span {
  color: var(--black);
  font-weight: 800;
}

@keyframes moveLeft {
  0%,
  100% {
    transform: translateX(10px);
  }
  50% {
    transform: translateX(0px);
  }
}
</style>

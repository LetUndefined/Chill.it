<script setup lang="ts">
import SignInForm from '@/components/LoginForm.vue'
import { CircleUserRound, KeyRound, ArrowBigLeftDash } from 'lucide-vue-next'
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
        <label for="email">Email</label>
        <div class="input-wrapper">
          <CircleUserRound color="var(--white)" class="icon" />
          <input type="email" placeholder="Email" id="email" v-model="email" autocomplete="email" />
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-wrapper">
          <KeyRound color="var(--white)" class="icon" />
          <input
            type="password"
            placeholder="Password"
            id="password"
            v-model="password"
            autocomplete="new-password"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="password">Confirm Password</label>
        <div class="input-wrapper">
          <KeyRound color="var(--white)" class="icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            id="password"
            v-model="confirmedPassword"
            autocomplete="new-password"
          />
        </div>
      </div>

      <div class="form-button">
        <div class="return" @click="router.go(-1)">
          <ArrowBigLeftDash color="var(--white)" class="arrow" />
          <span>Back</span>
        </div>
        <button type="button" @click="handleSignUp" class="submit">Submit</button>
      </div>
    </SignInForm>
  </div>
</template>

<style scoped>
.form-container {
  height: 100vh;
  background: url('@/assets/images/nature-background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-button {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 1.5rem;
}

.form-group label {
  color: var(--white);
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0px 2px 2px var(--white);
  padding: 5px 10px;
  border-radius: 20px;
}

.input-wrapper:focus-within {
  box-shadow: 0px 2px 2px var(--primary-color);
}

.input-wrapper input,
.input-wrapper input::placeholder {
  outline: none;
  color: var(--white);
}

.submit {
  box-shadow: 0px 2px 2px var(--white);
  padding: 0.25rem 1rem;
  border-radius: 10px;
  color: var(--white);
  position: relative;
}
.icon {
  opacity: 0.8;
}

.login span {
  color: var(--white);
  cursor: pointer;
}

.arrow {
  animation: moveLeft 2s infinite;
  opacity: 0.8;
}

.return {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 2px var(--white);
  padding: 0.25rem 1rem 0.25rem 0.5rem;
  border-radius: 10px;
  color: var(--white);
  gap: 1rem;
  cursor: pointer;
}

.return span {
  color: var(--white);
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

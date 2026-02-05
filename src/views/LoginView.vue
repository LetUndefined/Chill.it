<script setup lang="ts">
import SignInForm from '@/components/LoginForm.vue'
import { CircleUserRound, KeyRound } from 'lucide-vue-next'
import router from '@/router'
</script>

<template>
  <div class="form-container">
    <SignInForm title="Log in">
      <div class="form-group">
        <label for="email">Email</label>
        <div class="input-wrapper">
          <CircleUserRound color="var(--white)" class="icon" />
          <input type="email" placeholder="Email" id="email" />
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-wrapper">
          <KeyRound color="var(--white)" class="icon" />
          <input type="password" placeholder="Password" id="password" />
        </div>
      </div>

      <div class="form-group">
        <button type="button" class="submit">Submit</button>
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

.input-wrapper input,
.input-wrapper input::placeholder {
  outline: none;
  color: var(--white);
}

.submit {
  box-shadow: 0px 2px 2px var(--white);
  padding: 0.25rem 1rem;
  border-radius: 10px;
  color: var(--background-color);
  color: var(--white);
  position: relative;
}
.icon {
  opacity: 0.8;
}

.login span {
  color: var(--white);
  cursor: pointer;
  text-decoration: underline;
  font-weight: 700;
}

.input-wrapper:focus-within {
  box-shadow: 0px 2px 2px var(--primary-color);
}
</style>

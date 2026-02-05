<script setup lang="ts">
import { CircleUserRound, KeyRound } from 'lucide-vue-next'
</script>

<template>
  <form class="form-container">
    <div class="form-content">
      <h2>Log in</h2>
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

      <div class="signup">
        <p>Don't have an account? <span>Register</span></p>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 320px;
  min-height: 22rem;
  padding: 1rem;
  border-radius: 20px;
  backdrop-filter: blur(15px);
  gap: 2rem;
}

.form-content h2 {
  font-weight: 900;
  color: var(--white);
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
  border: 1px solid var(--white);
  padding: 5px 10px;
  border-radius: 20px;
}

.input-wrapper input {
  outline: none;
  color: var(--white);
}

.submit {
  box-shadow: 0px 2px 2px var(--white);
  padding: 0.25rem 1rem;
  border-radius: 10px;
  color: var(--background-color);
  color: var(--white);
}
.icon {
  opacity: 0.8;
}
</style>

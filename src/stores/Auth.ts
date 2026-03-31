import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { supabase } from './supaBase'
import { notify } from '@/services/alert'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const email: Ref<string> = ref('')
  const password: Ref<string> = ref('')
  const confirmedPassword: Ref<string> = ref('')
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  async function signUp() {
    if (!regex.test(password.value)) {
      return notify('Error', 'Password does not meet requirements', 3000)
    }

    if (password.value !== confirmedPassword.value) {
      return notify('Error', 'Incorrect Password', 3000)
    }
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })
    if (error) {
      console.error(`Failed signing up: ${error}`)
      return false
    }

    return (notify('Success', 'Account created!', 3000), router.push('/login'))
  }

  async function signIn() {
    if (!email.value || !password.value) {
      return notify('Error', 'Incorrect credentials', 3000)
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) {
      console.error(`Failed signing in: ${error}`)

      return false
    }
    return true
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
      alert(`Logout failed: ${error}`)
    }
  }

  return { signUp, signIn, signOut, email, password, confirmedPassword }
})

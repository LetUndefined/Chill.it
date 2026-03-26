import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { supabase } from './supaBase'
import { notify } from '@/services/alert'

export const useAuthStore = defineStore('auth', () => {
  const email: Ref<string> = ref('')
  const password: Ref<string> = ref('')
  const confirmedPassword: Ref<string> = ref('')

  async function signUp() {
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
    return true
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

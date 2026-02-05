import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { supabase } from './supaBase'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const email: Ref<string> = ref('')
  const password: Ref<string> = ref('')
  const confirmedPassword: Ref<string> = ref('')

  async function signUp() {
    if (password.value !== confirmedPassword.value) return alert('Incorrect password')
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })
    if (error) {
      console.error(`Failed signing up: ${error}`)
      alert(`Error: ${error}`)
      return false
    }
    return true
  }

  async function signIn() {
    if (!email.value || !password.value) return false
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) {
      console.error(`Failed signing in: ${error}`)
      alert(`Error: ${error}`)
      return false
    }
    return true
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if(error){
      console.error(error)
      alert(`Logout failed: ${error}`)
    }
  }

  return { signUp, signIn, signOut, email, password, confirmedPassword }
})

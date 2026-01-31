import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const useSupaStore = defineStore('supaStore', () => {
  const resetValues = {
    title: '',
    chill_level: 0,
    description: '',
    visiting: '',
    vibe: '',
    accessibility: '',
  }
  const formData = ref({
    title: '',
    chill_level: 0,
    description: '',
    visiting: '',
    vibe: '',
    accessibility: '',
  })

  const photoFile: Ref<File | null> = ref(null)
  const photoPreview = ref('')

  async function insertData() {
    let imageUrl = ''

    if (photoFile.value) {
      const fileName = `public/${Date.now()}-${photoFile.value.name}`

      const { error: uploadError } = await supabase.storage
        .from('chill-spots-images')
        .upload(fileName, photoFile.value)

      if (uploadError) {
        console.error('Upload failed:', uploadError)
        return
      }

      const { data } = supabase.storage.from('chill-spots-images').getPublicUrl(fileName)

      imageUrl = data.publicUrl
    }

    const { error: insertError } = await supabase.from('chill_spots').insert({
      ...formData.value,
      image_url: imageUrl,
    })

    if (insertError) {
      console.error('Insert failed:', insertError)
    }
  }

  return { formData, insertData, photoFile, photoPreview, resetValues }
})

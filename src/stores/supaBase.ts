import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { type SupabaseTable, type Latlng } from '@/models/interface'
import { notify } from '@/services/alert'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const useSupaStore = defineStore('supaStore', () => {
  const latLng: Ref<Latlng> = ref({
    lat: 0,
    lng: 0,
  })

  const resetValues = {
    title: '',
    chill_level: 0,
    description: '',
    visiting: '',
    vibe: '',
    accessibility: '',
    handle_approval: false,
    approved: false,
  }
  const formData = ref({
    title: '',
    chill_level: 0,
    description: '',
    visiting: '',
    vibe: '',
    accessibility: '',
    handle_approval: false,
    approved: false,
  })

  const fetchedData: Ref<SupabaseTable[] | null> = ref(null)

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
        notify('Warning', 'Location add failed, unsupported file format', 3000)

        return
      }

      imageUrl = fileName
    }

    const { error: insertError } = await supabase.from('chill_spots').insert({
      ...formData.value,
      image_url: imageUrl,
      latitude: latLng.value.lat,
      longitude: latLng.value.lng,
      user_id: (await supabase.auth.getUser()).data.user?.id,
    })

    console.log('Marker added')

    if (insertError) {
      console.error('Insert failed:', insertError)
      notify('Warning', 'Location add failed', 3000)
    }

    notify('Info', 'Location under review', 3000)
  }

  async function fetchData() {
    const { data, error } = await supabase.from('chill_spots').select().eq('approved', true)

    if (data) {
      fetchedData.value = data.map((e) => {
        const { data: imageData } = supabase.storage
          .from('chill-spots-images')
          .getPublicUrl(e.image_url)

        const setMarker = {
          id: e.id,
          title: e.title,
          chill_level: e.chill_level,
          description: e.description,
          visiting: e.visiting,
          vibe: e.vibe,
          accessibility: e.accessibility,
          image_url: imageData.publicUrl,
          latitude: e.latitude,
          longitude: e.longitude,
          user_id: e.user_id,
          approved: e.approved,
        }
        return setMarker
      })
    }
    if (error) {
      throw error
    }
  }

  async function deleteData(id: string) {
    const { error } = await supabase.from('chill_spots').delete().eq('id', id)
    if (error) {
      console.error('Deleting failed')
    }
    notify('Error', 'Location deleted successfully', 3000)
  }

  return {
    formData,
    insertData,
    photoFile,
    photoPreview,
    resetValues,
    fetchData,
    fetchedData,
    latLng,
    deleteData,
  }
})

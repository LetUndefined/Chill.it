import type { SupabaseTable } from '@/models/interface'
import { supabase } from '@/stores/supaBase'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const isAdmin = ref(false)
  const isOwner = ref(false)
  const nonApprovedData: Ref<SupabaseTable[] | null> = ref(null)

  const adminCheck = async (userId: string | null) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      isOwner.value = false
      isAdmin.value = false
      return
    }

    isOwner.value = user.id === userId

    const { data: adminData } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', user.id)

    isAdmin.value = !!adminData && adminData.length > 0
    return
  }

  const fetchNonApproved = async () => {
    const { data, error } = await supabase.from('chill_spots').select().eq('handle_approval', false)

    if (error) {
      throw error
    }

    if (data) {
      nonApprovedData.value = data.map((e) => {
        const { data: imageData } = supabase.storage
          .from('chill-spots-images')
          .getPublicUrl(e.image_url)

        const pendingMarker = {
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
        return pendingMarker
      })
    }
  }

  const handleApproval = async (approval: boolean, id: string) => {
    const { error } = await supabase
      .from('chill_spots')
      .update({ approved: approval, handle_approval: true })
      .eq('id', id)

    if (error) {
      throw error
    }

    fetchNonApproved()
  }

  return {
    isAdmin,
    isOwner,
    nonApprovedData,
    adminCheck,
    fetchNonApproved,
    handleApproval,
  }
})

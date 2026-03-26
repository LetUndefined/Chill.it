import { beforeEach, describe, expect, test, vi } from 'vitest'

const mockRef = vi.hoisted(() => vi.fn((value) => ({ value })))

vi.mock('vue', () => ({
  ref: mockRef,
}))

describe('ModalTrigger', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should initialize modalTrigger as false', async () => {
    const { modalTrigger } = await import('@/services/ModalTrigger')

    expect(mockRef).toHaveBeenCalledWith(false)
    expect(modalTrigger.value).toBe(false)
  })

  test('should allow changing modalTrigger value', async () => {
    const { modalTrigger } = await import('@/services/ModalTrigger')

    modalTrigger.value = true
    expect(modalTrigger.value).toBe(true)

    modalTrigger.value = false
    expect(modalTrigger.value).toBe(false)
  })
})

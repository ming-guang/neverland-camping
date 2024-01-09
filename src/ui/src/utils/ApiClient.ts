import PocketBase from 'pocketbase'
import type { TypedPocketBase } from '@/utils/PocketbaseTypes'

export const pb: TypedPocketBase = new PocketBase(import.meta.env.VITE_PB_BACKEND_URL)

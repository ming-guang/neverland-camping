/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
  CoachReviews = 'coachReviews',
  Tournament = 'tournament',
  Users = 'users'
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString
  created: IsoDateString
  updated: IsoDateString
  collectionId: string
  collectionName: Collections
  expand?: T
}

export type AuthSystemFields<T = never> = {
  email: string
  emailVisibility: boolean
  username: string
  verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CoachReviewsRecord = {
  coach: RecordIdString
  rating: number
  review: string
  student: RecordIdString
}

export type TournamentRecord = {
  address?: string
  banner?: string
  description: string
  image?: string
  level?: string
  location?: string
  time: IsoDateString
  title: string
  type?: string
}

export enum UsersRoleOptions {
  'STUDENT' = 'STUDENT',
  'COACH' = 'COACH'
}
export type UsersRecord = {
  avatar?: string
  name?: string
  role: UsersRoleOptions
}

// Response types include system fields and match responses from the PocketBase API
export type CoachReviewsResponse<Texpand = unknown> = Required<CoachReviewsRecord> &
  BaseSystemFields<Texpand>
export type TournamentResponse<Texpand = unknown> = Required<TournamentRecord> &
  BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  coachReviews: CoachReviewsRecord
  tournament: TournamentRecord
  users: UsersRecord
}

export type CollectionResponses = {
  coachReviews: CoachReviewsResponse
  tournament: TournamentResponse
  users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: 'coachReviews'): RecordService<CoachReviewsResponse>
  collection(idOrName: 'tournament'): RecordService<TournamentResponse>
  collection(idOrName: 'users'): RecordService<UsersResponse>
}

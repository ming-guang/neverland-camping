<script setup lang="ts">
import { pb } from '@/utils/ApiClient'
import {
  type CoachReviewsRecord,
  type BaseSystemFields,
  type UsersRecord
} from '@/utils/PocketbaseTypes'
const reviewsResponse = await pb
  .collection('coachReviews')
  .getList<CoachReviewsRecord & BaseSystemFields<{ student: UsersRecord }>>(1, 10, {
    expand: 'student'
  })
const reviews = reviewsResponse.items
</script>

<template>
  <div class="grid grid-cols-2 gap-2 max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-10">
    <div v-for="review in reviews" class="h-full bg-gray-100 p-8 rounded" :key="review.id">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="block w-5 h-5 text-gray-400 mb-4"
        viewBox="0 0 975.036 975.036"
      >
        <path
          d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"
        ></path>
      </svg>
      <p class="leading-relaxed mb-6">{{ review.review }}</p>
      <a class="inline-flex items-center">
        <img
          :alt="review.expand!.student.name"
          :src="pb.files.getUrl(review.expand!.student, review.expand!.student.avatar ?? '')"
          class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
        />
        <span class="flex-grow flex flex-col pl-4">
          <span class="title-font font-medium text-gray-900">{{
            review.expand!.student.name
          }}</span>
          <div class="flex">
            <template v-for="i in 5" :key="i">
              <svg
                class="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                v-if="i <= review.rating"
              >
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
              </svg>
              <svg
                class="w-4 h-4 me-1 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                v-else
              >
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
              </svg>
            </template>
          </div>
        </span>
      </a>
    </div>
  </div>
</template>

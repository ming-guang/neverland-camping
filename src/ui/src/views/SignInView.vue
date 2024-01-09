<script setup lang="ts">
import GlobalNavbar from '@/components/GlobalNavbar.vue'
import router from '@/router'
import { pb } from '@/utils/ApiClient'
import { ref } from 'vue'
const showNotice = ref<boolean>(false)
const processing = ref<boolean>(false)
const identifier = ref<string>('')
const password = ref<string>('')
async function doLogin() {
  if (processing.value) {
    return
  }
  processing.value = true
  try {
    await pb.collection('users').authWithPassword(identifier.value, password.value)
    router.push('/')
  } catch (_) {
    showNotice.value = true
  }
  processing.value = false
}
</script>

<script lang="ts">
export default {
  metaInfo: {
    title: 'Sign-in'
  }
}
</script>

<template>
  <main>
    <GlobalNavbar />
    <div class="flex items-center">
      <div class="container mx-auto">
        <div class="max-w-sm mx-auto my-10">
          <div class="text-center">
            <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign in</h1>
            <p class="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
          </div>
          <div class="m-7">
            <form action="">
              <div class="mb-6">
                <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >Email Address / Username</label
                >
                <input
                  type="text"
                  name="identifier"
                  id="identifier"
                  placeholder="you@company.com"
                  v-model="identifier"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div class="mb-6">
                <div class="flex justify-between mb-2">
                  <label for="password" class="text-sm text-gray-600 dark:text-gray-400"
                    >Password</label
                  >
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  v-model="password"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div class="mb-6">
                <button
                  type="button"
                  @click="() => doLogin()"
                  class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <p class="text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?
                <RouterLink
                  to="/sign-up"
                  class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                  >Sign up</RouterLink
                >.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showNotice"
      id="toast-warning"
      class="absolute flex items-center w-full max-w-xs bottom-5 right-2 p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"
          />
        </svg>
        <span class="sr-only">Warning icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">Invalid login credentials.</div>
      <button
        type="button"
        @click="
          () => {
            showNotice = false
          }
        "
        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-warning"
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import GlobalNavbar from '@/components/GlobalNavbar.vue'
import router from '@/router'
import { pb } from '@/utils/ApiClient'
import { ClientResponseError } from 'pocketbase'
import { ref } from 'vue'
const errorNotice = ref<string>('')
const processing = ref<boolean>(false)
const role = ref<string>('STUDENT')
const name = ref<string>('')
const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
async function doLogin() {
  if (processing.value) {
    return
  }
  processing.value = true
  try {
    await pb.collection('users').create({
      username: username.value,
      email: email.value,
      emailVisibility: false,
      password: password.value,
      passwordConfirm: confirmPassword.value,
      name: name.value,
      role: role.value
    })
    router.push('/')
  } catch (err) {
    if (!(err instanceof ClientResponseError)) {
      return
    }
    const data: { [key: string]: { message: string } } = err.data.data
    errorNotice.value = Object.entries(data)
      .map(([key, value]: [string, { message: string }]) => `'${key}' ${value.message}`)
      .join('<br>')
  }
  processing.value = false
}
</script>

<script lang="ts">
export default {
  metaInfo: {
    title: 'Sign-up'
  }
}
</script>

<template>
  <main>
    <GlobalNavbar />
    <div class="flex items-center">
      <div class="container mx-auto">
        <div class="max-w-lg mx-auto my-10">
          <div class="text-center">
            <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign up</h1>
            <p class="text-gray-500 dark:text-gray-400">Create an account for better experience.</p>
          </div>
          <div class="m-7">
            <form action="">
              <div class="mb-6">
                <label for="role" class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >I am a:</label
                >
                <div class="grid grid-cols-2 gap-2">
                  <div
                    class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
                  >
                    <input
                      id="student-role-input"
                      type="radio"
                      :value="'STUDENT'"
                      name="role"
                      v-model="role"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="student-role-input"
                      class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Student</label
                    >
                  </div>
                  <div
                    class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
                  >
                    <input
                      id="coach-role-input"
                      type="radio"
                      :value="'COACH'"
                      name="role"
                      v-model="role"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="coach-role-input"
                      class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Coach</label
                    >
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >Name</label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  v-model="name"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>

              <div class="mb-6">
                <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >Username</label
                >
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="john_doe"
                  v-model="username"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>

              <div class="mb-6">
                <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >Email Address</label
                >
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="you@company.com"
                  v-model="email"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div class="mb-6">
                <div class="grid grid-cols-2 mb-2 gap-2">
                  <div class="justify-between">
                    <label for="password" class="text-sm text-gray-600 dark:text-gray-400"
                      >Password</label
                    >
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      v-model="password"
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>

                  <div class="justify-between">
                    <label for="password" class="text-sm text-gray-600 dark:text-gray-400"
                      >Password</label
                    >
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Your Password"
                      v-model="confirmPassword"
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <button
                  type="button"
                  @click="() => doLogin()"
                  class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Sign up
                </button>
              </div>
              <p class="text-sm text-center text-gray-400">
                Already had an account?
                <RouterLink
                  to="/sign-in"
                  class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                  >Sign in</RouterLink
                >.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="errorNotice != ''"
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
      <div class="ms-3 text-sm font-normal" v-html="errorNotice"></div>
      r
      <button
        type="button"
        @click="
          () => {
            errorNotice = ''
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

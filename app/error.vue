<template>
  <div
    class="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12"
  >
    <div class="wf-ull lg:w-1/2">
      <div class="text-sm font-medium text-blue-500 dark:text-blue-400">
        404 error
      </div>
      <h1
        class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl"
      >
        Page not found
      </h1>
      <div class="mt-4 text-gray-500 dark:text-gray-400">
        Sorry, the page you are looking for doesn't exist.Here are some helpful
        links:
      </div>

      <div class="flex items-center mt-6 gap-x-3">
        <UButton
          variant="ghost"
          color="secondary"
          size="sm"
          icon="i-heroicons-arrow-left-20-solid"
          @click="$router.back()"
        >
          Go back
        </UButton>

        <UButton color="primary" size="sm" to="/"> Take me home </UButton>
      </div>
    </div>

    <div class="relative w-full mt-12 lg:w-1/2 lg:mt-0">
      <img
        class="w-full max-w-lg lg:mx-auto"
        src="https://merakiui.com/images/components/illustration.svg"
        alt="404 illustration"
      />
    </div>
  </div>
</template>

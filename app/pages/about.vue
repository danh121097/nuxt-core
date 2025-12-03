<script lang="ts" setup>
const { t } = useI18n();
</script>
<template>
  <div
    :class="
      cn(
        'w-screen h-screen',
        'flex flex-col justify-center items-center gap-5 p-5',
        'bg-red-400'
      )
    "
  >
    <h1
      class="text-4xl font-bold text-white text-center"
      v-html="t('ABOUT.TITLE')"
    />

    <UButton
      to="/"
      icon="i-lucide-rocket"
      size="md"
      color="primary"
      variant="solid"
      :label="t('ABOUT.GO_TO_HOME')"
    />
  </div>
</template>

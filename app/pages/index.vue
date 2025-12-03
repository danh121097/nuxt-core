<script lang="ts" setup>
const now = useNow();

const { t } = useI18n();
const { locales, locale, changeLocale } = useI18nLocale();
</script>

<template>
  <div
    :class="
      cn(
        'w-screen h-screen',
        'flex flex-col justify-center items-center gap-5 p-5',
        'bg-red-400',
        'relative'
      )
    "
  >
    <div
      :class="
        cn('absolute top-5 right-5', 'flex items-center gap-2 cursor-pointer')
      "
    >
      <div
        v-for="l in locales"
        :key="l.code"
        class=""
        @click="changeLocale(l.code)"
      >
        <span
          :class="
            cn(
              'px-3 py-1 rounded',
              l.code === locale
                ? 'bg-white text-lime-500 font-semibold'
                : 'bg-white/50 text-white'
            )
          "
        >
          {{ l.name }}
        </span>
      </div>
    </div>
    <h1
      class="text-4xl font-bold text-white text-center"
      v-html="t('HOME.TITLE')"
    />

    <UButton
      to="/about"
      icon="i-lucide-rocket"
      size="md"
      color="primary"
      variant="solid"
      :label="t('HOME.GO_TO_ABOUT')"
    />

    <div
      class="text-white text-center"
      v-html="
        t('HOME.CURRENT_TIME', {
          TIME: new Date(now).toLocaleTimeString()
        })
      "
    />
  </div>
</template>

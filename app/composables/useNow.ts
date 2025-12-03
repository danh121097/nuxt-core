export interface UseNowOptions {
  /**
   * Update interval in milliseconds
   * @default 1000
   */
  interval?: number;
  /**
   * Expose more controls
   * @default false
   */
  controls?: boolean;
}

export function useNow(options: UseNowOptions & { controls: true }): {
  now: Ref<number>;
  isActive: Ref<boolean>;
  pause: () => void;
  resume: () => void;
};

export function useNow(options?: UseNowOptions): Ref<number>;

export function useNow(options: UseNowOptions = {}) {
  const { interval = 1000, controls = false } = options;

  let timer: ReturnType<typeof setInterval> | null = null;
  const now = ref(+new Date());
  const isActive = ref(true);

  // Start the timer
  timer = setInterval(update, interval);

  function update(): void {
    now.value = +new Date();
  }

  function pause(): void {
    isActive.value = false;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function resume(): void {
    if (!isActive.value) {
      isActive.value = true;
      update();
      timer = setInterval(update, interval);
    }
  }

  onBeforeUnmount(() => {
    pause();
  });

  if (controls) {
    return {
      now: readonly(now),
      pause,
      resume,
      isActive: readonly(isActive),
    };
  }

  return readonly(now);
}

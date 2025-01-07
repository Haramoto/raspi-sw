<template>
  <div>
    <div class="flex m-2 items-center" v-for="(gpio, index) in state.gpios" :key="index">
      <button class="btn" :class="{'btn-success': gpio.value}" @click="update(gpio.gpio, true)">ON</button>
      <span class="m-2">
        {{ gpio.label }}
      </span>
      <button class="btn" :class="{'btn-error': !gpio.value}" @click="update(gpio.gpio, false)">OFF</button>
    </div>
  </div>
</template>

<script lang="ts" setup>

const state = reactive<{
  gpios: { gpio: number, label: string }[];
}>({
  gpios: [
    {
      gpio: 4,
      label: "P1 gpio04",
      value: false,
    },
    {
      gpio: 22,
      label: "P2 gpio22",
      value: false,
    },
    {
      gpio: 6,
      label: "P3 gpio06",
      value: false,
    },
    {
      gpio: 26,
      label: "P4 gpio26",
      value: false,
    },
  ],
});

const update = async (gpio: number, value: boolean) => {
  console.log(`Update gpio ${gpio} to ${value}`);

  const g = state.gpios.find(g => g.gpio === gpio);
  if(g){
    g.value = value;
  }

  await $fetch(`/api/gpio/${gpio}`, {
    method: 'POST',
    body: { data: value },
  })
}

onMounted(async () => {
  for (const gpio of state.gpios) {
    const res = await $fetch('/api/gpio/' + gpio.gpio);
    console.log(res.data)
    gpio.value = res.data;
  }
});
</script>

import { requestGPIOAccess } from "node-web-gpio";
import { store as gpioStore } from "../../stores/gpio-store.ts"

export default defineEventHandler(async (event) => {
  const gpio = parseInt(event?.context?.params?.gpio || '-1') as number;

  if (gpio === -1) {
    return {
      data: undefined
    }
  }

  return {
    data: gpioStore[gpio] ?? false
  }
})

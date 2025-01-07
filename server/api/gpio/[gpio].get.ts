import { requestGPIOAccess } from "node-web-gpio";

export default defineEventHandler(async (event) => {
  const gpio = parseInt(event?.context?.params?.gpio || '-1') as number;

  if (gpio === -1) {
    return {
      data: undefined
    }
  }

  const gpioAccess = await requestGPIOAccess();
  const port = gpioAccess.ports.get(gpio);
  const io = await port?.read()

  return {
    data: io 
  }
})
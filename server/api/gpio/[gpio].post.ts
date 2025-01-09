import { requestGPIOAccess } from "node-web-gpio";
import { store as gpioStore} from "../../stores/gpio-store.ts"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const gpio = parseInt(event?.context?.params?.gpio || '-1') as number;

  console.log(body)

  if(gpio === -1) {
    return 'Invalid GPIO'
  }

  const gpioAccess = await requestGPIOAccess();
  const port = gpioAccess.ports.get(gpio);
  await port?.export("out");
  await port?.write(body?.data ? 1 : 0)
  gpioStore[gpio] = body?.data ?? false
  return {
    data: body?.data
  }
})

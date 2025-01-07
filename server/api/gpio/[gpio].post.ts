import rgpio from 'rpi-gpio';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const gpio = parseInt(event?.context?.params?.gpio || '-1') as number;

  if(gpio === -1) {
    return 'Invalid GPIO'
  }

  await rgpio.promise.setup(gpio, rgpio.DIR_OUT)
  await rgpio.promise.write(gpio, body?.data || false)

  return {
    data: body?.data
  }
})
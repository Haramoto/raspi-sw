import rgpio from 'rpi-gpio';

export default defineEventHandler(async (event) => {
  const gpio = parseInt(event?.context?.params?.gpio || '-1') as number;

  if (gpio === -1) {
    return {
      data: undefined
    }
  }

  await rgpio.promise.setup(gpio, rgpio.DIR_OUT)
  const io = await rgpio.promise.read(gpio)

  return {
    data: io 
  }
})
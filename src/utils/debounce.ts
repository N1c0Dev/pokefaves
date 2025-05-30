export function debounce (func: any, timeout: number = 300) {
  let timer: ReturnType<typeof setTimeout> | undefined
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args); }, timeout)
  }
}

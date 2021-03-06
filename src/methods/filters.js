// 參考助教的好用方法！
// 價格千位數加逗號
export function currency (num) {
  const n = parseInt(num, 10)
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`
}

// 日期格式
export function date (time) {
  const localDate = new Date(time * 1000)
  return localDate.toLocaleDateString()
}
export function time (time) {
  const localTime = new Date(time * 1000)
  return localTime.toLocaleTimeString()
}

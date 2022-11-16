export const getLocal = (name:string) => {
  return localStorage.getItem(name)
}

export const setLocal = (name:string, value:any) => {
  localStorage.setItem(name, value)
}
// 分割价格
export const computePrice = (price: number, tag: 1 | 2) => {
  let arr = price.toFixed(2).split('.')
  // let arr = (price + '').split('.')
  if (tag === 1) return arr[0]
  else return arr[1]
}
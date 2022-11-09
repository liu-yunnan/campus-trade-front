export const getLocal = (name:string) => {
  return localStorage.getItem(name)
}

export const setLocal = (name:string, value:string) => {
  localStorage.setItem(name, value)
}
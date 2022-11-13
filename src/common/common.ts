export const getLocal = (name:string) => {
  return localStorage.getItem(name)
}

export const setLocal = (name:string, value:any) => {
  localStorage.setItem(name, value)
}
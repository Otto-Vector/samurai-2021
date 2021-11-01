const randMinMax = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const randArrayDiffInt = (max) => (size) => {
  size = Math.min(max+1,size)
  let Rand = () => randMinMax(0,max)
  let array = [Rand()]
   for (let i=1, next = Rand(); i < size; i++, next = Rand()) {
    !array.includes(next) ? array.push(next) : i--
  }
  return array
}

const randMinMax = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const randArrayDiffInt = (max=0) => size => {
  size = Math.min(max+1,size)
  let Rand = () => randMinMax(0,max)
  let array = [], next
  do { next = Rand() } while ( array.includes(next) || array.push(next) < size )
  return array
}

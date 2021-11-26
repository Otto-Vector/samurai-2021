// возвращает случайное целое число в заданном диапазоне
// const randMinMax = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// возвращает массив из необходимого числа элементов needArraySize
// рандомных /НЕ ОДИНАКОВЫХ/ целых чисел (from 0 to realArraySize)
// к которому можно потом "замапится" для перемешивания значений искомого массива, например:
// randomDifferentIntegersArrayCreator(array.length)(from 1 to array.length).map(el=>array[el])
export const randomDifferentIntegersArrayCreator = (realArraySize = 1) =>
  (needArraySize = realArraySize): number[] => {

  let justArray = (a: number, b: number[] = []) => {while (a--) b[a] = a; return b }
  let arrayOfNumbers = justArray(realArraySize),
  nextNumber, buffered, size = realArraySize

  while (size) {
    nextNumber = Math.floor(Math.random() *(--size + 1))
    buffered = arrayOfNumbers[size]
    arrayOfNumbers[size] = arrayOfNumbers[nextNumber]
    arrayOfNumbers[nextNumber] = buffered
  }

  let needToSliced = Math.min(realArraySize, needArraySize)

  return arrayOfNumbers.slice(-needToSliced)
}


export const errorParser = (errorStringArray: string[]): Object => {
  // c сервера приходят ошибки в таком формате
  // errorStringArray = [
  //   "The AboutMe field is required. (AboutMe)",
  //   "Invalid url format (Contacts->Twitter)",
  //   "Invalid url format (Contacts->Youtube)",
  //   "Invalid url format (Contacts->Vk)"
  // ]

  //убираем первую заглавную букву из названий будущих полей переменных
  const unCapitalizeFirstChar = (string: string) => string.charAt(0).toLowerCase() + string.slice(1)
  //удаление последнего символа
  const deleteLastChar = (string: string) => string.slice(0, -1)

  //запускаем редюсер по массиву и возвращаем объект в result
  return errorStringArray.reduce((result, value) => {
      //разделяем строку на сообщение (до скобки) и переменную (после)
      //удаляем последнюю скобку и последний пробел
      const [errorMessage, variablesField] = value.split('(').map(deleteLastChar)
      //если в строке есть стрелочка, то создаём вложенный объект
      if (variablesField.includes('->')) {
        //создаём две переменные в которые передаём строки без первой заглавной
        const [firstLevel, secondLevel] = variablesField.split('->').map(unCapitalizeFirstChar)
        return {
          ...result,
          [firstLevel]: {
        // @ts-ignore
            ...result[firstLevel],
            [secondLevel]: errorMessage
          }
        }
      }
      //иначе просто наименование поля и ошибка
      return {...result, [unCapitalizeFirstChar(variablesField)]: errorMessage}
    }, {} //объявление пустого объекта, как инициализация первого значения result
  )

  // возвращаются в таком формате
  // return {
  //   aboutMe: 'The AboutMe field is required.',
  //   contacts: {
  //     twitter: 'Invalid url format',
  //     youtube: 'Invalid url format',
  //     vk: 'Invalid url format'
  //   }
  // }
}


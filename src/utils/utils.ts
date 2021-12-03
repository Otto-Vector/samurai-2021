// возвращает случайное целое число в заданном диапазоне
// const randMinMax = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// возвращает пронумерованный массив
// arraySize  : количество элементов в массиве (abs(integers) from 1)
// (from = 0) : с какого числа начинается пронумерованный массив (abs(integers) from 0)
export const justNumberedArray = (arraySize: number, from = 0): number[] => {
  let array: number[] = []
  while (arraySize--) array[arraySize] = arraySize + from
  return array
}

// возвращает массив из необходимого числа элементов needArraySize
// рандомных /НЕ ОДИНАКОВЫХ/ целых чисел (from 0 to realArraySize)
// к которому можно потом "замапится" для перемешивания значений искомого массива, например:
// randomDifferentIntegersArrayCreator(array.length)(from 1 to array.length).map(el=>array[el])
export const randomDifferentIntegersArrayCreator = (realArraySize = 1) =>
  (needArraySize = realArraySize): number[] => {
    // создаём пронумерованный массив и переменные
    let arrayOfNumbers = justNumberedArray(realArraySize),
      nextNumber, buffered, size = realArraySize
    // замешиваем перестановками с рандомом
    while (size) {
      nextNumber = Math.floor(Math.random() * (--size + 1))
      buffered = arrayOfNumbers[size]
      arrayOfNumbers[size] = arrayOfNumbers[nextNumber]
      arrayOfNumbers[nextNumber] = buffered
    }
    // определяем необходимое для отрезания количество элементов
    let needToSliced = Math.min(realArraySize, needArraySize)
    // выдаём укороченный массив
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
            ...result[firstLevel as keyof Object],
            [secondLevel]: errorMessage
          }
        }
      }
      //иначе просто наименование поля и ошибка
      return {...result, [unCapitalizeFirstChar(variablesField)]: errorMessage}
    }, {} //объявление пустого объекта, как инициализация первого значения result
  )

  // возвращаем в таком формате
  // return {
  //   aboutMe: 'The AboutMe field is required.',
  //   contacts: {
  //     twitter: 'Invalid url format',
  //     youtube: 'Invalid url format',
  //     vk: 'Invalid url format'
  //   }
  // }
}

const randMinMax = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const randomDifferentIntegersArrayCreator = (max = 0) => (size = 0) => {
  size = Math.min(max + 1, size)
  let Rand = () => randMinMax(0, max)
  let array = [], next
  do {
    next = Rand()
  } while (array.includes(next) || array.push(next) < size)
  return array
}

export const errorParser = errorStringArray => {
  // c сервера приходят ошибки в таком формате
  // errorStringArray = [
  //   "The AboutMe field is required. (AboutMe)",
  //   "Invalid url format (Contacts->Twitter)",
  //   "Invalid url format (Contacts->Youtube)",
  //   "Invalid url format (Contacts->Vk)"
  // ]

  //убираем первую заглавную букву из названий будущих полей переменных
  const unCapitalize = string => string.charAt(0).toLowerCase() + string.slice(1)
  //удаление последнего символа
  const deleteLastChar = string => string.slice(0,-1)

  //запускаем редюсер по массиву и возвращаем объект в result
  return errorStringArray.reduce((result, value) => {
    //разделяем строку на сообщение (до скобки) и переменную (после)
    //удаляем последнюю скобку и последний пробел
    const [errorMessage, variablesField] = value.split('(').map(deleteLastChar)
    //если в строке есть стрелочка, то создаём вложенный объект
    if (variablesField.includes('->')) {
      //создаём две переменные в которые передаём строки без первой заглавной
      const [firstLevel, secondLevel] = variablesField.split('->').map(unCapitalize)
      return {...result,
        [firstLevel]: {
          ...result[firstLevel],
          [secondLevel]: errorMessage
        }
      }
    }
    //иначе просто наименование поля и ошибка
    return {...result, [unCapitalize(variablesField)]: errorMessage}
  },{})

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


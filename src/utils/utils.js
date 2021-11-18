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
  let unCapitalize = string => string.charAt(0).toLowerCase() + string.slice(1)

  //запускаем редюсер по массиву и возвращаем объект в result
  return errorStringArray.reduce((result, value) => {
    //разделяем строку на сообщение (до скобки) и переменную (после)
    let [errorMessage, variablesField] = value.split(' (')
    //удаляем последнюю скобку
    variablesField = variablesField.split(')')[0]
    //если в строке есть стрелочка, то создаём вложенный объект
    if (variablesField.includes('->')) {
      let [firstLevel, secondLevel] = variablesField.split('->')
      firstLevel = unCapitalize(firstLevel); secondLevel = unCapitalize(secondLevel);
      return {...result,
        [firstLevel]: {
          ...result[firstLevel],
          [secondLevel]: errorMessage
        }
      }
    }
    //иначе просто наименование поля и ошибка
    return {...result, [unCapitalize(variablesField)]: errorMessage}
  },
    {}//инициируем пустой объект, как первое значение
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


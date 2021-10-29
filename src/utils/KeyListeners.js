  //считываем alt+Enter(13) для добавления сообщения
  export const onAltEnterKey = (event) => (func) => {
    if (event.keyCode === 13 && event.altKey) { func() }
  }

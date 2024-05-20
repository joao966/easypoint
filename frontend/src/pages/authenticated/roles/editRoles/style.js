export function styleInput(error) {
  const style = {
    '.MuiSelect-select': {
      width: '100% !important',
      display: 'block',
    }
  }
  if (error) style['borderColor'] = "red"
  return style
}

export function divTop() {
  return {
    margin: 2,
    display: 'flex',
    justifyContent: 'center',
    alingItens: 'center',
  }
}

export function card() {
  return {
    margin: 2,
    display: 'flex',
    justifyContent: 'center',
    alingItens: 'center',
  }
}

export function gridRoles() {
  return {
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
    alingItens: 'center',
  }
}

export function options() {
  return {
    padding: 1,
    display: 'flex',
    justifyContent: 'center',
    alingItens: 'center',
    flexDirection: 'column',
    '.checkboxDiv': {
      display: 'flex',
      justifyContent: 'flex-start',
      alingItens: 'center',
    },
    'input': {
      margin: '1px'
    }
  }
}
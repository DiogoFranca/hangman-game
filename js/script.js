const underscore = document.querySelector('.underscore')
const gallows = document.querySelector('.gallows')
const keyboard = document.querySelector('.keyboard')

const dataBase = [
  'Naruto',
  'Bleach',
  'Dororo',
  'Kakegurui',
  'One piece',
  'Hunter X Hunter',
  'The Promised Neverland',
  'Dragon Ball Z',
  'Fullmeta Alchemist',
  'Pokemon',
  'Tokyo Ghoul',
  'Death Note',
  'Boku No Hero Academia',
  'Cavaleiros Do Zodiaco',
  'Naruto Shippuden',
  'Code Geass',
  'Sword Art Online',
  'Fairy Tail',
  'Ataque dos Titas',
  'One Punch Man'
]

Array.prototype.shuffle = function () {
  let index = dataBase.length

  while (index) {
    const indexAleatorio = Math.floor(Math.random() * index--)
    ;[dataBase[index], dataBase[indexAleatorio]] = [
      dataBase[indexAleatorio],
      dataBase[index]
    ]
  }
}

dataBase.shuffle()

const dataBaseImg = {
  error1: 'assets/head.png',
  error2: 'assets/head-body.png',
  error3: 'assets/head-body-armrigth.png',
  error4: 'assets/two-arms.png',
  error5: 'assets/two-arms-one-leg.png',
  error6: 'assets/two-arms-legs.png'
}

let currentWord = dataBase[0]

let arrayWord = transformaEmArray(currentWord)
let underscoreWord = transformaEmUnderscore(arrayWord)
underscore.innerText = mostraUnderscoreNaTela(underscoreWord)

let contador = 0
let nextWord = 0

keyboard.addEventListener('click', e => {
  const elementText = e.target.innerText.toLowerCase()
  const index = arrayWord.indexOf(elementText)

  if (index !== -1) {
    underscoreWord[index] = elementText
    delete arrayWord[index]
    underscore.innerText = mostraUnderscoreNaTela(underscoreWord)
  } else {
    contador++
    showStick(contador)

    if (contador === 6) {
      message('Game Over')
    }

    if (contador > 1 && contador <= 6) {
      const stickImg = gallows.querySelector('.stick')
      stickImg.remove()
    }
  }

  if (isCompleted(underscoreWord)) {
    cleanGallows()
    contador = 0

    currentWord = dataBase[nextWord]

    if (!currentWord) {
      message('Congragulations, you finished the game!')
      return
    }

    setTimeout(() => {
      arrayWord = transformaEmArray(currentWord)
      underscoreWord = transformaEmUnderscore(arrayWord)
      underscore.innerText = mostraUnderscoreNaTela(underscoreWord)
    }, 2000)

    nextWord++
  }
})

function transformaEmArray(currentWord) {
  let arrayWord = currentWord.toLowerCase().split('')
  return arrayWord
}

function transformaEmUnderscore(arrayWord) {
  const underscoreWord = arrayWord.map(valor => {
    if (valor !== ' ') return '_'
    return ' '
  })
  return underscoreWord
}

function mostraUnderscoreNaTela(underscoreWord) {
  const arrayUnderscore = underscoreWord.map((valor, index, array) => {
    if (index === 0) {
      return valor.toUpperCase()
    }

    if (array[index - 1] === ' ') {
      return valor.toUpperCase()
    }

    return valor
  })

  return arrayUnderscore.join('')
}

function createImg() {
  const img = document.createElement('img')
  return img
}

function showStick(contador) {
  const img = createImg()
  const stickImg = dataBaseImg['error' + contador]

  img.setAttribute('src', stickImg)
  img.setAttribute('class', 'stick')

  switch (contador) {
    case 1:
      img.setAttribute('id', 'head')
      break
    case 2:
      img.setAttribute('id', 'head-body')
      break
    case 3:
      img.setAttribute('id', 'head-body-armright')
      break
    case 4:
      img.setAttribute('id', 'two-arms')
      break
    case 5:
      img.setAttribute('id', 'two-arms-one-leg')
      break
    case 6:
      img.setAttribute('id', 'two-arms-legs')
      break
    default:
      console.log('Erro inesperado!')
  }

  gallows.appendChild(img)
}

function isCompleted(array) {
  console.log(array)
  return currentWord.toLowerCase() === array.join('')
}

function cleanGallows() {
  const stick = gallows.querySelectorAll('img').forEach(valor => {
    if (valor.classList.contains('stick')) {
      valor.remove()
    }
  })

  contador = 0
}

function createDiv() {
  const div = document.createElement('div')
  return div
}

/*
  Modal
  - Criar um elemento caixa
  - Escrever os dados dentro da caixa.
  - Jogar na tela.
*/

function message(text) {
  const div = createDiv()
  div.setAttribute('id', 'modal')
  div.innerText = text

  setTimeout(() => {
    document.body.appendChild(div)
  }, 2000)

  setTimeout(() => {
    location.reload()
  }, 5000)
}

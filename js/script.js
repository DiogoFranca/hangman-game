const underscore = document.querySelector('.underscore')
const gallows = document.querySelector('.gallows')
const keyboard = document.querySelector('.keyboard')

const dataBase = ['Melancia', 'Uva']
const dataBaseImg = {
  error1: '../assets/head.png',
  error2: '../assets/head-body.png',
  error3: '../assets/head-body-armrigth.png',
  error4: '../assets/two-arms.png',
  error5: '../assets/two-arms-one-leg.png',
  error6: '../assets/two-arms-legs.png'
}

let currentWord = 'Maça'

let arrayWord = transformaEmArray(currentWord);
let underscoreWord = transformaEmUnderscore(arrayWord);
underscore.innerText = mostraUnderscoreNaTela(underscoreWord);

let contador = 0
let nextWord = 0

keyboard.addEventListener('click', e => {
  const elementText = e.target.innerText.toLowerCase()
  const index = arrayWord.indexOf(elementText)

  if (index !== -1) {
    underscoreWord[index] = elementText
    delete arrayWord[index]
    underscore.innerText = underscoreWord.join(' ')
    console.log(underscoreWord)
  } else {
    contador++
    showStick(contador)

    if(contador === 6) {
      mostraGameOverNaTela();
      location.reload();
    }

    if (contador > 1 && contador <= 6) {
      const stickImg = gallows.querySelector('.stick')
      stickImg.remove()
    }
  }

  if (isCompleted(underscoreWord)) {
    cleanGallows()
    contador = 0;
    currentWord = dataBase[nextWord];

    arrayWord = transformaEmArray(currentWord);
    underscoreWord = transformaEmUnderscore(arrayWord);
    underscore.innerText = mostraUnderscoreNaTela(underscoreWord);

    nextWord++;
  }
})

function transformaEmArray(currentWord) {
  let arrayWord = currentWord.toLowerCase().split('')
  return arrayWord;
}

function transformaEmUnderscore(arrayWord) {
  let underscoreWord = arrayWord.map(() => '_')
  return underscoreWord
}

function mostraUnderscoreNaTela(underscoreWord) {
  return underscoreWord.join(' ');
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
  return currentWord.toLocaleLowerCase() === array.join('')
}

function cleanGallows() {
  const stick = gallows.querySelectorAll('img').forEach(valor => {
    if (valor.classList.contains('stick')) {
      valor.remove()
    }
  })

  contador = 0
}

function mostraGameOverNaTela() {

};
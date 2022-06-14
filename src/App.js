// J'importe useEffect et useState
import { useEffect, useState } from 'react'

// J'importe axios après avoir fais un (npm install axios) dans mon terminal
const axios = require('axios')

function App () {
  // Je crée mon state
  // 1ère variable = l'état, 2ème variable = fonction qui met à jour l'état
  const [quotes, setquotes] = useState()

  // Appel API utilisant async await
  // Lien de la doc async await: https://javascript.info/async-await
  const getQuotesAsyncAwait = async () => {
    try {
      const promiseQuotes = await axios.get(
        'https://simpsons-quotes-api.herokuapp.com/quotes'
      )
      console.log('quotes:', promiseQuotes.data)
      setquotes(promiseQuotes.data)
    } catch (err) {
      console.log(err)
    }
  }

  // Appel API utilisant promise then
  // Lien de la doc promise then: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
  const getQuotesPromiseThen = () => {
    axios
      .get('https://simpsons-quotes-api.herokuapp.com/quotes')
      .then(promiseQuotes => {
        console.log('quotes:', promiseQuotes.data)
        setquotes(promiseQuotes.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Lien de la doc useEffect: https://fr.reactjs.org/docs/hooks-reference.html#useeffect
  // Pourquoi déclarer la fonction getQuotes dans le useEffect ? À lire : https://devtrium.com/posts/async-functions-useeffect

  // useEffect(() => {
  //   const getQuotes = async () => {
  //     const promiseQuotes = await axios.get(
  //       'https://simpsons-quotes-api.herokuapp.com/quotes'
  //     )
  //     console.log('quotes:', promiseQuotes.data)
  //     setquotes(promiseQuotes.data)
  //   }
  //   getQuotes()

  //   // return () => {
  //   //   second
  //   // }
  // }, [])

  return (
    <div className='App'>
      {/* Écouteur onClick qui permet d'éxecuter une fonction quand on clique dessus */}
      <button onClick={() => getQuotesAsyncAwait()}>Obtenir quotes</button>
      {/* Checker que la donné existe avant de l'utiliser */}
      {/* Différentes manières de faire de l'affichage conditionnel: https://blog.bitsrc.io/5-ways-to-implement-conditional-rendering-in-react-64730323b434 */}
      {quotes && quotes[0] && (
        <>
          <h1>{quotes[0].character}</h1>
          <span>{quotes[0].quote}</span>
          <img src={quotes[0].image} alt='' />
        </>
      )}
    </div>
  )
}

export default App

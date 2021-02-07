import Layout from '../components/layout'
var fetch = require('node-fetch')

// async function retrieveToken(req, res) {
//   const token = await jwt.getToken({ req, secret })
//   return JSON.stringify(token, null, 2)
// }

export default function Form() {
  const registerUser = async event => {
    event.preventDefault()

    const get = await fetch('/api/examples/jwt', {
      method: 'GET',
    });
    
    const token = await get.json()
    console.log(token.accessToken)

    const res = await fetch(
      'https://bitcampdev.herokuapp.com/api/post',
      {
        body: JSON.stringify({
          accesstoken: token.accessToken,
          lab: event.target.name.value
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST'
      }
    )

    const result = await res.json()
    console.log(result)
    // result.user => 'Ada Lovelace'
  }

  return (
    <Layout>
    <h1>API Example</h1>
      <p>1. Sign in with your Github Account</p>
      <p><em>You must be signed in to see responses.</em></p>
    <form onSubmit={registerUser}>
      <label htmlFor="name">Bitlab   </label>
      <input id="name" name="name" type="text" autoComplete="name" required />
      <button type="submit">Register</button>
    </form>
    </Layout>
  )
}

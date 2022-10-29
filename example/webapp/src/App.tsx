import React, { useEffect } from 'react'
import { client } from './hmm'
// import './App.css'

// import { Example } from './client.gen'
// import { WebRpcQueryClient } from './wtf'

// const _fetch = (a, b) => window.fetch(a, b)
// const exampleRpc = new Example('http://localhost:4242', _fetch)

// const client = new WebRpcQueryClient(exampleRpc)


export const App = () => {

  // useEffect(() => {
  //   (async () => {
  //     const user = await exampleRpc.getUser({ userID: 1 })
  //     console.log(user)
  //   })()
  // }, [])

  const huh = client.useQuery(['getUser', { userID: 1}])
  console.log('lol')

  return (
    <div className="App">
      sup
      <p>{JSON.stringify(huh.data?.user)}</p>
    </div>
  )

}

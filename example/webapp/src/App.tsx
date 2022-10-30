import React, { useEffect } from 'react'

import { rpcQueryClient } from './rpc'

export const App = () => {
  // const queryClient = useQueryClient()

  // const query = useQuery(['todos'], () => {
  //   return rpc.getUser({ userID: 1 })
  // })

  const query = rpcQueryClient.useQuery(['getUser', { userID: 1 }])

  return (
    <div className="App">
      sup

      <p>{query.data?.user.USERNAME}</p>
    </div>
  )

}

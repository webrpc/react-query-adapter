import React, { useEffect } from 'react'

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'


export const App = () => {
  // const queryClient = useQueryClient()

  const query = useQuery(['todos'], () => {
    return {
      name: 'ffffff'
    }
  })

  return (
    <div className="App">
      sup

      <p>{query.data?.name}</p>
    </div>
  )

}

'use client'

import React from 'react'

const MainPage: React.FC = () => {
  React.useEffect(() => {
    window.location.href = '/api/graphql'
  }, [])

  return <p>loading...</p>
}

export default MainPage

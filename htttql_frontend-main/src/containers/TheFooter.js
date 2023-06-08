import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="" target="_blank" rel="noopener noreferrer">Vu Thi Quynh</a>
        <span className="ml-1">&copy; 2023.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="" target="_blank" rel="noopener noreferrer">Team 15</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)

import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Header = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const handleSearchParams = (param, value) => {
        setSearchParams((previousSearch) => {
          let currentSearchParams = {...previousSearch}
          if (currentSearchParams[param]) {
            delete currentSearchParams[param]
          } else {
            currentSearchParams = {
                ...currentSearchParams,
                [param]: value
            }
          }
          return currentSearchParams
        })
    }
    const activeType = searchParams.get('type')
    return (
        <div className="wedding-header">
            <div
                className={`button${activeType === 'Δεξίωση' ? ' active': ''}`}
                onClick={() => handleSearchParams('type', 'Δεξίωση')}
            >
                {'Δεξίωση'}
            </div>
            <div
                className={`button${activeType === 'Μυστήριο' ? ' active': ''}`}
                onClick={() => handleSearchParams('type', 'Μυστήριο')}
            >
                {'Μυστήριο'}
            </div>
            <div
                className={`button${activeType === 'Νύφη' ? ' active': ''}`}
                onClick={() => handleSearchParams('type', 'Νύφη')}
            >
                {'Νύφη'}
            </div>
            <div
                className={`button${activeType === 'Γαμπρός' ? ' active': ''}`}
                onClick={() => handleSearchParams('type', 'Γαμπρός')}
            >
                {'Γαμπρός'}
            </div>
        </div>
    )
}

export default Header

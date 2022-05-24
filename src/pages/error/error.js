import './error.css'
import * as React from 'react'

// Material UI Components
import Box from '@mui/material/Box'

/**
 * Error Component.
 * Represents the error page.
 *
 * @returns {React.ReactElement} - Dashboard Component.
 */
const Error = () => {
  return (
    <div className="errorContainer">
      <div className="errorText">
        <Box sx={{ letterSpacing: 4, fontSize: 25 }}>
          Sidan kunde inte hittas
        </Box>
      </div>
    </div>
  )
}

export default Error

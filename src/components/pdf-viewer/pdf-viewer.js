import './pdf-viewer.css'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'

/**
 * Pdf Viewer Component.
 * Displays a pdf in an HTML iframe Element from a base64 encoded string.
 * Decrypts the string before instertion to the HTML iframe Element.
 *
 * @returns {React.ReactElement} - Pdf Viewer Component.
 */
const PdfViewer = () => {
  const [fetchUrl, setFetchUrl] = useState('')
  let isDecrypted = false
  const location = useLocation()
  const navigate = useNavigate()

  /**
   * Decrypts a string using secret key.
   *
   * @returns {string} - The decrypted string.
   */
  const decryptSrc = () => {
    try {
      const decryptedBytes = CryptoJS.AES.decrypt(location.state.src, process.env.REACT_APP_DOCUMENT_DECRYPT_SECRET)
      const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8)
      return decrypted
    } catch (error) {
      // Navigates to dashboard if problem with decryption
      navigate('/dashboard')
    }
  }

  useEffect(() => {
    // Decrypt document src with secret key
    const pdfDecrypted = decryptSrc()
    if (pdfDecrypted) {
      isDecrypted = true
      setFetchUrl(`data:application/pdf;base64,${pdfDecrypted}`)
    }
  }, [fetchUrl, location, isDecrypted])

  return (
    <div className="pdfViewerContainer">
      <iframe title="desktopViewer" src={fetchUrl}></iframe>
    </div>
  )
}

export default PdfViewer

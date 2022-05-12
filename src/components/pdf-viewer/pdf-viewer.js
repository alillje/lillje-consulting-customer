
import "./pdf-viewer.css";
import { useState } from "react"
import { Document, Page } from 'react-pdf';



const PdfViewer = ({ url }) => {

  let googleUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${url}`
    return (
      <div className="pdfWrapper">
<iframe
    src={googleUrl}
    frameBorder="0"
    scrolling="auto"
    height="70%"
    width="70%"
    title={url}
></iframe>
      </div>
    );
  
};

export default PdfViewer;

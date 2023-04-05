// const fs = require('fs');
// const pdfMake = require('pdfmake');
// const htmlToPdfmake = require('html-to-pdfmake');
import fs from 'fs'
import pdfMake from 'pdfMake'
import htmlToPdfmake from 'html-to-pdfmake'

const printPage = (html) => {
    // Define the PDF document definition
    const docDefinition = htmlToPdfmake(html);
  
    // Create a PDF document
    const pdfDoc = pdfMake.createPdf(docDefinition);
  
    // Save the PDF document to the server
    pdfDoc.getStream().pipe(fs.createWriteStream('public/my-page.pdf'));
  };

export default printPage
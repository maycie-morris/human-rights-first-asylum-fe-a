import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import {
  PageControls,
  PageButton,
  PageWrapper,
  PdfWrapper,
} from './PDFViewerStyled';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = props => {
  // GRABBING PATH FROM PROPS, SAVING IN COMPONENT STATE
  const { path } = props;
  const [pdfPath, setPdfPath] = useState(path);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [disableButton, setDisableButton] = useState({
    left: true,
    right: false,
  });

  function adjustPage(direction) {
    if (direction === 'forward') {
      if (pageNumber < numPages) {
        setPageNumber(pageNumber + 1);
      }
    } else if (direction === 'back') {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      }
    }
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (pageNumber === numPages) {
      setDisableButton({
        left: false,
        right: true,
      });
    } else if (pageNumber === 1) {
      setDisableButton({
        left: true,
        right: false,
      });
    } else {
      setDisableButton({
        left: false,
        right: false,
      });
    }
  }, [pageNumber]);

  return (
    <PageWrapper>
      <Document
        file={require('./samplePDF.pdf')}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page width="1000" pageNumber={pageNumber} />
        <PageControls>
          <PageButton
            onClick={e => {
              e.preventDefault();
              adjustPage('back');
            }}
            disabled={disableButton.left}
          >
            <ArrowBackIosRoundedIcon />
          </PageButton>
          <PageButton
            onClick={e => {
              e.preventDefault();
              adjustPage('forward');
            }}
            disabled={disableButton.right}
          >
            <ArrowForwardIosRoundedIcon />
          </PageButton>
        </PageControls>
      </Document>
    </PageWrapper>
  );
};

export default PDFViewer;
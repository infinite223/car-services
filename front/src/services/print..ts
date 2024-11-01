export const handlePrint = () => {
  const printableElement = document.getElementById("printable-content");

  if (printableElement) {
    const printContents = printableElement.innerHTML;

    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(`
          <html>
            <head>
              <title>Drukowanie Raportu</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #333; }
                p { font-size: 14px; }
              </style>
            </head>
            <body>
              ${printContents}
            </body>
          </html>
        `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  }
};

/**
 * Utility function to print any type of note or message
 * @param options Configuration options for printing
 */
export const printNote = (options: {
    note: string;
    title?: string;
    orderNumber?: string;
    additionalInfo?: Record<string, string>;
  }) => {
    const { 
      note, 
      title = "Note", 
      orderNumber, 
      additionalInfo = {} 
    } = options;
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('Please allow popups to print notes');
      return;
    }
    
    // Format the current date
    const currentDate = new Date().toLocaleDateString();
    
    // Create the content to print
    const noteContent = note || "No note provided";
    
    // Generate additional info HTML if provided
    const additionalInfoHTML = Object.entries(additionalInfo).map(([key, value]) => 
      `<div class="info-row"><strong>${key}:</strong> ${value}</div>`
    ).join('');
    
    // Write the HTML content to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}${orderNumber ? ` - Order #${orderNumber}` : ''}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #ddd;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .note-container {
              border: 1px solid #ddd;
              padding: 15px;
              border-radius: 4px;
              min-height: 100px;
              white-space: pre-wrap;
            }
            .additional-info {
              margin-top: 20px;
              padding: 10px;
              background-color: #f9f9f9;
              border-radius: 4px;
            }
            .info-row {
              margin-bottom: 5px;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
            .no-note {
              font-style: italic;
              color: #687588;
            }
            @media print {
              body {
                padding: 0;
              }
              button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>${title}${orderNumber ? ` - Order #${orderNumber}` : ''}</h2>
            <p>Date: ${currentDate}</p>
          </div>
          <div class="note-container ${!note ? 'no-note' : ''}">
            ${noteContent}
          </div>
          ${additionalInfoHTML ? `<div class="additional-info">${additionalInfoHTML}</div>` : ''}
          <div class="footer">
            <p>This document was automatically generated.</p>
          </div>
          <button onclick="window.print(); window.close();" style="margin-top: 20px; padding: 8px 16px; background: #0070f3; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Print
          </button>
        </body>
      </html>
    `);
    
    // Focus the new window
    printWindow.document.close();
    printWindow.focus();
  };
  
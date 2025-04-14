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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prosemirror-state/1.4.3/prosemirror-state.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prosemirror-view/1.31.8/prosemirror-view.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prosemirror-model/1.19.3/prosemirror-model.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tiptap/core@2.1.12/dist/tiptap-core.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tiptap/react@2.1.12/dist/tiptap-react.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tiptap/starter-kit@2.1.12/dist/tiptap-starter-kit.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tiptap/extension-underline@2.1.12/dist/tiptap-extension-underline.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tiptap/extension-text-align@2.1.12/dist/tiptap-extension-text-align.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/lucide-react@0.263.1/dist/umd/lucide-react.min.js"></script>

        <!-- Load icon library -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        
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
            min-height: 300px;
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
          .button-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
          }
          button {
            padding: 8px 16px;
            background: #0070f3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          }
          button.secondary {
            background: #f3f4f6;
            color: #1f2937;
            border: 1px solid #d1d5db;
          }
          
          /* TipTap styles */
          .tiptap-container {
            border: 1px solid #ddd;
            border-radius: 4px;
            overflow: hidden;
          }
          .tiptap-toolbar {
            display: flex;
            padding: 8px;
            border-bottom: 1px solid #e5e7eb;
            background-color: #f9fafb;
            flex-wrap: wrap;
            gap: 4px;
          }
          .toolbar-button {
            width: 32px;
            height: 32px;
            background: transparent;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            color: #374151;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .toolbar-button.active {
            background-color: #e5e7eb;
          }
          .toolbar-separator {
            width: 1px;
            height: 24px;
            background-color: #e5e7eb;
            margin: 0 4px;
          }
          .color-button {
            position: relative;
          }
          .color-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 8px;
            display: none;
            z-index: 10;
            width: 150px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .color-dropdown.show {
            display: block;
          }
          .color-option {
            width: 24px;
            height: 24px;
            margin: 2px;
            border-radius: 2px;
            cursor: pointer;
            display: inline-block;
          }
          .ProseMirror {
            padding: 16px;
            min-height: 200px;
            outline: none;
          }
          .ProseMirror p {
            margin: 0.5em 0;
          }
          .ProseMirror ul, .ProseMirror ol {
            padding-left: 2em;
          }
          
          /* Print styles */
          @media print {
            body {
              padding: 0;
            }
            .ProseMirror {
              border: none !important;
              outline: none !important;
            }
            .ProseMirror-focused {
              outline: none !important;
            }
            .tiptap-toolbar, 
            .button-container,
            .footer {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>${title}${orderNumber ? ` - Order #${orderNumber}` : ''}</h2>
          <p>Date: ${currentDate}</p>
        </div>
        
        <div id="editor-container" class="note-container"></div>
        
        ${additionalInfoHTML ? `<div class="additional-info">${additionalInfoHTML}</div>` : ''}
        
        <div class="footer">
          <p>This document was automatically generated.</p>
        </div>
        
        <div class="button-container">
          <button onclick="printDocument()" id="print-button">
            <i class="fas fa-print"></i> Print
          </button>
          <button onclick="window.close()" class="secondary">
            <i class="fas fa-times"></i> Close
          </button>
        </div>
        
        <script>
          // A simplified version of RTE for the print preview window
          document.addEventListener('DOMContentLoaded', function() {
            // Initialize a basic RTE
            const editorContainer = document.getElementById('editor-container');
            
            // Create toolbar
            const toolbar = document.createElement('div');
            toolbar.className = 'tiptap-toolbar';
            
            // Define toolbar buttons with Font Awesome icons
            const buttons = [
              { id: 'bold', icon: 'fa-bold', title: 'Bold' },
              { id: 'italic', icon: 'fa-italic', title: 'Italic' },
              { id: 'underline', icon: 'fa-underline', title: 'Underline' },
              { separator: true },
              { id: 'align-left', icon: 'fa-align-left', title: 'Align Left' },
              { id: 'align-center', icon: 'fa-align-center', title: 'Align Center' },
              { id: 'align-right', icon: 'fa-align-right', title: 'Align Right' },
              { separator: true },
              { id: 'bullet-list', icon: 'fa-list-ul', title: 'Bullet List' },
              { id: 'ordered-list', icon: 'fa-list-ol', title: 'Ordered List' },
              { separator: true },
              { id: 'text-color', icon: 'fa-palette', title: 'Text Color', isColorPicker: true }
            ];
            
            // Create the editor content area
            const contentArea = document.createElement('div');
            contentArea.className = 'tiptap-editor';
            contentArea.contentEditable = true;
            contentArea.className = 'ProseMirror';
            contentArea.innerHTML = \`${noteContent}\`;
            
            // Color options
            const textColors = [
              { color: '#000000', name: 'Black' },
              { color: '#FF0000', name: 'Red' },
              { color: '#0000FF', name: 'Blue' },
              { color: '#008000', name: 'Green' },
              { color: '#FFA500', name: 'Orange' },
              { color: '#800080', name: 'Purple' },
              { color: '#A52A2A', name: 'Brown' },
              { color: '#808080', name: 'Gray' }
            ];
            
            // Add buttons to toolbar
            buttons.forEach(btn => {
              if (btn.separator) {
                const sep = document.createElement('div');
                sep.className = 'toolbar-separator';
                toolbar.appendChild(sep);
              } else {
                const button = document.createElement('button');
                button.className = 'toolbar-button';
                if (btn.isColorPicker) button.className += ' color-button';
                
                button.setAttribute('type', 'button');
                button.title = btn.title;
                
                // Create icon element
                const icon = document.createElement('i');
                icon.className = 'fas ' + btn.icon;
                button.appendChild(icon);
                
                button.id = 'btn-' + btn.id;
                
                if (btn.isColorPicker) {
                  // Create color dropdown
                  const dropdown = document.createElement('div');
                  dropdown.className = 'color-dropdown';
                  
                  textColors.forEach(colorOption => {
                    const colorBtn = document.createElement('div');
                    colorBtn.className = 'color-option';
                    colorBtn.style.backgroundColor = colorOption.color;
                    colorBtn.title = colorOption.name;
                    colorBtn.onclick = function() {
                      document.execCommand('foreColor', false, colorOption.color);
                      dropdown.classList.remove('show');
                    };
                    dropdown.appendChild(colorBtn);
                  });
                  
                  button.appendChild(dropdown);
                  
                  // Toggle dropdown visibility
                  button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    dropdown.classList.toggle('show');
                  });
                  
                  // Close dropdown when clicking elsewhere
                  document.addEventListener('click', function() {
                    dropdown.classList.remove('show');
                  });
                } else {
                  // Add basic formatting functionality
                  button.addEventListener('click', function() {
                    document.execCommand(getCommand(btn.id), false, null);
                    
                    // Toggle active state for alignment buttons
                    if (btn.id.startsWith('align-')) {
                      const alignButtons = toolbar.querySelectorAll('button[id^="btn-align-"]');
                      alignButtons.forEach(btn => btn.classList.remove('active'));
                      button.classList.add('active');
                    } else if (!btn.id.includes('list')) {
                      // Toggle active state for other buttons except lists
                      button.classList.toggle('active');
                    }
                  });
                }
                
                toolbar.appendChild(button);
              }
            });
            
            // Helper function to map buttons to execCommand actions
            function getCommand(id) {
              const commands = {
                'bold': 'bold',
                'italic': 'italic',
                'underline': 'underline',
                'align-left': 'justifyLeft',
                'align-center': 'justifyCenter',
                'align-right': 'justifyRight',
                'bullet-list': 'insertUnorderedList',
                'ordered-list': 'insertOrderedList'
              };
              return commands[id] || id;
            }
            
            // Create editor container with toolbar
            const editorWrapper = document.createElement('div');
            editorWrapper.className = 'tiptap-container';
            editorWrapper.appendChild(toolbar);
            editorWrapper.appendChild(contentArea);
            
            // Add editor to page
            editorContainer.appendChild(editorWrapper);
            
            // Focus editor
            setTimeout(() => {
              contentArea.focus();
            }, 100);
          });
          
          // Print function that hides non-printing elements
          function printDocument() {
            window.print();
          }
        </script>
      </body>
    </html>
  `);
  
  // Close document writing and focus the window
  printWindow.document.close();
  printWindow.focus();
};
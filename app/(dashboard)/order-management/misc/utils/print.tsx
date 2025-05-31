export const printNote = (options: {
  note: string
  title?: string
  orderNumber?: string
  additionalInfo?: Record<string, string>
}) => {
  const { note, title = "Note", orderNumber, additionalInfo = {} } = options

  // Create a new window for printing
  const printWindow = window.open("", "_blank")

  if (!printWindow) {
    alert("Please allow popups to print notes")
    return
  }

  // Format the current date
  const currentDate = new Date().toLocaleDateString()

  // Create the content to print
  const noteContent = note || "No note provided"

  // Generate additional info HTML if provided
  const additionalInfoHTML = Object.entries(additionalInfo)
    .map(([key, value]) => `<div class="info-row"><strong>${key}:</strong> ${value}</div>`)
    .join("")

  // Write the HTML content to the new window
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}${orderNumber ? ` - Order #${orderNumber}` : ""}</title>
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
            position: relative;
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
            position: relative;
          }
          .toolbar-button:hover {
            background-color: #f3f4f6;
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
          .dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 4px;
            display: none;
            z-index: 1000;
            min-width: 120px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-top: 2px;
          }
          .dropdown.show {
            display: block;
          }
          .dropdown-item {
            padding: 6px 12px;
            cursor: pointer;
            border-radius: 2px;
            white-space: nowrap;
          }
          .dropdown-item:hover {
            background-color: #f3f4f6;
          }
          .color-option {
            width: 24px;
            height: 24px;
            margin: 2px;
            border-radius: 2px;
            cursor: pointer;
            display: inline-block;
            border: 1px solid #ddd;
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
            .footer,
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="header no-print">
          <h2>${title}${orderNumber ? ` - Order #${orderNumber}` : ""}</h2>
          <p>Date: ${currentDate}</p>
        </div>
        
        <div id="editor-container" class="note-container"></div>
        
        ${additionalInfoHTML ? `<div class="additional-info">${additionalInfoHTML}</div>` : ""}
        
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
          let currentEditor = null;
          
          // A simplified version of RTE for the print preview window
          document.addEventListener('DOMContentLoaded', function() {
            // Initialize a basic RTE
            const editorContainer = document.getElementById('editor-container');
            
            // Create toolbar
            const toolbar = document.createElement('div');
            toolbar.className = 'tiptap-toolbar';
            
            // Create the editor content area
            const contentArea = document.createElement('div');
            contentArea.className = 'ProseMirror';
            contentArea.contentEditable = true;
            contentArea.innerHTML = \`${noteContent}\`;
            currentEditor = contentArea;
            
            // Font size button
            const fontSizeBtn = createToolbarButton('fa-text-height', 'Font Size');
            const fontSizeDropdown = document.createElement('div');
            fontSizeDropdown.className = 'dropdown';
            
            const fontSizes = [
              { label: '10px', value: '10px' },
              { label: '12px', value: '12px' },
              { label: '14px', value: '14px' },
              { label: '16px', value: '16px' },
              { label: '18px', value: '18px' },
              { label: '20px', value: '20px' },
              { label: '24px', value: '24px' },
              { label: '28px', value: '28px' },
              { label: '32px', value: '32px' },
              { label: '36px', value: '36px' }
            ];
            
            fontSizes.forEach(size => {
              const item = document.createElement('div');
              item.className = 'dropdown-item';
              item.textContent = size.label;
              item.style.fontSize = size.value;
              item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                applyFontSize(size.value);
                fontSizeDropdown.classList.remove('show');
              });
              fontSizeDropdown.appendChild(item);
            });
            
            fontSizeBtn.appendChild(fontSizeDropdown);
            fontSizeBtn.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              closeAllDropdowns();
              fontSizeDropdown.classList.toggle('show');
            });
            
            toolbar.appendChild(fontSizeBtn);
            toolbar.appendChild(createSeparator());
            
            // Other buttons
            toolbar.appendChild(createFormatButton('fa-bold', 'Bold', 'bold'));
            toolbar.appendChild(createFormatButton('fa-italic', 'Italic', 'italic'));
            toolbar.appendChild(createFormatButton('fa-underline', 'Underline', 'underline'));
            toolbar.appendChild(createSeparator());
            
            toolbar.appendChild(createFormatButton('fa-align-left', 'Align Left', 'justifyLeft'));
            toolbar.appendChild(createFormatButton('fa-align-center', 'Align Center', 'justifyCenter'));
            toolbar.appendChild(createFormatButton('fa-align-right', 'Align Right', 'justifyRight'));
            toolbar.appendChild(createSeparator());
            
            toolbar.appendChild(createFormatButton('fa-list-ul', 'Bullet List', 'insertUnorderedList'));
            toolbar.appendChild(createFormatButton('fa-list-ol', 'Ordered List', 'insertOrderedList'));
            toolbar.appendChild(createSeparator());
            
            // Color picker
            const colorBtn = createToolbarButton('fa-palette', 'Text Color');
            const colorDropdown = document.createElement('div');
            colorDropdown.className = 'dropdown';
            colorDropdown.style.width = '160px';
            
            const colors = [
              '#000000', '#FF0000', '#0000FF', '#008000', 
              '#FFA500', '#800080', '#A52A2A', '#808080'
            ];
            
            colors.forEach(color => {
              const colorOption = document.createElement('div');
              colorOption.className = 'color-option';
              colorOption.style.backgroundColor = color;
              colorOption.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                document.execCommand('foreColor', false, color);
                colorDropdown.classList.remove('show');
              });
              colorDropdown.appendChild(colorOption);
            });
            
            colorBtn.appendChild(colorDropdown);
            colorBtn.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              closeAllDropdowns();
              colorDropdown.classList.toggle('show');
            });
            
            toolbar.appendChild(colorBtn);
            
            // Helper functions
            function createToolbarButton(iconClass, title) {
              const button = document.createElement('button');
              button.className = 'toolbar-button';
              button.title = title;
              button.type = 'button';
              
              const icon = document.createElement('i');
              icon.className = 'fas ' + iconClass;
              button.appendChild(icon);
              
              return button;
            }
            
            function createFormatButton(iconClass, title, command) {
              const button = createToolbarButton(iconClass, title);
              button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                document.execCommand(command, false, null);
              });
              return button;
            }
            
            function createSeparator() {
              const sep = document.createElement('div');
              sep.className = 'toolbar-separator';
              return sep;
            }
            
            function applyFontSize(size) {
              const selection = window.getSelection();
              if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                if (!range.collapsed) {
                  // Text is selected
                  const span = document.createElement('span');
                  span.style.fontSize = size;
                  try {
                    range.surroundContents(span);
                  } catch (e) {
                    // If surroundContents fails, extract and wrap content
                    const contents = range.extractContents();
                    span.appendChild(contents);
                    range.insertNode(span);
                  }
                  selection.removeAllRanges();
                  const newRange = document.createRange();
                  newRange.selectNodeContents(span);
                  selection.addRange(newRange);
                } else {
                  // No text selected, set font size for future typing
                  document.execCommand('fontSize', false, '3');
                  const fontElements = currentEditor.querySelectorAll('font[size="3"]');
                  const lastFont = fontElements[fontElements.length - 1];
                  if (lastFont) {
                    lastFont.style.fontSize = size;
                    lastFont.removeAttribute('size');
                  }
                }
              }
            }
            
            function closeAllDropdowns() {
              document.querySelectorAll('.dropdown.show').forEach(dropdown => {
                dropdown.classList.remove('show');
              });
            }
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', function(e) {
              if (!e.target.closest('.toolbar-button')) {
                closeAllDropdowns();
              }
            });
            
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
  `)

  // Close document writing and focus the window
  printWindow.document.close()
  printWindow.focus()
}

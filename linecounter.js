// script.js (append this to your existing content)

document.addEventListener('DOMContentLoaded', () => {
    // ... (Your existing carousel and zoom functionality code) ...

    // Function to update line numbers on the post page
    function updateLineNumbers() {
        const editorTextArea = document.querySelector('.editor-text-area');
        const lineNumbersContainer = document.querySelector('.line-numbers');

        // Ensure both elements exist on the page before trying to update
        if (editorTextArea && lineNumbersContainer) {
            // Clear any existing line numbers to prevent duplicates if function runs multiple times
            lineNumbersContainer.innerHTML = '';

            // Select all block-level elements within the text area that represent a 'line'
            // We include p, h2, h3, h4. You can add more if you use other block tags (e.g., li for list items)
            // We explicitly exclude the blinking cursor, as it's not a content line.
            const textBlocks = editorTextArea.querySelectorAll('p, h2, h3, h4, li, blockquote, div:not(.blinking-cursor)');

            let lineNumber = 1;
            textBlocks.forEach(block => {
                // For each detected block, create a new <span> for the line number
                const lineSpan = document.createElement('span');
                lineSpan.textContent = lineNumber;
                lineNumbersContainer.appendChild(lineSpan);
                lineNumber++;
            });
        }
    }

    // Call the function when the DOM is fully loaded.
    // This ensures the content is available for the script to count.
    updateLineNumbers();

    // Optional Advanced Improvement: If your text content could change dynamically
    // (e.g., if you had an actual editable text area or loaded content via AJAX),
    // you would use a MutationObserver to automatically update line numbers.
    // For a static blog post, this is not strictly necessary, but demonstrates the idea:
    /*
    const editorTextArea = document.querySelector('.editor-text-area');
    if (editorTextArea) {
        const observer = new MutationObserver(updateLineNumbers);
        // Observe changes to the child list (elements added/removed) or subtree (content within elements)
        observer.observe(editorTextArea, { childList: true, subtree: true, characterData: true });
    }
    */
});
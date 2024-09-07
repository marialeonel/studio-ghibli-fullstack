const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function sanitizeValue(value){
    const sanitizedValue = DOMPurify.sanitize(value);
    return sanitizedValue;
}

module.exports = {sanitizeValue};
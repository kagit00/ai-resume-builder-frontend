export const emptyHtmlFromTxt = (text) => {
     return text.replace(/<[^>]*>/g, '')
};
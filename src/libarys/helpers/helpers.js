// Text verkürzen 
export function getShortenedText(text, maxWords = 10, suffix = '…') {
    const words = text.split(' ');
  
    if (words.length <= maxWords) {
      return text;
    }
  
    const shortText = words.slice(0, maxWords).join(' ');
  
    return shortText + suffix;
  }
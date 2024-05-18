import React, { useState, useEffect } from 'react';
import './App.css';

const HighlightLongWords = () => {
  const [paragraphText, setParagraphText] = useState('');
  const [highlightedText, setHighlightedText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const paragraph = document.getElementById('paragraph');
    if (paragraph) {
      setParagraphText(paragraph.innerText);
    }
  }, []);

  useEffect(() => {
    if (paragraphText) {
      const words = paragraphText.split(/\s+/);
      const processedText = words.map(word => {
        if (word.length > 8) {
          setWordCount(prevCount => prevCount + 1); // Increment count if word length is greater than 8
          return `<span class="highlight">${word}</span>`;
        }
        return word;
      }).join(' ');
      setHighlightedText(processedText);
    }
  }, [paragraphText]);

  return (
    <div className='paragraph'>
      <p id="paragraph">
      In the shadows of Gotham City, where darkness reigns and crime lurks in every corner, there exists a silent guardian, a watchful protector - the Batman. Clad in his iconic cape and cowl, he prowls the night, a symbol of fear for the criminals who dare to challenge the law. With his unparalleled intellect, martial arts mastery, and an arsenal of cutting-edge gadgets, he strikes fear into the hearts of evildoers. But behind the mask, beneath the stoic facade, lies a man haunted by the memories of a tragic past, a man driven by a relentless determination to rid his city of corruption and injustice. For Gotham, he is more than a hero; he is a legend, a symbol of hope in a world consumed by darkness.
      </p>
      <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
      <p>Number of words longer than 8 characters: {wordCount}</p>
    </div>
  );
};

export default HighlightLongWords;

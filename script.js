let lastValue = 0;
let headIndex = 0;
let pool = true;

const heightUnit = window.innerHeight / 2;

const interpolatedText = (t, list, headIndex) => {
  const beginText = headIndex < list.length ? list[headIndex] : " ";
  const terminalText = headIndex + 1 < list.length ? list[headIndex + 1] : " ";
  const currentTxtLength = Math.min(
    beginText.length * (1 - t) + terminalText.length * t,
    Math.max(beginText.length, terminalText.length)
  );
  let str = "";
  for (let i = 0; i < currentTxtLength; i++) {
    str +=
      i < beginText.length
        ? String.fromCharCode(
            Math.floor(
              beginText.charCodeAt(i) * (1 - t) +
                terminalText.charCodeAt(i % terminalText.length) * t
            )
          )
        : String.fromCharCode(
            Math.floor(
              Math.floor(50) * (1 - t) + terminalText.charCodeAt(i) * t
            )
          );
  }

  return str;
};

const hoge = () => {
  let t = 0;
  if (Math.floor(window.pageYOffset / heightUnit) % 2 == 0) {
    //static
    headIndex = Math.floor(window.pageYOffset / heightUnit / 2);
    t = 0;
  } else {
    //animate
    headIndex = Math.floor(window.pageYOffset / heightUnit / 2);
    t = (window.pageYOffset % heightUnit) / heightUnit;
  }

  const headlineText = interpolatedText(t, headlineLists, headIndex);
  const paragraphText = interpolatedText(t, contentsLists, headIndex);
  const secondHeadlineText = interpolatedText(
    t,
    secondHeadlineLists,
    headIndex
  );
  const secondParagraphText = interpolatedText(
    t,
    secondContentsLists,
    headIndex
  );
  const thirdHeadlineText = interpolatedText(t, thirdHeadlineLists, headIndex);
  const thirdParagraphText = interpolatedText(t, thirdContentsLists, headIndex);

  const headline = document.getElementById("headline");
  const paragraph = document.getElementById("paragraph");
  const container = document.getElementById("container");
  const secondBlock = document.getElementById("2nd-block");
  const secondHeadline = secondBlock.children[0];
  const secondParagraph = secondBlock.children[1];
  const thirdBlock = document.getElementById("3rd-block");
  const thirdHeadline = thirdBlock.children[0];
  const thirdParagraph = thirdBlock.children[1];
  headline.innerHTML = headlineText;
  paragraph.innerHTML = paragraphText;
  secondHeadline.innerHTML = secondHeadlineText;
  secondParagraph.innerHTML = secondParagraphText;
  thirdHeadline.innerHTML = thirdHeadlineText;
  thirdParagraph.innerHTML = thirdParagraphText;

  document.getSelection().removeAllRanges();

  const range = new Range();

  range.setStart(container, 0);
  range.setEnd(container, 2);

  //document.getSelection().addRange(range);
  document.getSelection().addRange(range);

  window.requestAnimationFrame(hoge);
};

window.requestAnimationFrame(hoge);

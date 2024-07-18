import chalk from "chalk"

const footnote = (noteId, footnotes) => {
  return footnotes.find((fn) => fn.noteId === noteId)
}

const formatFootnote = (footnote, book) => {
  // ^[ ^Genesis&nbsp;1:26^ MT; Syriac *and over all the beasts of the earth*]
  return `^[ ^${book}&nbsp;${footnote.reference.chapter}:${footnote.reference.verse}^ ${footnote.text}]`
}

const formatVerse = (verse, chapterContent) => {
  // ^1^{#genesis-1-1}In the beginning God created the heavens and the earth.<br/><br/>
  let ret = `^${verse.number}^{#${chapterContent.book.commonName.toLowerCase()}-${chapterContent.chapter.number}-${verse.number}}`

  verse.content.forEach((node) => {
    if(typeof(node) === "string") {
      ret += node
    } else if(typeof(node) === "object") {
      if(node.noteId) {
        ret += formatFootnote(footnote(node.noteId, chapterContent.chapter.footnotes), chapterContent.book.commonName)
      } else if(node.text) {
        ret += node.text

        /*if(node.poem) {
          console.log(
            chalk.green(`Poem Indent: ${node.poem}`)
          )
        }

        if(node.wordsOfJesus) {
          console.log(
            chalk.green("Words of Jesus")
          )
        }*/
      } else {
        console.log(
          chalk.red.bold(JSON.stringify(node, null, 2))
        )
      }
    }

    ret += " "
  })

  return ret
}

const chapter = ({translation, book, chapter}) => {
  fetch(`https://bible.helloao.org/api/${translation}/${book}/${chapter}.json`)
    .then(request => request.json())
    .then(chapterContent => {
      if (chapterContent) {
        console.log(
          chalk.blue.bold(`The ${translation}, ${book}:${chapter} has the following content:`)
        )

        chapterContent.chapter.content.forEach((content) => {
          if (content) {
            if (content.type === "heading") {
              console.log(
                chalk.magenta(`Heading: ${JSON.stringify(content, null, 2)}`) 
              )
            } else if (content.type === "line_break") {
              console.log(
                chalk.bgGreen(`Line Break: ${JSON.stringify(content, null, 2)}`) 
              )
            } else if (content.type === "verse") {
              console.log(
                chalk.green.bold(formatVerse(content, chapterContent)) 
              )
            } else {
              console.log(
                chalk.red(`[${content.type}]`)
              )
              
              console.log(
                chalk.red.bold(JSON.stringify(content, null, 2))
              )
              
              /*content.content.forEach((node) => {
                if (node.text) {
                  chalk.green(`Formatted Text: ${node.text}`)
                }
                // implement poem: number
                // implement wordsOfJesus: boolean

                if (node.heading) {
                  chalk.green(`Inline Heading: ${node.heading}`)
                }
              })*/
            }
          }
        })

        console.log(
          chalk.red.bold(JSON.stringify(chapterContent, null, 2))
        )
      }
    })
}

export default chapter
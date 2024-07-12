import chalk from "chalk"

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
                chalk.green(`Heading: ${content.content}`) 
              )
            } else if (content.type === "line_break") {
              console.log(
                chalk.green(`Line Break: <br/>`) 
              )
            } else if (content.type === "verse") {
              console.log(
                chalk.green(`Verse: ${content.number}`) 
              )

              content.content.forEach((node) => {
                if(typeof(node) === "string") {
                  console.log(
                    chalk.green.bold(node)
                  )
                } else if(typeof(node) === "object") {
                  if(node.noteId) {
                    console.log(
                      chalk.green.bold(`Footnote Reference: ${node.noteId}`)
                    )
                  } else if(node.text) {
                    console.log(
                      chalk.green.bold(`Formatted Text: ${node.text}`)
                    )

                    if(node.poem) {
                      console.log(
                        chalk.green(`Poem Indent: ${node.poem}`)
                      )
                    }

                    if(node.wordsOfJesus) {
                      console.log(
                        chalk.green("Words of Jesus")
                      )
                    }
                  } else {
                    console.log(
                      chalk.red.bold(JSON.stringify(node, null, 2))
                    )
                  }
                } else {
                  console.log(
                    chalk.red(typeof(node))
                  )

                  console.log(
                    chalk.red.bold(JSON.stringify(node, null, 2))
                  )
                }
              })
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
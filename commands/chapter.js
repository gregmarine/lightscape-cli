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
            if (content.content) {
              if (content.type === "heading") {
                console.log(
                  chalk.green(`Heading: ${content.content}`) 
                )
              } else if (content.type === "line_break") {
                console.log(
                  chalk.green(`Line Break: <br/>`) 
                )
              } else {
                content.content.forEach((node) => {
                  if (node.text) {
                    chalk.green(`Formatted Text: ${node.text}`)
                  }
                  // implement poem: number
                  // implement wordsOfJesus: boolean

                  if (node.heading) {
                    chalk.green(`Inline Heading: ${node.heading}`)
                  }
                })
              }
            }

            switch (content.type) {
              case "hebrew_subtitle":
                console.log(
                  chalk.green("Not sure what hebrew_subtitle is...") 
                )
                break
              case "verse":
                console.log(
                  chalk.green(content.content) 
                )
                break
              default:
                console.log(
                  chalk.green(content.type) 
                )
            }
          }
        })
      }
    })
}

export default chapter
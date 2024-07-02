import chalk from "chalk"

const books = ({translation}) => {
  fetch(`https://bible.helloao.org/api/${translation}/books.json`)
    .then(request => request.json())
    .then(books => {
      if (books) {
        console.log(
          chalk.blue.bold(`The ${translation} has the following books:`)
        )

        books.books.forEach((book) => {
          if (book) {
            console.log(
              chalk.green(`${book.name}`)
            )
          }
        })
      }
    })
}

export default books
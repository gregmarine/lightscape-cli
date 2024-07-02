#! /usr/bin/env node

import { program } from "commander"
import available_translations from "./commands/available_translations.js"
import books from "./commands/books.js"
import chapter from "./commands/chapter.js"

program
  .command("available_translations")
  .description("Gets the list of available translations in the API.")
  .option('-l, --language <language>', 'The language for the list of translations. If not specified, all available translations are listed.')
  .action(available_translations)

program
  .command("books")
  .description("Gets the list of books that are available for the given translation.")
  .option('-t, --translation <translation>', 'The ID of the translation (e.g. BSB). Translation is required.')
  .action(books)

program
  .command("chapter")
  .description("Gets the content of a single chapter for a given book and translation.")
  .option('-t, --translation <translation>', 'The ID of the translation (e.g. BSB). Translation is required.')
  .option('-b, --book <book>', 'Either the ID of the book or the common name of the book (e.g. GEN or Genesis for the BSB).')
  .option('-c, --chapter <chapter>', 'The numerical chapter (e.g. 1 for the first chapter).')
  .action(chapter)

program.parse()
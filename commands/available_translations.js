import chalk from "chalk"

const available_translations = ({language}) => {
  fetch(`https://bible.helloao.org/api/available_translations.json`)
    .then(request => request.json())
    .then(availableTranslations => {
      if (availableTranslations) {
        console.log(
          chalk.blue.bold("The API has the following translations:")
        )

        availableTranslations.translations.forEach((translation) => {
          if (language) {
            if (translation.language === language && translation.englishName.trim() !== "") {
              console.log(
                chalk.green(`${translation.englishName} (${translation.shortName}) - ${translation.licenseUrl}`)
              )
            }
          } else {
            if (translation.englishName.trim() !== "") {
              console.log(
                chalk.green(`${translation.englishName} (${translation.shortName}) - ${translation.licenseUrl}`)
              )
            }
          }
        })
      }
    })
}

export default available_translations
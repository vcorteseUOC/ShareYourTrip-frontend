export const getLanguageFlag = (language) => {
  const flags = {
    es: 'https://flagcdn.com/w20/es.png',
    en: 'https://flagcdn.com/w20/gb.png',
    fr: 'https://flagcdn.com/w20/fr.png',
    de: 'https://flagcdn.com/w20/de.png',
    it: 'https://flagcdn.com/w20/it.png'
  }
  return flags[language?.toLowerCase()] || 'https://flagcdn.com/w20/eu.png'
}

export const getLanguageName = (language) => {
  const names = {
    es: 'Español',
    en: 'Inglés',
    fr: 'Francés',
    de: 'Alemán',
    it: 'Italiano'
  }
  return names[language?.toLowerCase()] || language
}

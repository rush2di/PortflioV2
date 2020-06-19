/*
 *  simple module is based on react-i18next configuration options, providing a complimentary role
 *  to the useLanguagues custom hook @(../../utils/utils.tsx)
 *  All constants declared in this module were used as dynamic translation providers for the
 *  project page @(../../templates/projectsPage.js)
 */

const translations = (en, fr) => {
  return { english: en, french: fr }
}

const scrollCTA = translations("scroll", "défiler")

const heading1 = translations(
  "THE TECH BEHIND THE WEBSITE",
  "LA TECHNOLOGIE DERRIÈRE CE SITE"
)

const heading2 = translations(
  "A MOBILE FRIENDLY APPROACH",
  "UNE APPROCHE MOBILE FIRST"
)

const paragraph = translations(
  "In todays digital age, users expect every website to have a mobile version. So companies and developers must try to produce the same if not better experience for users interacting with their site on a mobile device. This project helped me understand how a professional team translates a desktop site into a mobile device.",
  "L'internet dernièrement a été marqué par la forte croissance des populations mobinautes et tablonautes, donc l’importance des mobiles et des tablettes n’est plus à démontrer et les utilisateurs maintenet s'attendent toujours que chaque site Web ait un fonctionnement optimaux et compaptible en version mobile. Les entreprises et les développeurs doivent donc essayer de produire la même ou sinon une meilleure expérience pour ces utilisateurs. Ce projet m'a aidé à comprendre comment une équipe professionnelle se focalise sur l’essentiel utilisation mobile et simplifie la navigation au maximum."
)

const nextProject = translations("Next project", "Projet suivant")

const backToHome = translations(
  "Go back to home page",
  "Retournez à la page d'accueil"
)

export { scrollCTA, heading1, heading2, paragraph, nextProject, backToHome }

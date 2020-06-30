---
templateKey: projects-template
date: 2020-03-25T06:28:26.691Z
title: Ag-Portfolio
glink: https://github.com/rush2di/AgPortfolio
dlink: https://agportfolio.netlify.app/
Stack:
  - GatsbyJs
  - ReactJs
  - GraphQl
  - Sass
  - Netlify CMS
  - TypeScript
  - GSAP
  - NodeJs
cover: /images/dribbble-shot-hd-1-2-.jpg
screenshot: /images/agportfolio.png
laptop: /images/fireshot-capture-012-home-grana.ab-agportfolio.netlify.app.png
mobile: /images/fireshot-capture-013-home-grana.ab-agportfolio.netlify.app.png
english:
  title: Theke
  intro: photography portfolio website
  description: The client has portrayed an idea of creating a mobile first
    portfolio website where he can showcase his works, photography skills, and
    also a place where he can write articles about composition, photo editing,
    and photography tips that people can share on social media platforms.
  type: Freelance project
  markdown: >-
    The major task was to create such an application, that can synchronize with
    assets sourced from the flickr website where the client stores his works. To
    address this problem I signed up for a flickr developer account to be able
    to use flickr's api using the api key they provided, doing so the important
    assets were retrieved and ready to be used.


    To enable the client content creation a cms had to be provided, besides the website had to be seo friendly with the right meta tags in case users shared an article on social media. Therefore I chosed to work with GatsbyJs ( a static site generator with the ability to be server side rendred ) in combination with Netlify cms. This combination guarantees fast performance and an easy to use interface for content creation by the highly customizable configuration that Nelify cms comes with.


    The approved mobile design radically contradicted with the laptop design in terms of ui components, thus dynamic responsive components had to be implemented. The best solution was to create a react hook which returns the screen width and listens to screen resize events, this assures the following advantages: 


    1- only one event listener was implemented


    2- specific components can be mounted or unmounted conditionally according to exact screen widths


    3- increase in performance by coupling related logic
  role: design & development
  demobtn: view demo
  githubtn: view github repo
french:
  title: Theke
  intro: Site portfolio de photographie
  type: Projet personnel
  description: Grana.ab est un site portfolio d'un jeune photographe où il
    présente ses compétences en photographie et écrit également des articles sur
    la composition, le montage des photos et post des conseils en ce qui
    concerne la photographie.
  markdown: >-
    Ce que j'ai appris de la création de ce site, c'est que la création de vos
    propres custom hooks dans React présente de nombreux avantages et vous
    permet d'augmenter les performances en couplant la logique associée en un
    seul custom hook, ce qui rend le code plus propre et plus facile à lire.


    Pour Graphql, j'ai appris et utilisé de nouveaux concepts comme les alias et les fragments. Les fragments vous permettent de construire des ensembles de champs, puis de les inclure dans les requêtes où vous en avez besoin tandis que les alias vous aident à récupérer différentes données pour le même champ avec différents arguments fournis, cela vous aide a éviter de récupérer l'ensemble des données complets et d'appliquer des filtres dans la côté frontend.


    Pour les stylings, j'ai utilisé Sass et j'ai suivi la méthodologie bem mais j'ai également appliqué de petits changements qui correspondaient à mes besoins de développement. Gsap avec Scrollmagic pour les animations de défilement et React-transition-group pour les transitions des pages.
  role: design et development
  demobtn: voir le demo
  githubtn: voir la repo github
---

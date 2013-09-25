---
comments: true
date: 2013-09-06 11:48:19
layout: blog
slug: oxygen-un-web-cms-free
title: "Oxygen.cat, un web CMS-free"
categories: [comunicació, treballs, no-cita]
tags: "case-study"
"featured-img": true
"featured-img-url": "oxygen-case-study.png"
meta: "Oxygen.cat, un web CMS-free"
excerpt: "Jekyll permet la construcció senzilla, flexible i fiable de webs sense el sobrecost del CMS."
author: oxygen
published: true
keywords: oxygen, web, cms, free
---

#Oxygen.cat, un web CMS-free

<blockquote>
	<p>Jekyll permet la construcció senzilla, flexible i fiable de webs sense el sobrecost del CMS.</p>
	<footer>
		&mdash; <cite><a href="{{ page.url }}" title="{{ page.title }}">Oxygen</a></cite>
	</footer>
</blockquote>

A Oxygen apostem de totes totes per la contruscció de webs CMS-free. Les lliçons apreses i les experiències visqudes durant 9 anys liderant projectes Magnolia són el rerafons de l'evolució d'un procés que ens condueix cap a nous webs simples, flexibles i fiables que permeten un enfocament renovat de disseny i estratègia.

##L'era CMS. Magnolia un aliat

En el passat, la creació de llocs web "potents", significava la creació de complexos sistemes de gestió de continguts. Aquests CMSs necessitaven de la lògica de les plantilles, el codi d'aplicació i les bases de dades de contingut per poder "muntar" pàgines web cada vegada que eren sol·licitades pels visitants del web. Eren sistemes complexos que depenien d'aplicacions diferents treballant alhora, com un servidor web per conduir les peticions de pàgina cap a una aplicació Java, que emprava plantilles de disseny de pàgina predefinides per donar format a contingut emmagatzemat en una base de dades MySQL. Per servir una sola sol·licitud de pàgina calia almenys tres aplicacions separades treballant alhora.

Per fer funcionar això a escala cal encara major complexitat: ús de noves aplicacions per emmagatzemar en memòria cau la informació de la base de dades o l'"output" de l'aplicació Java, replicar el contingut a través de diversos servidors de bases de dades i alhora intentar mantenir els nous continguts en sincronia, posant nous servidors en paral·lel per manegar talls de tràfic i moltes altres tàctiques d'escalabilitat ideades durant anys per mantenir aquest model. Al final, però, la capacitat de mantenir el lloc web "dempreus" servint contingut al ritme d'un munt de peticions, depèn de la capacitat dels desenvolupadors per anar activant nous servidors i la confiança en els sistemes de memòria cau.

Tant els frameworks de codi obert com ara Magnolia, Drupal o Wordpress com les aplicacions de codi propietari de milions d'euros que empren governs i grans empreses, produeixen exactament el mateix "output": arxius HTML, CSS i JavaScript que els navegadors web saben com "convertir" en les pàgines web que veiem.

Tot i la complexitat d'aquests sistemes, tots ells han de produir els mateixos formats de sortida: estàndards web.

<figure class="hidden-xs hidden-sm"><img src="/assets/img/oxygen-multi-pantalla.png" /><figcaption><p>Captures de la pàgina d'inici del web d'Oxygen en diferents tipus de suport. Des dels telèfons mòbils fins a les grans pantalles — oxygen.cat, un web cms-free</p></figcaption></figure>

##Tornar al bàsic

Mitjançant el desenvolupament de llocs web, com aplicacions de la banda client ("client-side") que només consten dels arxius utilitzables directament per un navegador web sense el treball addicional realitzat pels servidors de back-end, hom es capaç de traslladars l'estalvi de costos als clients alhora que s'elimina pràcticament el risc de caiguda de la pàgina web. Per a funcionalitats addicionals no disponibles en les aplicacions "client-side", hom integra serveis externs.

##La fórmula més senzilla

- Fitxers HTML, CSS i Javascript
- El servidor de pàgines estàtiques GitHub
- APIs externes quan cal

Per descomptat, la senzillesa i la fiabilitat de l'arquitectura d'aquests llocs en principi és a costa d'algunes de les característiques dinàmiques del CMS. Per exemple, sense una base de dades, no sembla possible filtrar i visualitzar grans conjunts de dades o acceptar i processar continguts generats per usuaris com ara comentaris. O per exemple, una interfície web per oferir als clients una manera fàcil d'actualitzar i mantenir el contingut.

##Incorporació de serveis per a funcions avançades

Hom gestiona les funcionalitats que anteriorment demanava a una base de dades, com ara el maneig de contingut generat per l'usuari o la visualització de dades, mitjançant la delegació en serveis externs i la integració amb les seves APIs. La naturalesa de la web moderna fa això molt més fàcil que en el passat. Molts dels serveis que existeixen es centren en problemes específics. Flickr per a la gestió i la incrustació de fotos, de vídeo Vimeo i Twitter i Disqus per les respostes i comentaris. Aquests serveis tenen APIs o senzills "widgets" que incrusten el seu contingut en les pàgines web estàtiques per omplir els forats de la funcionalitat dinàmica.

Hom pot construir llocs web completament "client-side" que tenen aplicacions servidor avançades integrades per mitjà serveis externs dedicats. Si un servei falla, no afecta els altres o el contingut del lloc web.

##Plantilles i la generació de contingut HTML

Resulta que hom també pot invertir el procés de fer plantilles i la generació de fitxers. En el model anterior, es construia la carcassa d'una pàgina web amb la seva estructura i el disseny en un arxiu, i quan el navegador demanava aquesta pàgina web, inseriem el contingut de la base de dades en els llocs apropiats d'aquesta plantilla per generar dinàmicament l'arxiu HTML que necessitva el navegador.

Si ens centrem en la creació de llocs web "client-side", cal buscar solucions de plantilles que evitin la necessitat de la representació sota demanda. És a dir, aplicacions que generin continguts per endavant en lloc de per encàrrec. Una aplicació pot generar tots els arxius de sortida necessaris per al lloc web, utilitzant el mateix tipus de plantilles dinàmiques, en qüestió d'uns pocs segons o minuts. Llavors, podem organitzar els arxius estàtics resultants en gairebé qualsevol entorn.

##Rematant la fórmula amb Jekyll

- [Jekyll](http://jekyllrb.com/ "Jekyll &bull; Simple, blog-aware, static sites") per a plantilles de pàgina i la generació d'arxius estàtics
- Fitxers HTML, CSS i Javascript
- El servidor de pàgines estàtiques GitHub
- APIs externes quan cal

Per a plantilles i per a la generació de llocs web, hom pot emprar Jekyll, un projecte de codi obert iniciat a GitHub fa gairebé cinc anys. Jekyll emmagatzema tot el contingut en arxius de text simple. Les metadades que descriuen el contingut es troben sobre el contingut en el mateix arxiu de text. Aquestes metadades associades al contingut amb les plantilles de disseny, permeten un format avançat com ara el filtratge de categories o etiquetes, i podem emmagatzemar dades estructurades arbitràries com l'associació d'articles amb autors, fotos del moment, o qualsevol altra cosa que el desenvolupador de la plantilla estableixi.

##Administrant un web Jekyll de manera fàcil

Si volem que un tercer sense coneixements tècnics pugui mantenir i administrar un web creat amb Jekyll, cal trobar un editor de continguts amb interfície web. [Prose.io](http://prose.io/ "Prose &middot; A Content Editor for GitHub"), és un editor de continguts web específicament dissenyat per treballar bé amb Jekyll. Prose permet editar arxius de text allotjats a GitHub, on emmagatzemem el nostre codi. Ofereix una elegant interfície que se centra en l'escriptura. Els creadors de continguts poden anar a Prose.io per crear o editar mitjançant la seva senzilla interfície. Els canvis es desen directament a GitHub, que manté un registre de totes les versions de cada arxiu. Amb GitHub Pages hom pot allotjar llocs web Jekyll de forma gratuïta. Els canvis realitzats a través de Prose en un lloc GitHub s'insereixen automàticament al lloc web.

---

<p><small>Aquest article està fortament inspirat pel treball de Dave Cole a Development Seed: <cite><a href="http://developmentseed.org/blog/2012/07/27/build-cms-free-websites/" title="How We Build CMS-Free Websites | Development Seed" rel="external">How We Build CMS-Free Websites</a></cite></small>.</p>
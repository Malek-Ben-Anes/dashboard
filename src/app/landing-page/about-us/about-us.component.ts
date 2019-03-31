import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  aboutUs: AboutUs;
  constructor() {}

  ngOnInit() {

    this.aboutUs = new AboutUs();
    this.aboutUs.fondateur = 'MOT DU FONDATEUR DE L\'ÉCOLE';
    this.aboutUs.vision = 'Notre vision du projet éducatif';
    this.aboutUs.visionDescriptions = [
      'Dans le projet éducatif que nous proposons, nous comptons appliquer le programme de formation de l’école tunisienne et proposer aux enfants un curriculum enrichi favorisant un développement équilibré.',
      "L’établissement va accorder une grande importance à la qualité de la langue parlée et écrite. Grâce aux œuvres de différents auteurs, les élèves développeront leur esprit poétique et littéraire. L’établissement va accorder aussi une place prépondérante au développement de méthodes de travail efficaces chez les élèves en mettant l’accent sur l’apprentissage de la calligraphie française et arabe.",
      "Tout le programme répond aux objectifs méthodologiques imposés par le programme de l’Education nationale tunisien tout en enrichissant certains contenus afin d’offrir aux élèves une culture générale et mondiale diversifiée. Notre école propose également l'anglais comme une langue étrangère, dès le petit âge. À travers la filière trilingue que nous allons proposer, nous avons pour objectif d'amener nos élèves à grandir et à s'épanouir dans un environnement créatif et stimulant."
  ];
    this.aboutUs.promesse = 'Notre promesse';
    this.aboutUs.promesseDesc = 'Pour sa 1ère année Notre ambition est de les préparer à être des citoyens du monde de demain et de s\'ouvrir sur différentes cultures.';
    this.aboutUs.promesseDescPrimary = 'Notre promesse c’est de bienveillant vos enfants,,, Nos enfants.';
    this.aboutUs.system = 'SYSTÈME ÉDUCATIF';
    this.aboutUs.motDeResponsable = 'Mot de la responsable pédagogique';
    this.aboutUs.SystemeDescriptions = [
      "Pour sa 1ère année de création Plume d’or est un établissement d’enseignement trilingue qui offre un programme d’excellente qualité, avec des principes et des valeurs qui sont ceux du système éducatif tunisien, français et anglais.",
      "Notre école est un lieu d'instruction, un lieu d'intégration mais également un espace de relations et de bien vivre ensemble qui se tourne sur l'ouverture au Monde. De la Maternelle à la troisième année primaire, nous accueillons nos élèves pour leur permettre de progresser dans l'acquisition de leurs connaissances tout en veillant à l'épanouissement de chacun d'entre eux.",
      "Grâce à une rigueur exigeante, mais bienveillante, et à une forte implication des équipes pédagogiques, les élèves évoluent dans un contexte où ils se sentent reconnus et où ils peuvent construire leur personnalité, que ce soit sur le plan intellectuel, physique, culturel ou citoyen.",
      "Nous mettons tout en œuvre pour rendre chaque élève acteur de sa propre formation et lui donner une juste estime de soi. Pour cela, nous privilégions une pédagogie par projet qui vise également à développer chez l'enfant un esprit d'initiative, de coopération, d'autonomie ainsi que ses compétences civiques et sociales afin de le rendre responsable, capable d'exercer son esprit critique.",
      "Notre école veille à instaurer des liens d'étroite collaboration entre la famille et l'école, indispensables à la réussite scolaire des élèves. Pour cela, différents moyens sont mis en place : cahier de liaison mis à disposition de chaque élève, rencontre individualisée entre les parents et les enseignants selon un créneau horaire déterminé, réunions entre parents- enseignants, accès au site web de notre école. Ainsi, nous mobilisons toutes nos ressources et nos savoirs faire au service de l'enfant pour l'aider dès aujourd’hui à se bâtir un avenir solide et fructueux."
  ];
  }

  onSubmit(form: NgForm) {
    this.aboutUs.fondateur = form.value['fondateur'];
    this.aboutUs.vision = form.value['vision'];
    this.aboutUs.visionDescriptions = form.value['visionDescriptions'];
    this.aboutUs.promesse = form.value['promesse'];
    this.aboutUs.promesseDesc = form.value['promesseDesc'];
    this.aboutUs.promesseDescPrimary = form.value['promesseDescPrimary'];
    this.aboutUs.system = form.value['system'];
    this.aboutUs.motDeResponsable = form.value['motDeResponsable'];
    this.aboutUs.SystemeDescriptions = form.value['SystemeDescriptions'];
    console.log(this.aboutUs);
  }
}

class AboutUs {
  'fondateur': string;
  'vision': string;
  'visionDescriptions': string[];
  'promesse': string;
  'promesseDesc': string;
  'promesseDescPrimary': string;
  'system': string;
  'motDeResponsable': string;
  'SystemeDescriptions': string[];
}
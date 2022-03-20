const newsletter = {

  // On stocke comme propriété du module, la liste des domaine interdits
  forbiddenDomains : [
    '@yopmail.com',
    '@yopmail.fr',
    '@yopmail.net',
    '@cool.fr.nf',
    '@jetable.fr.nf',
    '@courriel.fr.nf',
    '@moncourrier.fr.nf',
    '@monemail.fr.nf',
    '@monmail.fr.nf',
    '@hide.biz.st',
    '@mymail.infos.st',
  ],

  // Propriétés contenant les messages d'erreur et de succès de l'inscription
  forbiddenEmailMessage : "Les adresses jetables ne sont pas admises",
  successfulMessage     : "Merci pour votre inscription !",

  // Initialisation du module
  init : function()
  {
    // Je récupère le bouton newsletter dans le menu en haut
    let newsletterToggleButtonElement = document.querySelector( "#newsletter-button" );
    
    // Je récupère la petite croix 
    let newsletterCloseButtonElement = document.querySelector( ".newsletter__close" );

    // On ajoute l'écouteur d'event sur les deux
    newsletterToggleButtonElement.addEventListener( "click", newsletter.handleToggleNewsletter );
    newsletterCloseButtonElement.addEventListener( "click", newsletter.handleToggleNewsletter );

    // Récupération de l'Element formulaire de la newsletter
    let newsletterFormElement = document.querySelector( ".newsletter > form" );

    // J'ajoute mon listener sur l'event submit
    newsletterFormElement.addEventListener( "submit", newsletter.handleNewsletterFormSubmit );
  },

  // Handler qui affiche ou masque l'encart Newsletter au clic sur le bouton ou la croix
  handleToggleNewsletter: function( evt )
  {
    // On empêche le navigateur de charger la page indiquée par le lien
    evt.preventDefault();
    // console.log( "Bouton newsletter cliqué !" );

    // Sélectionner l'encart newsletter (ici via sa classe)
    let newsletterElement = document.querySelector( ".newsletter" );
    // console.log( newsletterElement );

    // On active ou désactive la présence de la classe sur l'élement
    newsletterElement.classList.toggle( "newsletter--on" );
  },

  handleNewsletterFormSubmit: function( evt )
  {
    // On empêche le rechargement de la page a la soumission du formulaire
    evt.preventDefault();
// On cible l'input
    let newsletterInputElement = document.querySelector( "#subscriber-email" );
    
    // on récupère ce qui a été entré par l'user dans un champ input grace
   
    let userInputEmail = newsletterInputElement.value;
    // console.log( userInputEmail );

    // Vérifier si l'adresse mail est jetable
    let isForbidden = newsletter.isForbiddenEmail( userInputEmail );

    // Tester la valeur de retour de la fonction qui teste l'email
    if( isForbidden )
    {
      // On récupère où veut afficher le message
      let newsletterElement = document.querySelector( ".newsletter" );
      
      // On appelle la méthode addMessageToElement pour faire l'ajout de notre erreur
      messages.addMessageToElement( newsletter.forbiddenEmailMessage, newsletterElement );
    }  
    
    else
    {
      // On récupère où veut afficher le message
      let newsletterElement = document.querySelector( ".newsletter" );

      // On appelle notre nouvelle méthode qui affiche un message de succès
      messages.addSuccessMessageToElement( newsletter.successfulMessage, newsletterElement );
    }

    
    newsletterInputElement.value = "";
  },

  // Méthode qui renvoi true si l'adresse mail contient un domaine interdit
  isForbiddenEmail: function( inputEmail )
  {  
    // On parcours la liste des domaines interdits
    for( let domain of newsletter.forbiddenDomains )
    {
      // Vérifier si domain est contenu dans inputEmail
      // Pour ça, j'utilise .includes sur la chaine de l'email
      if( inputEmail.includes( domain ) )
      {
        // Dés qu'un domaine interdit est détecté, on s'arrête et on renvoi true
        // /!\ true ici indique que le domain est interdit 
        return true;
      }
    }
  
    // Si on a parcouru tout le tableau sans trouver de domaine interdit
    // C'est que l'adresse email est valide, on retourne donc false
    return false;
  }
}
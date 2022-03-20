const destinations = {

  // On va stocker le message d'erreur affiché lors du clic sur "favoris"
  notLoggedInUserMessage : "Vous devez être connecté pour gérer vos favoris",

  init: function()
  {
    // Récupérer l'ensemble des boutons "like" du site (dans la partie destinations)
    const heartButtons = document.querySelectorAll( ".btn__like" );

    // Ajouter l'event listener sur chacun d'eux
    for( heartButtonElement of heartButtons )
    {
      heartButtonElement.addEventListener( "click", destinations.handleHeartButtonClick );
    }
  },

  // Méthode handler du clic sur le bouton favoris
  handleHeartButtonClick: function( evt )
  {
    // On arrive ici sans forcément savoir quel bouton a été cliqué (on utilise evt) !
    
    // SAUF QUE, le bouton n'est pas l'élément sur lequel je souhaite ajouter mon erreur
    // Je veux l'ajouter sur l'article avec la classe .card qui contient ce bouton
    let clickedButtonCardParentElement = evt.target.closest( ".card" );
    // console.log( clickedButtonCardParentElement );

    // On affiche le message dans cet élément
    messages.addMessageToElement( destinations.notLoggedInUserMessage, clickedButtonCardParentElement );
  }
};


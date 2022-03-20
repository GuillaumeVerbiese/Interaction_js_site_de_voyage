// Module qui s'occupe du "filtrage" des commentaires 
// en fonction de leur note
const reviews = {

  init: function()
  {
    // On récupère les cases a cocher du filtre
    const ratingCheckboxes = document.querySelectorAll( 'input[name="rating"]' )
    console.log( ratingCheckboxes );

    // On parcourt chaque élement du tableau
    for( const ratingCheckboxElement of ratingCheckboxes )
    {
      // On y ajoute un écouteur de clic
      ratingCheckboxElement.addEventListener( "click", reviews.handleRatingFilterClick )
    }
  },

  // Méthode handler du clic sur les checkbox de filtre
  handleRatingFilterClick: function( evt )
  {
    // On récupère la case cliquée
    const clickedCheckboxElement = evt.currentTarget;

    // On récupère le nombre d'étoile correspondant a la case cliquée
    const ratingValue = clickedCheckboxElement.value;

    // On va appeller une autre méthode qu'on va coder dans le module
    // Qui va se charger d'afficher ou de masquer les commentaires correspondant a cette note
    reviews.toggleReviewsFromRating( ratingValue );
  },

  // Méthode qui va afficher ou masquer les commentaires selon leur notre
  toggleReviewsFromRating: function( filterRating )
  {

    // Récupérer tout les commentaires
    const reviews = document.querySelectorAll( ".review" );

    // Boucler sur chacun d'eux
    for( const reviewElement of reviews )
    {
      // Je récupère la valeur du dataset "rating" qui correpond a la note (et au nombre d'étoiles)
      let reviewRating = reviewElement.dataset.rating;

      // Je vérifie si cette valeur correspond a celle reçue en paramètre
      if( reviewRating == filterRating )
      {
        // Si c'est le cas, je "toggle" l'affichage de mon commentaire
        reviewElement.classList.toggle( "review--hidden" );
      }
    }


  }
}


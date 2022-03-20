// Module de gestion du theme du site
const theme = {

  // Initilisation
  init : function() 
  {
    // On sélectionne le bouton de changement de theme
    let themeSwitchButtonElement = document.querySelector( "#theme-switch" );

    // On place un écouteur d'event sur ce dernier
    themeSwitchButtonElement.addEventListener( "click", theme.handleToggleTheme )

    // On sélectionne les boutons de changement de couleur
    let colorButtons = document.querySelectorAll( ".theme-button" );
    // console.log( colorButtons );

    // On place un écouteur sur chaque Element du tableau (plus précisément de la NodeList)
    for( const colorButtonElement of colorButtons )
    {
      colorButtonElement.addEventListener( "click", theme.handleThemeColorClick );
    }

    // On charge le thème depuis le localStorage
    theme.loadTheme();
  },

  // Méthode de switch de theme
  handleToggleTheme: function( evt )
  {    
    // On commence par sélectionner la balise sur laquel on va modifier la classe
    const bodyElement = document.querySelector( "body" );

    // On ajoute / retire la classe theme-dark dessus
    bodyElement.classList.toggle( "theme-dark" );

    // On sauvegarde le thème qu'on vient d'activer
    theme.saveTheme();
  },

  // Méthode de changement de couleur
  handleThemeColorClick: function( evt )
  {
    // Récupérer l'id du bouton cliqué
    let clickedButtonId = evt.currentTarget.id;

    // On passe le nom du nouveau theme de couleur à la méthode qui modifie les classes
    theme.changeColorTheme( clickedButtonId );

    // On enregistre dans le localStorage le theme de couleur qu'on vient de choisir
    localStorage.setItem( "colorTheme", clickedButtonId );
  },

  // Méthode qui sauvegarde le theme choisi dans le localStorage
  saveTheme: function() 
  {
    // On récupère le body
    const bodyElement = document.querySelector( "body" );

    // On vérifie s'il possède la classe theme-dark
    let isDark = bodyElement.classList.contains( "theme-dark" );

    // Enfin, on sauvegarde "dark" dans le localStorage si le theme est actif, "light" sinon
    if( isDark )
    {
      localStorage.setItem( 'theme', 'dark' );
    }
    else
    {
      localStorage.setItem( 'theme', 'light' );
    }
  },

  // Méthode qui charge le thème choisi depuis le localStorage
  loadTheme: function()
  {
    // On lis le theme sauvegardé dans le localStorage
    const savedTheme = localStorage.getItem( 'theme' );

    if( savedTheme === "light" )
    {
      theme.handleToggleTheme();
    }

    // On fait pareil pour le theme de couleur
    const savedColorTheme = localStorage.getItem( "colorTheme" );

    // Si je n'ai jamais changé de theme de couleur, savedColorTheme sera null donc à gérer !
    if( savedColorTheme !== null )
    {
      theme.changeColorTheme( savedColorTheme );
    }
    // Sinon, on ne fait rien, ce qui laissera le theme de couleur par défaut
  },

  // Méthode qui change le theme de couleur appliqué au site
  changeColorTheme: function( themeColor )
  {
    // On récupère l'Element body
    const bodyElement = document.querySelector( "body" );

    // On supprime les éventuelles classes de theme déjà présente sur le body
    bodyElement.classList.remove( "theme-red", "theme-blue", "theme-green" );

    // On ajoute ensuite celle qui nous intéresse
    bodyElement.classList.add( themeColor );

    // On récupère l'image a modifier
    const logoElement = document.querySelector( ".logo__image" );

    // On modifie son attribut src, qu'on concatène avec le nom du theme
    logoElement.src = "img/logo-" + themeColor + ".png";
  }
}
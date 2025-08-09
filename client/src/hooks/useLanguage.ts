import { useState, useEffect } from 'react';

type Language = 'en' | 'fr';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const translations: Record<Language, Record<string, string>> = {
      en: {
        // Header
        'site.title': 'Celtic Voices',
        'site.tagline': 'Share Your Story',
        'nav.home': 'Home',
        'nav.contributions': 'Contributions',
        'nav.about': 'About',
        'auth.facebook': 'Facebook',
        'auth.google': 'Google',
        'auth.logout': 'Logout',
        
        // Hero section
        'hero.title': 'Share Your Voice with the Community',
        'hero.subtitle': 'Join our vibrant community where every contribution matters. Share your thoughts, stories, and insights with fellow members from around the world.',
        'hero.cta.contribute': 'Start Contributing',
        'hero.cta.browse': 'Browse Contributions',
        
        // Contribution form
        'form.title': 'Share Your Contribution',
        'form.subtitle': 'Express yourself with our rich text editor - no login required!',
        'form.author.name': 'Your Name (Optional)',
        'form.author.email': 'Email (Optional)',
        'form.contribution.title': 'Contribution Title',
        'form.contribution.content': 'Your Contribution',
        'form.category': 'Category',
        'form.preview': 'Preview',
        'form.publish': 'Publish Contribution',
        'form.placeholder.name': 'Anonymous Contributor',
        'form.placeholder.email': 'your.email@example.com',
        'form.placeholder.title': 'What\'s your contribution about?',
        'form.placeholder.content': 'Share your thoughts, experiences, or insights with the community. Use the toolbar above to format your text...',
        
        // Categories
        'category.story': 'Personal Story',
        'category.insight': 'Insight',
        'category.tip': 'Helpful Tip',
        'category.question': 'Question',
        'category.discussion': 'Discussion',
        'category.other': 'Other',
        'category.select': 'Select a category...',
        
        // Contributions grid
        'contributions.title': 'Community Contributions',
        'contributions.subtitle': 'Discover insights and stories shared by our vibrant community',
        'contributions.filter.all': 'All Categories',
        'contributions.filter.stories': 'Personal Stories',
        'contributions.filter.insights': 'Insights',
        'contributions.filter.tips': 'Helpful Tips',
        'contributions.filter.questions': 'Questions',
        'contributions.filter.discussions': 'Discussions',
        'contributions.sort.newest': 'Newest First',
        'contributions.sort.oldest': 'Oldest First',
        'contributions.sort.popular': 'Most Popular',
        'contributions.count': 'contributions found',
        'contributions.load_more': 'Load More Contributions',
        'contributions.read_more': 'Read More',
        'contributions.anonymous': 'Anonymous Contributor',
        
        // Footer
        'footer.description': 'A community platform where every voice matters. Share your thoughts, insights, and stories with fellow members from around the world in a welcoming, Celtic-inspired environment.',
        'footer.quick_links': 'Quick Links',
        'footer.support': 'Support',
        'footer.copyright': '© 2024 Celtic Voices. All rights reserved. Made with ❤️ for the community.',
        'footer.language_choice': 'Choose your language:',
        
        // Common
        'common.loading': 'Loading...',
        'common.error': 'An error occurred',
        'common.english': 'English',
        'common.french': 'Français',
      },
      fr: {
        // Header
        'site.title': 'Voix Celtiques',
        'site.tagline': 'Partagez Votre Histoire',
        'nav.home': 'Accueil',
        'nav.contributions': 'Contributions',
        'nav.about': 'À Propos',
        'auth.facebook': 'Facebook',
        'auth.google': 'Google',
        'auth.logout': 'Déconnexion',
        
        // Hero section
        'hero.title': 'Partagez Votre Voix avec la Communauté',
        'hero.subtitle': 'Rejoignez notre communauté dynamique où chaque contribution compte. Partagez vos pensées, histoires et perspectives avec des membres du monde entier.',
        'hero.cta.contribute': 'Commencer à Contribuer',
        'hero.cta.browse': 'Parcourir les Contributions',
        
        // Contribution form
        'form.title': 'Partagez Votre Contribution',
        'form.subtitle': 'Exprimez-vous avec notre éditeur de texte enrichi - aucune connexion requise !',
        'form.author.name': 'Votre Nom (Optionnel)',
        'form.author.email': 'Email (Optionnel)',
        'form.contribution.title': 'Titre de la Contribution',
        'form.contribution.content': 'Votre Contribution',
        'form.category': 'Catégorie',
        'form.preview': 'Aperçu',
        'form.publish': 'Publier la Contribution',
        'form.placeholder.name': 'Contributeur Anonyme',
        'form.placeholder.email': 'votre.email@exemple.com',
        'form.placeholder.title': 'De quoi parle votre contribution ?',
        'form.placeholder.content': 'Partagez vos pensées, expériences ou perspectives avec la communauté. Utilisez la barre d\'outils ci-dessus pour formater votre texte...',
        
        // Categories
        'category.story': 'Histoire Personnelle',
        'category.insight': 'Perspective',
        'category.tip': 'Conseil Utile',
        'category.question': 'Question',
        'category.discussion': 'Discussion',
        'category.other': 'Autre',
        'category.select': 'Sélectionnez une catégorie...',
        
        // Contributions grid
        'contributions.title': 'Contributions de la Communauté',
        'contributions.subtitle': 'Découvrez les perspectives et histoires partagées par notre communauté dynamique',
        'contributions.filter.all': 'Toutes les Catégories',
        'contributions.filter.stories': 'Histoires Personnelles',
        'contributions.filter.insights': 'Perspectives',
        'contributions.filter.tips': 'Conseils Utiles',
        'contributions.filter.questions': 'Questions',
        'contributions.filter.discussions': 'Discussions',
        'contributions.sort.newest': 'Plus Récent d\'Abord',
        'contributions.sort.oldest': 'Plus Ancien d\'Abord',
        'contributions.sort.popular': 'Plus Populaire',
        'contributions.count': 'contributions trouvées',
        'contributions.load_more': 'Charger Plus de Contributions',
        'contributions.read_more': 'Lire Plus',
        'contributions.anonymous': 'Contributeur Anonyme',
        
        // Footer
        'footer.description': 'Une plateforme communautaire où chaque voix compte. Partagez vos pensées, perspectives et histoires avec des membres du monde entier dans un environnement accueillant d\'inspiration celtique.',
        'footer.quick_links': 'Liens Rapides',
        'footer.support': 'Support',
        'footer.copyright': '© 2024 Voix Celtiques. Tous droits réservés. Fait avec ❤️ pour la communauté.',
        'footer.language_choice': 'Choisissez votre langue :',
        
        // Common
        'common.loading': 'Chargement...',
        'common.error': 'Une erreur s\'est produite',
        'common.english': 'English',
        'common.french': 'Français',
      },
    };

    return translations[language][key] || key;
  };

  return { language, setLanguage, t };
}

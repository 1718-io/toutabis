import { useLanguage } from '@/hooks/useLanguage';
import { Feather, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="bg-celtic-green-600 text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Feather className="text-celtic-green-600 text-lg" />
              </div>
              <div>
                <h4 className="text-xl font-celtic font-semibold" data-testid="text-footer-title">
                  {t('site.title')}
                </h4>
                <p className="text-celtic-green-100 text-sm" data-testid="text-footer-tagline">
                  {t('site.tagline')}
                </p>
              </div>
            </div>
            <p className="text-celtic-green-100 text-sm leading-relaxed mb-4" data-testid="text-footer-description">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-facebook">
                <Facebook className="text-lg h-5 w-5" />
              </a>
              <a href="#" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-twitter">
                <Twitter className="text-lg h-5 w-5" />
              </a>
              <a href="#" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-instagram">
                <Instagram className="text-lg h-5 w-5" />
              </a>
              <a href="#" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-linkedin">
                <Linkedin className="text-lg h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold mb-4" data-testid="text-quick-links-title">
              {t('footer.quick_links')}
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-footer-home">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#contributions" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-footer-contributions">
                  {t('nav.contributions')}
                </a>
              </li>
              <li>
                <a href="#contribute" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-footer-contribute">
                  {t('hero.cta.contribute')}
                </a>
              </li>
              <li>
                <a href="#" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-footer-guidelines">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-footer-about">
                  {t('nav.about')}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-semibold mb-4" data-testid="text-support-title">
              {t('footer.support')}
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-footer-help">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-footer-contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-footer-privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-footer-terms">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-celtic-green-100 hover:text-white transition-colors" data-testid="link-footer-moderation">
                  Content Moderation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-celtic-green-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-celtic-green-100 text-sm flex items-center" data-testid="text-copyright">
            {t('footer.copyright').replace('❤️', '')}
            <Heart className="text-red-400 mx-1 h-4 w-4 fill-current" />
            for the community.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-celtic-green-100 text-sm" data-testid="text-language-choice">
              {t('footer.language_choice')}
            </span>
            <button 
              onClick={() => setLanguage('en')}
              className={`text-sm transition-colors ${language === 'en' ? 'text-white' : 'text-celtic-green-100 hover:text-white'}`}
              data-testid="button-footer-english"
            >
              {t('common.english')}
            </button>
            <span className="text-celtic-green-300">|</span>
            <button 
              onClick={() => setLanguage('fr')}
              className={`text-sm transition-colors ${language === 'fr' ? 'text-white' : 'text-celtic-green-100 hover:text-white'}`}
              data-testid="button-footer-french"
            >
              {t('common.french')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

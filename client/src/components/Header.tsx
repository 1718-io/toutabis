import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from './ui/button';
import { ChevronDown, Globe, Feather, Home, ScrollText, Info, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

export function Header() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b-2 border-celtic-green-500" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3" data-testid="link-home">
            <div className="w-10 h-10 bg-celtic-green-500 rounded-lg flex items-center justify-center">
              <Feather className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-celtic font-semibold text-celtic-green-600" data-testid="text-site-title">
                {t('site.title')}
              </h1>
              <p className="text-xs text-gray-500 font-medium" data-testid="text-site-tagline">
                {t('site.tagline')}
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-celtic-green-600 hover:text-celtic-green-700 font-medium transition-colors flex items-center"
              data-testid="link-nav-home"
            >
              <Home className="mr-2 h-4 w-4" />
              {t('nav.home')}
            </Link>
            <a 
              href="#contributions" 
              className="text-gray-600 hover:text-celtic-green-600 font-medium transition-colors flex items-center"
              data-testid="link-nav-contributions"
            >
              <ScrollText className="mr-2 h-4 w-4" />
              {t('nav.contributions')}
            </a>
            <a 
              href="#about" 
              className="text-gray-600 hover:text-celtic-green-600 font-medium transition-colors flex items-center"
              data-testid="link-nav-about"
            >
              <Info className="mr-2 h-4 w-4" />
              {t('nav.about')}
            </a>
          </nav>

          {/* Language Switcher and Auth */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 border-gray-200 hover:border-celtic-green-300"
                data-testid="button-language-switcher"
              >
                <Globe className="text-celtic-green-500 h-4 w-4" />
                <span className="text-sm font-medium text-gray-700">
                  {language === 'en' ? 'EN' : 'FR'}
                </span>
                <ChevronDown className="text-xs text-gray-500 h-3 w-3" />
              </Button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setIsLanguageDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    data-testid="button-language-en"
                  >
                    {t('common.english')}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('fr');
                      setIsLanguageDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    data-testid="button-language-fr"
                  >
                    {t('common.french')}
                  </button>
                </div>
              )}
            </div>

            {/* Authentication Section */}
            <div className="flex items-center space-x-3">
              {isLoading ? (
                <div className="text-sm text-gray-500" data-testid="text-loading">
                  {t('common.loading')}
                </div>
              ) : isAuthenticated && user ? (
                <div className="flex items-center space-x-3" data-testid="user-profile">
                  <div className="flex items-center space-x-2">
                    {user.profileImageUrl ? (
                      <img 
                        src={user.profileImageUrl} 
                        alt="User profile" 
                        className="w-8 h-8 rounded-full object-cover"
                        data-testid="img-user-avatar"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-celtic-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user.firstName?.[0] || user.email?.[0] || 'U'}
                        </span>
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700" data-testid="text-user-name">
                      {user.firstName || user.email || 'User'}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = '/api/logout'}
                    data-testid="button-logout"
                  >
                    {t('auth.logout')}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => window.location.href = '/api/login'}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                    data-testid="button-login-facebook"
                  >
                    {t('auth.facebook')}
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/api/login'}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    size="sm"
                    data-testid="button-login-google"
                  >
                    {t('auth.google')}
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              data-testid="button-mobile-menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

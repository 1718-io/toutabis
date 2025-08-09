import { ContributionForm } from '@/components/ContributionForm';
import { ContributionsGrid } from '@/components/ContributionsGrid';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { PenTool, ScrollText } from 'lucide-react';

export default function Landing() {
  const { t } = useLanguage();

  const scrollToContributionForm = () => {
    document.getElementById('contribute')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const scrollToContributions = () => {
    document.getElementById('contributions')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen" data-testid="landing-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-celtic-green-50 to-celtic-gold-50 bg-celtic-pattern" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-celtic font-bold text-celtic-green-600 mb-6" data-testid="text-hero-title">
              {t('hero.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={scrollToContributionForm}
                className="px-8 py-3 bg-celtic-green-500 text-white rounded-lg hover:bg-celtic-green-600 transition-colors font-semibold text-lg shadow-lg"
                data-testid="button-hero-contribute"
              >
                <PenTool className="mr-2 h-5 w-5" />
                {t('hero.cta.contribute')}
              </Button>
              <Button
                onClick={scrollToContributions}
                variant="outline"
                className="px-8 py-3 border-2 border-celtic-green-500 text-celtic-green-600 rounded-lg hover:bg-celtic-green-50 transition-colors font-semibold text-lg"
                data-testid="button-hero-browse"
              >
                <ScrollText className="mr-2 h-5 w-5" />
                {t('hero.cta.browse')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contribution Form */}
      <ContributionForm />

      {/* Contributions Grid */}
      <ContributionsGrid />
    </div>
  );
}

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type Contribution, type User } from '@shared/schema';
import { useLanguage } from '@/hooks/useLanguage';
import { ContributionCard } from './ContributionCard';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollText, Plus } from 'lucide-react';

export function ContributionsGrid() {
  const { t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const { data: contributions, isLoading, error } = useQuery<(Contribution & { author?: User })[]>({
    queryKey: ['/api/contributions'],
  });

  const filteredAndSortedContributions = contributions
    ?.filter(contribution => 
      !categoryFilter || contribution.category === categoryFilter
    )
    ?.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
        case 'popular':
          return (b.likes || 0) - (a.likes || 0);
        case 'newest':
        default:
          return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
      }
    }) || [];

  if (isLoading) {
    return (
      <section id="contributions" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-celtic-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600" data-testid="text-loading">
              {t('common.loading')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="contributions" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600" data-testid="text-error">
              {t('common.error')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contributions" className="py-16 bg-gray-50" data-testid="contributions-grid-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-celtic font-bold text-celtic-green-600 mb-4" data-testid="text-contributions-title">
            {t('contributions.title')}
          </h3>
          <p className="text-gray-600 text-lg" data-testid="text-contributions-subtitle">
            {t('contributions.subtitle')}
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48" data-testid="select-category-filter">
                <SelectValue placeholder={t('contributions.filter.all')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('contributions.filter.all')}</SelectItem>
                <SelectItem value="story">{t('contributions.filter.stories')}</SelectItem>
                <SelectItem value="insight">{t('contributions.filter.insights')}</SelectItem>
                <SelectItem value="tip">{t('contributions.filter.tips')}</SelectItem>
                <SelectItem value="question">{t('contributions.filter.questions')}</SelectItem>
                <SelectItem value="discussion">{t('contributions.filter.discussions')}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48" data-testid="select-sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t('contributions.sort.newest')}</SelectItem>
                <SelectItem value="oldest">{t('contributions.sort.oldest')}</SelectItem>
                <SelectItem value="popular">{t('contributions.sort.popular')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-gray-500 flex items-center" data-testid="text-contributions-count">
            <ScrollText className="mr-2 h-4 w-4" />
            <span>{filteredAndSortedContributions.length}</span> {t('contributions.count')}
          </div>
        </div>

        {/* Contributions Grid */}
        {filteredAndSortedContributions.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="contributions-grid">
              {filteredAndSortedContributions.map((contribution) => (
                <ContributionCard 
                  key={contribution.id} 
                  contribution={contribution}
                />
              ))}
            </div>

            {/* Load More Button - placeholder for pagination */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="px-8 py-3 border border-celtic-green-500 text-celtic-green-600 rounded-lg hover:bg-celtic-green-50 transition-colors font-semibold"
                data-testid="button-load-more"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t('contributions.load_more')}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12" data-testid="empty-state">
            <ScrollText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contributions found</h3>
            <p className="text-gray-500">Be the first to share your story with the community.</p>
          </div>
        )}
      </div>
    </section>
  );
}

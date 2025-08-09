import { type Contribution, type User } from '@shared/schema';
import { useLanguage } from '@/hooks/useLanguage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from './ui/button';
import { Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';

interface ContributionCardProps {
  contribution: Contribution & { author?: User };
}

export function ContributionCard({ contribution }: ContributionCardProps) {
  const { language, t } = useLanguage();
  const queryClient = useQueryClient();

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      story: 'bg-celtic-gold-100 text-celtic-gold-700',
      insight: 'bg-celtic-green-100 text-celtic-green-700',
      tip: 'bg-blue-100 text-blue-700',
      question: 'bg-purple-100 text-purple-700',
      discussion: 'bg-celtic-brown-100 text-celtic-brown-700',
      other: 'bg-gray-100 text-gray-700',
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      story: t('category.story'),
      insight: t('category.insight'),
      tip: t('category.tip'),
      question: t('category.question'),
      discussion: t('category.discussion'),
      other: t('category.other'),
    };
    return labels[category as keyof typeof labels] || category;
  };

  const likeMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('POST', `/api/contributions/${contribution.id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contributions'] });
    },
  });

  const formatRelativeTime = (date: Date | string) => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return formatDistanceToNow(parsedDate, {
      addSuffix: true,
      locale: language === 'fr' ? fr : enUS,
    });
  };

  const getAuthorName = () => {
    if (contribution.author) {
      return contribution.author.firstName || contribution.author.email || t('contributions.anonymous');
    }
    return contribution.authorName || t('contributions.anonymous');
  };

  const getAuthorInitials = () => {
    const name = getAuthorName();
    if (name === t('contributions.anonymous')) return 'AC';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <article 
      className="contribution-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
      data-testid={`card-contribution-${contribution.id}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {contribution.author?.profileImageUrl ? (
              <img 
                src={contribution.author.profileImageUrl} 
                alt="Author profile" 
                className="w-10 h-10 rounded-full object-cover"
                data-testid={`img-author-avatar-${contribution.id}`}
              />
            ) : (
              <div className="w-10 h-10 bg-celtic-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm" data-testid={`text-author-initials-${contribution.id}`}>
                  {getAuthorInitials()}
                </span>
              </div>
            )}
            <div>
              <h4 className="font-semibold text-gray-900 text-sm" data-testid={`text-author-name-${contribution.id}`}>
                {getAuthorName()}
              </h4>
              <p className="text-xs text-gray-500" data-testid={`text-created-at-${contribution.id}`}>
                {formatRelativeTime(contribution.createdAt!)}
              </p>
            </div>
          </div>
          <span 
            className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryBadgeColor(contribution.category)}`}
            data-testid={`badge-category-${contribution.id}`}
          >
            {getCategoryLabel(contribution.category)}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2" data-testid={`text-title-${contribution.id}`}>
          {contribution.title}
        </h3>
        
        <div 
          className="text-gray-600 text-sm mb-4 line-clamp-3"
          data-testid={`text-excerpt-${contribution.id}`}
        >
          {contribution.excerpt}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => likeMutation.mutate()}
              disabled={likeMutation.isPending}
              className="flex items-center space-x-1 hover:text-celtic-green-600 transition-colors p-0 h-auto"
              data-testid={`button-like-${contribution.id}`}
            >
              <Heart className="h-4 w-4" />
              <span data-testid={`text-likes-${contribution.id}`}>{contribution.likes}</span>
            </Button>
            <button 
              className="flex items-center space-x-1 hover:text-celtic-green-600 transition-colors"
              data-testid={`button-comment-${contribution.id}`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>0</span>
            </button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-celtic-green-600 hover:text-celtic-green-700 font-medium text-sm transition-colors p-0 h-auto"
            data-testid={`button-read-more-${contribution.id}`}
          >
            {t('contributions.read_more')} <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </article>
  );
}

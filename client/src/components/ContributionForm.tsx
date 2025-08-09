import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertContributionSchema } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { RichTextEditor } from './ui/rich-text-editor';
import { PenTool, User, Mail, Heading, Edit, Tag, Eye, Send } from 'lucide-react';
import { z } from 'zod';

const contributionFormSchema = insertContributionSchema.extend({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
});

type ContributionFormData = z.infer<typeof contributionFormSchema>;

export function ContributionForm() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContributionFormData>({
    resolver: zodResolver(contributionFormSchema),
    defaultValues: {
      title: '',
      content: '',
      category: '',
      authorName: '',
      authorEmail: '',
    },
  });

  const createContributionMutation = useMutation({
    mutationFn: async (data: ContributionFormData) => {
      const response = await apiRequest('POST', '/api/contributions', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your contribution has been published successfully.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contributions'] });
      
      // Scroll to contributions section
      const contributionsSection = document.getElementById('contributions');
      if (contributionsSection) {
        contributionsSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to publish your contribution. Please try again.",
        variant: "destructive",
      });
      console.error('Error creating contribution:', error);
    },
  });

  const onSubmit = (data: ContributionFormData) => {
    createContributionMutation.mutate(data);
  };

  return (
    <section id="contribute" className="py-16 bg-white" data-testid="contribution-form-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-celtic font-bold text-celtic-green-600 mb-4" data-testid="text-form-title">
            {t('form.title')}
          </h3>
          <p className="text-gray-600 text-lg" data-testid="text-form-subtitle">
            {t('form.subtitle')}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 celtic-corner">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contribution">
              {/* Author Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="authorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-semibold text-gray-700">
                        <User className="mr-2 text-celtic-green-500 h-4 w-4" />
                        {t('form.author.name')}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder={t('form.placeholder.name')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-celtic-green-500 focus:border-transparent transition-all"
                          data-testid="input-author-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="authorEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-semibold text-gray-700">
                        <Mail className="mr-2 text-celtic-green-500 h-4 w-4" />
                        {t('form.author.email')}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          placeholder={t('form.placeholder.email')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-celtic-green-500 focus:border-transparent transition-all"
                          data-testid="input-author-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-semibold text-gray-700">
                      <Heading className="mr-2 text-celtic-green-500 h-4 w-4" />
                      {t('form.contribution.title')}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder={t('form.placeholder.title')}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-celtic-green-500 focus:border-transparent transition-all text-lg"
                        data-testid="input-contribution-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rich Text Editor */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-semibold text-gray-700">
                      <Edit className="mr-2 text-celtic-green-500 h-4 w-4" />
                      {t('form.contribution.content')}
                    </FormLabel>
                    <FormControl>
                      <RichTextEditor 
                        content={field.value}
                        onChange={field.onChange}
                        placeholder={t('form.placeholder.content')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Selection */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-semibold text-gray-700">
                      <Tag className="mr-2 text-celtic-green-500 h-4 w-4" />
                      {t('form.category')}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-celtic-green-500 focus:border-transparent transition-all" data-testid="select-category">
                          <SelectValue placeholder={t('category.select')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="story">{t('category.story')}</SelectItem>
                        <SelectItem value="insight">{t('category.insight')}</SelectItem>
                        <SelectItem value="tip">{t('category.tip')}</SelectItem>
                        <SelectItem value="question">{t('category.question')}</SelectItem>
                        <SelectItem value="discussion">{t('category.discussion')}</SelectItem>
                        <SelectItem value="other">{t('category.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button 
                  type="button" 
                  variant="outline"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  data-testid="button-preview"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  {t('form.preview')}
                </Button>
                <Button 
                  type="submit" 
                  disabled={createContributionMutation.isPending}
                  className="px-8 py-3 bg-celtic-green-500 text-white rounded-lg hover:bg-celtic-green-600 transition-colors font-semibold shadow-lg disabled:opacity-50"
                  data-testid="button-submit"
                >
                  {createContributionMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t('form.publish')}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

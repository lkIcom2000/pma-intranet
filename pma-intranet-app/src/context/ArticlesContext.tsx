import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image?: string;
  category: string;
  readTime: number;
  date: string;
}

interface ArticlesContextType {
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  addArticle: (article: Omit<Article, 'id' | 'date'>) => void;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export const ArticlesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  const addArticle = (newArticle: Omit<Article, 'id' | 'date'>) => {
    const article: Article = {
      ...newArticle,
      id: articles.length + 1,
      date: new Date().toISOString().split('T')[0],
    };
    setArticles(prev => [article, ...prev]);
  };

  return (
    <ArticlesContext.Provider value={{ articles, setArticles, addArticle }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
};

export default ArticlesContext; 
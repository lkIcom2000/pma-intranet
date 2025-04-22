import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
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
  // Initialize state from localStorage if available
  const [articles, setArticles] = useState<Article[]>(() => {
    const savedArticles = localStorage.getItem('articles');
    return savedArticles ? JSON.parse(savedArticles) : [];
  });

  // Save articles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
  }, [articles]);

  const addArticle = (newArticle: Omit<Article, 'id' | 'date'>) => {
    const article: Article = {
      ...newArticle,
      id: String(Date.now()), // Use timestamp for unique ID
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
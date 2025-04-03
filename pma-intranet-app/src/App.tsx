import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme';
import MainLayout from './layouts/MainLayout';
import ArticlesOverview from './pages/ArticlesOverview';
import CreateArticle from './pages/CreateArticle';
import ImportData from './pages/ImportData';
import AnswerQuestion from './pages/AnswerQuestion';
import { ArticlesProvider } from './context/ArticlesContext';
import { ImportHistoryProvider } from './context/ImportHistoryContext';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ArticlesProvider>
        <ImportHistoryProvider>
          <Router>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/articles" replace />} />
                <Route path="/articles" element={<ArticlesOverview />} />
                <Route path="/articles/create" element={<CreateArticle />} />
                <Route path="/import" element={<ImportData />} />
                <Route path="/answer-question" element={<AnswerQuestion />} />
              </Routes>
            </MainLayout>
          </Router>
        </ImportHistoryProvider>
      </ArticlesProvider>
    </ThemeProvider>
  );
};

export default App;

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme';
import MainLayout from './layouts/MainLayout';
import ArticlesOverview from './pages/ArticlesOverview';
import CreateArticle from './pages/CreateArticle';
import ImportData from './pages/ImportData';
import AnswerQuestion from './pages/AnswerQuestion';
import Settings from './pages/Settings';
import SubmitMood from './pages/SubmitMood';
import { ArticlesProvider } from './context/ArticlesContext';
import { ImportHistoryProvider } from './context/ImportHistoryContext';
import { SettingsProvider } from './context/SettingsContext';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ArticlesProvider>
        <ImportHistoryProvider>
          <SettingsProvider>
            <Router>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/articles" replace />} />
                  <Route path="/articles" element={<ArticlesOverview />} />
                  <Route path="/articles/create" element={<CreateArticle />} />
                  <Route path="/import" element={<ImportData />} />
                  <Route path="/answer-question" element={<AnswerQuestion />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/submit-mood" element={<SubmitMood />} />
                </Routes>
              </MainLayout>
            </Router>
          </SettingsProvider>
        </ImportHistoryProvider>
      </ArticlesProvider>
    </ThemeProvider>
  );
};

export default App;

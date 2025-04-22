import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  CardActions,
  Paper,
} from '@mui/material';
import {
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import { useArticles } from '../context/ArticlesContext';
import { useSettings } from '../context/SettingsContext';
import ArticleCard from '../components/ArticleCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

const ArticlesOverview: React.FC = () => {
  const { articles, setArticles } = useArticles();
  const { showTeamEnergyLevel, showTribeHealth, currentQuestionIndex, setCurrentQuestionIndex } = useSettings();
  const [csvData, setCSVData] = useState<any[]>([]);
  const [dailyQuestion, setDailyQuestion] = useState<string>("");
  const [allQuestions, setAllQuestions] = useState<string[]>([]);

  // Load daily question from text file
  useEffect(() => {
    fetch('/data/daily-questions.txt')
      .then(response => response.text())
      .then(text => {
        // Get all lines from the file and filter out empty lines
        const questions = text.split('\n').filter(line => line.trim() !== '');
        setAllQuestions(questions);
        
        // Set the current question based on the index
        if (questions.length > 0) {
          const index = currentQuestionIndex % questions.length;
          setDailyQuestion(questions[index]);
        }
      })
      .catch(error => {
        console.error('Error loading daily question:', error);
        setDailyQuestion("What means productive in an agile context?");
      });
  }, [currentQuestionIndex]);

  // Only load sample articles if there are no articles in the context
  useEffect(() => {
    if (articles.length === 0) {
      console.log('No articles found, loading sample data');
      const sampleArticles = [
        {
          id: '1',
          title: "Sprint Review Highlights Q1",
          excerpt: "Key achievements and learnings from our first quarter sprint reviews. Teams demonstrated significant progress in project deliverables and process improvements.",
          content: "Full content here...",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800",
          category: "Sprint Review",
          readTime: 5,
          date: "2024-03-15"
        },
        {
          id: '2',
          title: "New Team Building Workshop Series",
          excerpt: "Introducing our monthly team building workshops focused on enhancing collaboration and communication within our agile teams.",
          content: "Full content here...",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800",
          category: "Team Development",
          readTime: 3,
          date: "2024-03-14"
        },
        {
          id: '3',
          title: "Tech Stack Update 2024",
          excerpt: "Overview of our updated technology stack and new tools being implemented across development teams to improve efficiency.",
          content: "Full content here...",
          image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800",
          category: "Technology",
          readTime: 7,
          date: "2024-03-13"
        },
        {
          id: '4',
          title: "Agile Best Practices Guide",
          excerpt: "A comprehensive guide to our agile methodologies and best practices for maintaining high-performance team dynamics.",
          content: "Full content here...",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800",
          category: "Agile",
          readTime: 8,
          date: "2024-03-12"
        },
        {
          id: '5',
          title: "Innovation Week Results",
          excerpt: "Highlights from our recent innovation week, featuring creative solutions and prototypes developed by our teams.",
          content: "Full content here...",
          image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800",
          category: "Innovation",
          readTime: 4,
          date: "2024-03-11"
        }
      ];

      setArticles(sampleArticles);
    } else {
      console.log('Articles found in context:', articles.length);
    }
  }, [articles.length, setArticles]);

  // Sample data for demonstration - replace with actual CSV data
  const sampleData = [
    { 
      Team: 'Team A',
      'Anzahl Risiken': 5,
      'SP Sprint Abweichung': 2.5,
      'Anzahl Impediments': 3
    },
    { 
      Team: 'Team B',
      'Anzahl Risiken': 3,
      'SP Sprint Abweichung': 1.8,
      'Anzahl Impediments': 2
    },
    { 
      Team: 'Team C',
      'Anzahl Risiken': 7,
      'SP Sprint Abweichung': 3.2,
      'Anzahl Impediments': 4
    },
    { 
      Team: 'Team D',
      'Anzahl Risiken': 4,
      'SP Sprint Abweichung': 2.0,
      'Anzahl Impediments': 3
    }
  ];

  // Transform data for the chart
  const chartData = [
    {
      name: 'Anzahl Risiken',
      'Team A': 5,
      'Team B': 3,
      'Team C': 7,
      'Team D': 4
    },
    {
      name: 'SP Sprint Abweichung',
      'Team A': 2.5,
      'Team B': 1.8,
      'Team C': 3.2,
      'Team D': 2.0
    },
    {
      name: 'Anzahl Impediments',
      'Team A': 3,
      'Team B': 2,
      'Team C': 4,
      'Team D': 3
    }
  ];

  return (
    <Box sx={{ pt: 4 }}>
      {/* Data Dashboard Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Data Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Team Energy Level Panel */}
          {showTeamEnergyLevel && (
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Team Energy Level
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center', 
                  alignItems: 'center',
                  flexGrow: 1
                }}>
                  <Box
                    component="img"
                    src="/battery-status.png"
                    alt="Team Energy Level"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      objectFit: 'contain',
                      mb: 2
                    }}
                  />
                  <Typography variant="subtitle1" color="text.secondary" align="center">
                    Our available Energy
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          )}

          {/* Tribe Health Panel */}
          {showTribeHealth && (
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Tribe Health
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="Team A" stackId="a" fill="#8884d8" />
                      <Bar dataKey="Team B" stackId="a" fill="#82ca9d" />
                      <Bar dataKey="Team C" stackId="a" fill="#ffc658" />
                      <Bar dataKey="Team D" stackId="a" fill="#ff8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          )}

          {/* Articles Grid */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {articles.map((article, index) => (
                <React.Fragment key={article.id}>
                  {/* Render first 4 articles */}
                  {index < 4 && (
                    <Grid item xs={12} sm={6} md={4}>
                      <ArticleCard article={article} />
                    </Grid>
                  )}

                  {/* Insert Question of the Day after 4th article */}
                  {index === 3 && (
                    <Grid item xs={12} sm={12} md={8}>
                      <Paper sx={{ 
                        p: 3, 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        minHeight: '300px',
                      }}>
                        <Typography variant="h6" gutterBottom>
                          Question of the Day
                        </Typography>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexGrow: 1
                        }}>
                          <Typography variant="h5" color="text.secondary" align="center">
                            {dailyQuestion}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  )}

                  {/* Render remaining articles */}
                  {index >= 4 && (
                    <Grid item xs={12} sm={6} md={4}>
                      <ArticleCard article={article} />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ArticlesOverview; 
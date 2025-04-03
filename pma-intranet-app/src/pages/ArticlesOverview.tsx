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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

const ArticlesOverview: React.FC = () => {
  const { articles, setArticles } = useArticles();
  const [csvData, setCSVData] = useState<any[]>([]);

  // Sample articles data
  useEffect(() => {
    const sampleArticles = [
      {
        id: 1,
        title: "Sprint Review Highlights Q1",
        excerpt: "Key achievements and learnings from our first quarter sprint reviews. Teams demonstrated significant progress in project deliverables and process improvements.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800",
        category: "Sprint Review",
        readTime: 5,
        date: "2024-03-15"
      },
      {
        id: 2,
        title: "New Team Building Workshop Series",
        excerpt: "Introducing our monthly team building workshops focused on enhancing collaboration and communication within our agile teams.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800",
        category: "Team Development",
        readTime: 3,
        date: "2024-03-14"
      },
      {
        id: 3,
        title: "Tech Stack Update 2024",
        excerpt: "Overview of our updated technology stack and new tools being implemented across development teams to improve efficiency.",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800",
        category: "Technology",
        readTime: 7,
        date: "2024-03-13"
      },
      {
        id: 4,
        title: "Agile Best Practices Guide",
        excerpt: "A comprehensive guide to our agile methodologies and best practices for maintaining high-performance team dynamics.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800",
        category: "Agile",
        readTime: 8,
        date: "2024-03-12"
      },
      {
        id: 5,
        title: "Innovation Week Results",
        excerpt: "Highlights from our recent innovation week, featuring creative solutions and prototypes developed by our teams.",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800",
        category: "Innovation",
        readTime: 4,
        date: "2024-03-11"
      }
    ];

    setArticles(sampleArticles);
  }, [setArticles]);

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
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
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
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
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
      </Grid>

      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <React.Fragment key={article.id}>
            {/* Render first 4 articles */}
            {index < 4 && (
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {article.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={article.image}
                      alt={article.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {article.excerpt}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip label={article.category} size="small" />
                      <Chip label={`${article.readTime} min read`} size="small" />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(article.date).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton size="small">
                      <ShareIcon />
                    </IconButton>
                    <IconButton size="small">
                      <BookmarkIcon />
                    </IconButton>
                  </CardActions>
                </Card>
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
                      What means productive in an agile context?
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            )}

            {/* Render remaining articles */}
            {index >= 4 && (
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {article.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={article.image}
                      alt={article.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {article.excerpt}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip label={article.category} size="small" />
                      <Chip label={`${article.readTime} min read`} size="small" />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(article.date).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton size="small">
                      <ShareIcon />
                    </IconButton>
                    <IconButton size="small">
                      <BookmarkIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default ArticlesOverview; 
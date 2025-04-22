import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
  Button,
  Grid,
} from '@mui/material';
import { useSettings } from '../context/SettingsContext';
import { Refresh as RefreshIcon } from '@mui/icons-material';

const Settings: React.FC = () => {
  const {
    showTeamEnergyLevel,
    showTribeHealth,
    toggleTeamEnergyLevel,
    toggleTribeHealth,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useSettings();
  
  const [allQuestions, setAllQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");

  // Load questions from text file
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
          setCurrentQuestion(questions[index]);
        }
      })
      .catch(error => {
        console.error('Error loading questions:', error);
        setCurrentQuestion("What means productive in an agile context?");
      });
  }, [currentQuestionIndex]);

  const handleChangeQuestion = () => {
    if (allQuestions.length > 0) {
      // Calculate the next index, ensuring it wraps around
      const nextIndex = (currentQuestionIndex + 1) % allQuestions.length;
      console.log('Changing question index from', currentQuestionIndex, 'to', nextIndex);
      setCurrentQuestionIndex(nextIndex);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Module Settings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Control which modules are visible in the dashboard
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showTeamEnergyLevel}
                onChange={toggleTeamEnergyLevel}
                color="primary"
              />
            }
            label="Team Energy Level"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
            Display the team energy level metrics in the dashboard
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={showTribeHealth}
                onChange={toggleTribeHealth}
                color="primary"
              />
            }
            label="Tribe Health"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 3 }}>
            Display the tribe health metrics in the dashboard
          </Typography>
        </FormGroup>
        
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Question of the Day
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Change the daily question displayed on the overview page
        </Typography>
        
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} md={8}>
            <Paper variant="outlined" sx={{ p: 2, minHeight: 60, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1">
                {currentQuestion}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleChangeQuestion}
              fullWidth
            >
              Change Question
            </Button>
          </Grid>
        </Grid>
        
        <Typography variant="body2" color="text.secondary">
          Question {currentQuestionIndex + 1} of {allQuestions.length}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Settings; 
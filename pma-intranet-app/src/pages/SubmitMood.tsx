import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const SubmitMood: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  // Handle cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown && cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime(prev => prev - 1);
      }, 1000);
    } else if (cooldownTime === 0) {
      setCooldown(false);
    }
    return () => clearInterval(timer);
  }, [cooldown, cooldownTime]);

  const handleMoodSelect = (mood: number) => {
    // If in cooldown, don't allow selection
    if (cooldown) {
      return;
    }

    // Set the selected mood
    setSelectedMood(mood);
    
    // Show success message
    setShowSuccess(true);
    
    // Start cooldown timer (30 seconds)
    setCooldown(true);
    setCooldownTime(30);
    
    // Here you would typically send the mood to your backend
    console.log(`Selected mood: ${mood}`);
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  const moodButtons = [
    {
      icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60 }} />,
      label: 'Sehr unzufrieden',
      value: 1,
      color: '#f44336',
    },
    {
      icon: <SentimentDissatisfiedIcon sx={{ fontSize: 60 }} />,
      label: 'Unzufrieden',
      value: 2,
      color: '#ff9800',
    },
    {
      icon: <SentimentSatisfiedIcon sx={{ fontSize: 60 }} />,
      label: 'Zufrieden',
      value: 3,
      color: '#4caf50',
    },
    {
      icon: <SentimentVerySatisfiedIcon sx={{ fontSize: 60 }} />,
      label: 'Sehr zufrieden',
      value: 4,
      color: '#2196f3',
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Wie fühlst du dich heute?
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Wähle deine aktuelle Stimmung aus
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {moodButtons.map((mood) => (
            <Grid item xs={6} sm={3} key={mood.value}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleMoodSelect(mood.value)}
                disabled={cooldown}
                sx={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  p: 2,
                  borderColor: mood.color,
                  color: mood.color,
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: `${mood.color}20`,
                    borderColor: mood.color,
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(0, 0, 0, 0.38)',
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                  },
                }}
              >
                {mood.icon}
                <Typography variant="body2">{mood.label}</Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
        
        {cooldown && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="body2" color="text.secondary">
              Du kannst deine Stimmung in {cooldownTime} Sekunden erneut abgeben
            </Typography>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Danke für dein Feedback!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SubmitMood; 
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  CardActions,
  IconButton,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';

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

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
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
  );
};

export default ArticleCard; 
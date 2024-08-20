import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

const ItemCard = ({ title, date, image, price, ingredients }) => {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 345, margin: 2, position: 'relative' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent>
          <IconButton
            aria-label={`bookmark ${title}`}
            color="primary"
            size="small"
            sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
          >
            <BookmarkAdd />
          </IconButton>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ingredients}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {date}
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ marginTop: 1 }}>
            Price: {price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;

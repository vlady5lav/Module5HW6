/* eslint-disable @typescript-eslint/no-unused-vars */

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCTypes, useInjection } from '../../ioc';
import { AuthStore, CartStore } from '../../stores';

interface Props {
  productInfo: {
    id: number;
    image?: string;
    manufacturer?: string;
    model?: string;
    modelDescription?: string;
    price?: number;
    count: number;
  } | null;
}

export const ProductCard = observer((props: Props) => {
  const navigate = useNavigate();
  const store = useInjection<CartStore>(IoCTypes.cartStore);
  const authStore = useInjection<AuthStore>(IoCTypes.authStore);
  const cartStore = useInjection<CartStore>(IoCTypes.cartStore);

  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    cartStore.updateCartState();
  }, [cartStore, authStore.isAuthorized]);

  if (!props.productInfo) {
    return null;
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { id, image, manufacturer, model, modelDescription, price, count } = props.productInfo;

  return (
    <Card sx={{ width: 350 }}>
      <CardHeader
        avatar={<Avatar src={`${process.env.PUBLIC_URL}/logo512.png`} />}
        action={
          <IconButton onClick={() => navigate(`/products/${id}`, { replace: false })}>
            <MoreVertIcon />
          </IconButton>
        }
        title={model}
        subheader={manufacturer}
      />
      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <CardMedia
          component="img"
          image={`${process.env.PUBLIC_URL}/${image}`}
          alt={`${manufacturer} ${model}`}
          onClick={() => navigate(`/products/${id}`, { replace: false })}
          sx={{ height: 200, width: 'auto', objectFit: 'cover', backgroundSize: 'cover' }}
        />
      </CardContent>
      <CardContent sx={{ textAlign: 'right' }}>
        <Typography>{price} UAH</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        {count <= 0 && (
          <IconButton
            onClick={() => {
              store.addItem(id);
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        )}
        {count > 0 && (
          <ButtonGroup>
            <Button
              onClick={() => {
                store.removeItem(id);
              }}
            >
              -
            </Button>
            <Button disabled>{count}</Button>
            <Button
              onClick={() => {
                store.addItem(id);
              }}
            >
              +
            </Button>
          </ButtonGroup>
        )}
        <Button sx={{ transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)' }} onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </Button>
      </CardActions>
      <Collapse in={expanded} unmountOnExit>
        <CardContent>
          <Typography textAlign="justify">{modelDescription}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
});

export default ProductCard;

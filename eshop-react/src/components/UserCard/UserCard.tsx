import { observer } from 'mobx-react';
import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: {
    id: number;
    avatar?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
  } | null;
}

const UserCard = observer((props: Props) => {
  const navigate = useNavigate();

  if (!props.user) {
    return null;
  }

  const { id, email, first_name, last_name, avatar, username } = props.user;

  return (
    <Card key={id} style={{ textAlign: 'center' }}>
      <Card.Header>{id ? React.createElement('span', '', `ID: ${id}`) : React.createElement('span', { className: 'hidden' }, 'hiddenText')}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" className="avatar" src={avatar} onClick={() => navigate(`/users/${id}`, { replace: true })} />
        <Card.Title>{first_name}</Card.Title>
        <Card.Subtitle>{last_name}</Card.Subtitle>
        <Card.Text>
          aka
          <br />
          <strong>&quot;{username}&quot;</strong>
        </Card.Text>
      </Card.Body>
      <Card.Footer>{email}</Card.Footer>
    </Card>
  );
});

export default UserCard;

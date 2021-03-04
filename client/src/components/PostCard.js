import React, { useContext } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const PostCard = ({ post: { body, id, likeCount, commentCount, likes } }) => {
  const { user } = useContext(AuthContext);

  const likePost = () => {
    console.log(likes);
  };

  const commentOnPost = () => {
    console.log(commentOnPost);
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>Molly Thomas</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          New User
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
          <Button color='blue' basic>
            <Icon name='comments' />
          </Button>
          <Label basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
        {user && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;

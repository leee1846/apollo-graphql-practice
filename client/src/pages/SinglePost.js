import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, CardContent } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { Grid, Image, Button, Icon, Label } from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import DeleteButton from "./../components/DeleteButton";
import { useHistory } from "react-router-dom";

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const SinglePost = (props) => {
  const history = useHistory();
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  const { getPost } = data;

  const deletePostCallback = () => {
    history.push("/");
  };

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const { id, body, comments, likes, likeCount, commentCount } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              size='small'
              float='right'
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>이름</Card.Header>
                <Card.Meta>몇시간전...</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id: likeCount, likes }} />
                <Button
                  as='div'
                  labelPosition='right'
                  onClick={() => console.log("comment on post")}
                >
                  <Button basic color='blue'>
                    <Icon name='comments' />
                  </Button>
                  <Label basic color='blue' pointing='left'>
                    {commentCount}
                  </Label>
                </Button>
                {user && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>시간</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

export default SinglePost;

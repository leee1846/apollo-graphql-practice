import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Card } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { Grid, Image, Button, Icon, Label } from "semantic-ui-react";
import LikeButton from "../components/LikeButton";

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
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  console.log(postId);
  const {
    data: { getPost },
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const { id, body, comments, likes, likeCount, commentCount } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.column width={2}>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              size='small'
              float='right'
            />
          </Grid.column>
          <Grid.column width={10}>
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
            </Card.Content>
          </Grid.column>
        </Grid.Row>
      </Grid>
    );
  }

  return <div>ss</div>;
};

export default SinglePost;

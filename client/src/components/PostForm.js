import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { useMutation, gql } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

const PostForm = () => {
  const [onChange, onSubmit, values] = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const newData = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { ...data, getPosts: newData },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder='Hi World!'
            name='body'
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type='submit' color='teal'>
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className='ui error message'>
          <ul className='list'>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default PostForm;

import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { useMutation, gql } from "@apollo/client";

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

  const [createPost, {}] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(_, result) {
      console.log(result);
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder='Hi World!'
          name='body'
          onChange={onChange}
          value={values.body}
        />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

export default PostForm;

import {GraphQLClient, gql} from 'graphql-request';

// Badly formatted email for testing
const bad_email = "@@./x.dds";
// Good email
const good_email = "myemail@gmail.com";
// Password with no minimum of 8 characters
const bad_password_no_minimum = "babab";
// Password with no letters
const bad_password_no_letter = "";
// Password with no special character
const bad_password_no_special_char = "";
// Good password
const good_password = "mygoodpw1#";
// Email already in db --- make sure you have this if you try to do the test, otherwise it will pass
const good_email_but_in_db = "myemail@gmail.com";

const post_to_reg = async (email: string, password: string) => {
    const endpoint = "http://localhost:5000";


    // Initialize our client
    const graphQLClient = new GraphQLClient(endpoint, {});

    // Create the mutation string literal
    const mutation = gql`
    mutation ($email: String!, $password: String!){
        createUser(email: $email, password:$password){
          email
        }
      }
    `;
    // Fetch the data
      return await graphQLClient.request(mutation, {email, password});
};

export {
  bad_email,
  good_email,
  good_email_but_in_db,
  bad_password_no_minimum,
  bad_password_no_letter,
  bad_password_no_special_char,
  good_password,
  post_to_reg,
};

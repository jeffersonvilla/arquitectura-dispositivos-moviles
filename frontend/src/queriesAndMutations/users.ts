export const registerUserMutation = `
              mutation Register($username: String!, $email: String!, $password: String!) {
                register(username: $username, email: $email, password: $password)
              }
            `;


export const logingUserMutation = `
              mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password)
              }
            `;


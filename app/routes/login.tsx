import { Form } from "remix";

export default function Login() {
  return (
    <Form action="/auth/login" method="post">
      <button>Login with Auth0</button>
    </Form>
  );
}

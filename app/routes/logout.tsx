import { Form } from "remix";

export default function Logout() {
  return (
    <Form action="/auth/logout" method="post">
      <button>Logout </button>
    </Form>
  );
}

export { default } from "next-auth/middleware";

export const config = {
  macher: ["/issues/new", "/issues/edit/:id+"],
};

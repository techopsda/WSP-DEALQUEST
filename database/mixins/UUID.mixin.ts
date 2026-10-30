import { createMixin } from "schemix";

export default createMixin((UUIDMixin) => {
  UUIDMixin.string("id", {
    id: true,
    raw: `@default(dbgenerated("gen_random_uuid()")) @database.Uuid`,
  });
});

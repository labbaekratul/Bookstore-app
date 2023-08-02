import { BookInputs } from "./interfaces";
import { bookSchema, transactionSchema } from "../utils/validator";

export const validator = (
  schema: typeof bookSchema | typeof transactionSchema,
  input: BookInputs
) => {
  const data = schema.body.safeParse(input);
  let error;
  if (!data.success) {
    data.error.issues.map((err: any) => {
      error = err.message;
    });

    return { message: error };
  }
};

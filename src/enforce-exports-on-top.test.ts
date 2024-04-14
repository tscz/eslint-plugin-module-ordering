import { RuleTester } from "eslint";
import rule from "./enforce-exports-on-top";

const ruleTester = new RuleTester();

ruleTester.run("enforce-exports-on-top", rule, {
  valid: [
    {
      code: "const foo = 'bar';",
    },
    {
      code: `
        export const foo = 'bar';
        const bar = 'foo';
        `,
    },
  ],
  invalid: [
    {
      code: `
        const foo = 'bar';
        export const bar = 'foo';
        `,
      errors: [{ message: "All exports should be at the top of a file." }],
    },
  ],
});

console.log("All tests passed!");

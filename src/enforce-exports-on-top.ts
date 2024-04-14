import { Rule } from "eslint";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce that all exports are listed at the top of a module",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      "Program:exit": () => {
        let firstNonExportFound = false;

        for (const statement of context.sourceCode.ast.body) {
          switch (statement.type) {
            case "ExportNamedDeclaration":
            case "ExportDefaultDeclaration":
            case "ExportAllDeclaration":
              if (firstNonExportFound) {
                context.report({
                  node: statement,
                  message: "All exports should be at the top of a file.",
                });
              }
              continue;
            default:
              firstNonExportFound = true;
              break;
          }
        }
      },
    };
  },
};

export default rule;

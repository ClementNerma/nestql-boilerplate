import * as chalk from 'chalk';
import { matchString, panic, setupTypeScriptCore } from 'typescript-core';

export function setupEnv(): void {
  setupTypeScriptCore((prev) => ({
    defaultFormattingOptions: () => ({
      ...prev.defaultFormattingOptions(),

      missingParam: (position, message) =>
        panic(
          "Internal error: Missing parameter {} in panic message '{}'",
          position + 1,
          message,
        ),

      stringifyOptions: (devMode, context, prettify) => ({
        ...prev
          .defaultFormattingOptions()
          .stringifyOptions(devMode, context, prettify),

        highlighter: (type, content) => {
          if (process.argv.includes('--no-color')) {
            return content;
          }

          return matchString(type, {
            typename: () => chalk.yellow(content),
            prefix: () => chalk.cyan(content),
            unknown: () => chalk.yellowBright(content),
            unknownWrapper: () => chalk.magentaBright(content),
            unknownTypename: () => chalk.magentaBright(content),
            reference: () => chalk.blue(content),
            referenceWrapper: () => chalk.yellow(content),
            punctuation: () => chalk.cyan(content),
            listIndex: () => chalk.magenta(content),
            listValue: () => chalk.blue(content),
            collKey: () => chalk.magenta(content),
            collValue: () => chalk.blue(content),
            text: () => chalk.green(content),
            string: () => chalk.green(content),
            number: () => chalk.yellow(content),
            errorMessage: () => chalk.red(content),
            errorStack: () => chalk.red(content),
            remainingProperties: () => chalk.yellow(content),
            remainingPropertiesWrapper: () => chalk.blue(content),
            _: () => content,
          });
        },
      }),
    }),
  }));
}

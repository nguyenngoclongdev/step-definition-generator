[![CI](https://github.com/nguyenngoclongdev/cucumber-step-definition-generator/actions/workflows/pipelines.yml/badge.svg)](https://github.com/nguyenngoclongdev/cucumber-step-definition-generator/actions/workflows/pipelines.yml)

![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/nguyenngoclong.cypress-cucumber-step-definition-generator)
![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/nguyenngoclong.cypress-cucumber-step-definition-generator)
![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/nguyenngoclong.cypress-cucumber-step-definition-generator)
![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/nguyenngoclong.cypress-cucumber-step-definition-generator)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/nguyenngoclongdev/cucumber-step-definition-generator/)

# Cucumber Step Definition Generator

This extension is designed to help developers using the testing framework with Gherkin style feature files to generate step definitions more easily and efficiently. With just a few clicks, you can automatically generate step definitions for your feature files, saving you time and reducing the risk of errors.

This extension is maintained by the [Nguyen Ngoc Long](https://github.com/nguyenngoclongdev/).

# Installation

Get it from [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.cypress-cucumber-step-definition-generator).

Supported language & framework

<p align="center">
    <!-- JavaScript -->
    <a href="https://github.com/nguyenngoclongdev?tab=repositories" target="_blank">
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
    </a>
    <!-- Typescript -->
    <a href="https://github.com/nguyenngoclongdev?tab=repositories" target="_blank">
        <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
    </a>
</p>
<p align="center">
    <!-- Cypress -->
    <a href="https://github.com/nguyenngoclongdev?tab=repositories" target="_blank">
        <img src="https://img.shields.io/badge/-cypress-49666E?style=for-the-badge&logo=cypress&logoColor=white">
    </a>
    <!-- Cucumberjs -->
    <a href="https://github.com/nguyenngoclongdev?tab=repositories" target="_blank">
        <img src="https://img.shields.io/badge/Cucumber-55BB68?style=for-the-badge&logo=Cucumber&logoColor=white">
    </a>
      <!-- Playwright -->
    <a href="https://github.com/nguyenngoclongdev?tab=repositories" target="_blank">
        <img src="https://img.shields.io/badge/Playwright-314B58?style=for-the-badge&logo=Playwright&logoColor=white">
    </a>
</p>

# Features
-   [Generate step definition](#generate-step-definition) offers multiple options to generate step definitions.
- Automatically detecting various types of information, such as `DataTable`, `DocString`, `int`, `float`, `string`, and other types of information that are supported by **Gherkin Syntax**.
- Additionally, step definitions are de-duplicated when regenerating code, ensuring they remain organized and efficient, even when making changes to your testing scenario.

## Using the extension

You have multiple options when it comes to generating step definitions using this extension:
- The extension can generate the step definition and automatically create a new file for it.
- The extension can generate the step definition and copy it to the clipboard for easy access.
- Alternatively, you can use the Command Palette to generate step definitions directly from within the extension.

### Generate a step definition and create a new file

1. Open any .feature file in vs code editor
2. Right click on the editor and select `Cycucum: Generate step definitions to file`
3. If the file for the step definition doesn't exist, the extension will create it. Otherwise, if the file already exists, the extension will simply append the new step definition to the end of the existing file.

![Generate step definition](images/generate-step-definitions-in-explorer.gif)

### Generate a step definition and copy to clipboard

1. Open any .feature file in vs code editor
2. Right click on the editor and select `Cycucum: Generate step definitions to clipboard`

![Generate step definition](images/generate-step-definitions-to-clipboard.gif)

### Generate step definition from Command Palette

![Generate step definition](images/generate-step-definitions-from-cmd.png)

## Examples

```feature
Feature: Calculator
    As a user
    I want to use a calculator to add numbers
    So that I don't need to add myself

    Scenario: Add two numbers -2 & 3
        Given I have a calculator
        When I add "-2" and "3"
        Then the result should be "1"

    Scenario: Add two numbers 10 & 15
        Given I have a calculator
        When I add "10" and "15"
        Then the result should be "25"
```

```typescript
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given(`I have a calculator`, () => {
    // The use of 'Given' keyword is to put the system in a familiar state before the user starts interacting with the system.
});

When(`I add {string} and {string}`, (arg1: string, arg2: string) => {
    // When the step is to define action performed by the user.
});

Then(`the result should be {string}`, (arg1: string) => {
    // The use of 'Then' keyword is to see the outcome after the action in when step.
});
```

## Configuration

### Change the default language

You could change the default language to generate:

```json
{
    "cycucum.language": "typescript"
}
```

For the default language: It should be set with language id defined in VS Code. The languages you could set are `javascript`, `typescript`.

### Change the testing framework

```json
{
    "cycucum.runner": "cypress"
}
```

The testing framework you could set are `cypress`, `playwright`, `cucumberjs`.

## Feedback

I hope you find this extension useful for your testing projects, and I welcome any feedback or contributions to help make it even better.

If you discover a bug, or have a suggestion for a feature request, please
submit an [issue](https://github.com/nguyenngoclongdev/cucumber-step-definition-generator/issues).

## LICENSE

This extension is licensed under the [MIT License](LICENSE)

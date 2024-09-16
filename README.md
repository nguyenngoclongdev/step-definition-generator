[![CI](https://github.com/nguyenngoclongdev/step-definition-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/nguyenngoclongdev/step-definition-generator/actions/workflows/ci.yml)

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/nguyenngoclong.cypress-cucumber-step-definition-generator)](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.cypress-cucumber-step-definition-generator)
[![Open VSX Installs](https://img.shields.io/open-vsx/dt/nguyenngoclong/cypress-cucumber-step-definition-generator?color=%2396C41F&label=open-vsx)](https://open-vsx.org/extension/nguyenngoclong/cypress-cucumber-step-definition-generator)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/nguyenngoclong.cypress-cucumber-step-definition-generator?label=vs-marketplace)](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.cypress-cucumber-step-definition-generator)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/nguyenngoclong.cypress-cucumber-step-definition-generator)](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.cypress-cucumber-step-definition-generator)
[![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/nguyenngoclong.cypress-cucumber-step-definition-generator)](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.cypress-cucumber-step-definition-generator)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

# Cucumber Step Definition Generator

This extension is designed to help developers using the testing framework with Gherkin style feature files to generate step definition more easily and efficiently. With just a few clicks, you can automatically generate step definition for your feature files, saving you time and reducing the risk of errors.

If you find this extension useful for your projects, please consider supporting me by [Github](https://github.com/sponsors/nguyenngoclongdev), [Patreon](https://patreon.com/nguyenngoclong), [KO-FI](https://ko-fi.com/nguyenngoclong) or [Paypal](https://paypal.me/longnguyenngoc). It's a great way to help me maintain and improve this tool in the future. Your support is truly appreciated!

[![Github](https://img.shields.io/badge/Github-F15689?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sponsors/nguyenngoclongdev)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://patreon.com/nguyenngoclong)
[![KO-FI](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/nguyenngoclong)
[![Paypal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/longnguyenngoc)

# Supported Languages and Frameworks

<p align="center">
    <!-- JavaScript -->
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
    <!-- Typescript -->
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
</p>
<p align="center">
    <!-- Cypress -->
    <a href="https://www.cypress.io" target="_blank">
        <img src="https://img.shields.io/badge/-cypress-49666E?style=for-the-badge&logo=cypress&logoColor=white">
    </a>
    <!-- Cucumberjs -->
    <a href="https://cucumber.io/docs/installation/javascript/" target="_blank">
        <img src="https://img.shields.io/badge/Cucumber-55BB68?style=for-the-badge&logo=Cucumber&logoColor=white">
    </a>
      <!-- Playwright -->
    <a href="https://playwright.dev" target="_blank">
        <img src="https://img.shields.io/badge/Playwright-314B58?style=for-the-badge&logo=Playwright&logoColor=white">
    </a>
</p>

# Installation

Get it from [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.cypress-cucumber-step-definition-generator) or [Open VSX Registry](https://open-vsx.org/extension/nguyenngoclong/cypress-cucumber-step-definition-generator).

# Features

-   [Cucumber Step Definition Generator](#using-the-extension) offers multiple options to generate step definition.
-   Automatically opens the generated step definition file and syncs it with the currently opened window if you are in split editor mode. This saves you time and increases efficiency by allowing you to quickly view and edit the generated file.
-   Automatically detecting various types of information, such as `DataTable`, `DocString`, `int`, `float`, `string`, and other types of information that are supported by **[Gherkin Syntax](https://cucumber.io/docs/gherkin/)**.
-   The automatic detection of an asterisk (*) will be defined by a keyword type in the preceding steps.
-   Additionally, step definition are de-duplicated when regenerating code, ensuring they remain organized and efficient, even when making changes to your testing scenario.

## Using the extension 

![Generate step definition](https://github.com/nguyenngoclongdev/step-definition-generator/raw/HEAD/images/generate-step-definition-from-editor-title.gif)

You have multiple options when it comes to generating step definition using this extension:

-   The extension can automatically create a new file for the step definition when you generate it. To do this, you can either right-click on the feature file or click an icon in the Editor Actions menu.
-   The extension can also generate the step definition and copy it to the clipboard, which makes it easy to access and paste into the appropriate file. To use this option, you can again right-click on the feature file or click an icon in the Editor Actions menu.
-   Finally, you can use the Command Palette within the extension to generate step definitions directly. This method may be particularly useful if you prefer to use keyboard shortcuts or if you're working with a particularly large or complex test file.

### Generate a step definition and create a new file

1. Open any .feature file in vs code editor
2. Right click on the editor and select `Generate step definition to file`
3. If the file for the step definition doesn't exist, the extension will create it. Otherwise, if the file already exists, the extension will simply append the new step definition to the end of the existing file.

![Generate step definition](https://github.com/nguyenngoclongdev/step-definition-generator/raw/HEAD/images/generate-step-definition-in-editor.gif)

### Generate a step definition and copy to clipboard

1. Open any .feature file in vs code editor
2. Right click on the editor and select `Generate step definition to clipboard`

![Generate step definition](https://github.com/nguyenngoclongdev/step-definition-generator/raw/HEAD/images/generate-step-definition-to-clipboard.gif)

### Generate step definition from Command Palette

1. Open the Command Palette with Ctrl + Shift + P or Cmd + Shift + P.
2. Search for "Generate step definition" and select "Generate step definition to clipboard or Generate step definition to file".
3. Press Enter to generate the step definition.

![Generate step definition](https://github.com/nguyenngoclongdev/step-definition-generator/raw/HEAD/images/generate-step-definition-from-cmd.gif)

## Configuration

![Configuration](https://github.com/nguyenngoclongdev/step-definition-generator/raw/HEAD/images/step-definition-generator-configuration.gif)

### Change the settings

1. Access the settings and search for "Step Definition Generator".
2. Modify the desired setting value.
3. Save the updated settings.

```json
{
    // Change the testing framework used for step deinitions
    "step-definition-generator.runner": "cypress",

    // Change the programing language used for step deinitions
    "step-definition-generator.language": "typescript",

    // Choose to generate step definitions using either arrow or regular functions.
    "step-definition-generator.arrow": true,

    // Choose to generate step definitions using either async or sync functions.
    "step-definition-generator.async": false
}
```

## Examples

```feature
@web @regression
Feature: Search functionality

    As a user,
    I want to be able to search for products on the website,
    So that I can find what I need quickly and easily.

    Background:
        Given I am on the home page
        And I am logged in as "user@example.com"

    Rule: Search by keyword

        Scenario: Search with a valid keyword
            When I enter "laptop" in the search bar
            And I click the search button
            Then I should see a list of products containing "laptop"
            And the total number of results should be 10

        Scenario Outline: Search with invalid keyword
            When I enter <keyword> in the search bar
            And I click the search button
            Then I should see an error message

            Examples:
                | keyword   |
                | 12345     |
                | $%^&*     |
                | "invalid" |

    Rule: Search by category

        Scenario: Search for a specific category
            When I select "Electronics" from the category dropdown
            And I click the search button
            Then I should see a list of products in the Electronics category
            And the total number of results should be a float value between 10.0 and 20.0

        Scenario Outline: Search with multiple categories
            When I select the following categories:
                | category    |
                | Electronics |
                | Clothing    |
            And I click the search button
            Then I should see a list of products in the selected categories
            And the total number of results should be an integer value

    Rule: Search with filters

        Scenario: Search with filters applied
            When I select "Brand A" from the brand filter
            And I select "Price > $100" from the price filter
            And I click the search button
            Then I should see a list of products that match the applied filters
            And the total number of results should be greater than 0

    Rule: Search with docstring and datatable

        Scenario: Search with advanced options
            When I click the "Advanced Search" link
            And I fill in the following information:
                """
                {
                    "category": "Electronics",
                    "brand": "Brand B",
                    "priceRange": [
                        50,
                        100
                    ],
                    "features": [
                        {
                            "name": "WiFi",
                            "value": "Yes"
                        },
                        {
                            "name": "Bluetooth",
                            "value": "No"
                        }
                    ]
                }
                """
            And I click the search button
            Then I should see a list of products that match the advanced search criteria
            And the total number of results should be a float value

        @smoke
        Scenario: Search withno keyword
            When I click the search button without entering a keyword
            Then I should see the home page with no search results displayed
```

```typescript
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

Given(`I am on the home page`, () => {
    // [Given] Sets up the initial state of the system.
});

Given(`I am logged in as {string}`, (arg0: string) => {
    // [Given] Sets up the initial state of the system.
});

When(`I enter {string} in the search bar`, (arg0: string) => {
    // [When] Describes the action or event that triggers the scenario.
});

When(`I click the search button`, () => {
    // [When] Describes the action or event that triggers the scenario.
});

Then(`I should see a list of products containing {string}`, (arg0: string) => {
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the total number of results should be {int}`, (arg0: number) => {
    // [Then] Describes the expected outcome or result of the scenario.
});

When(`I enter {any} in the search bar`, (arg0: any) => {
    // [When] Describes the action or event that triggers the scenario.
});

Then(`I should see an error message`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

When(`I select {string} from the category dropdown`, (arg0: string) => {
    // [When] Describes the action or event that triggers the scenario.
});

Then(`I should see a list of products in the Electronics category`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the total number of results should be a float value between {float} and {float}`, (arg0: number, arg1: number) => {
    // [Then] Describes the expected outcome or result of the scenario.
});

When(`I select the following categories:`, (arg0: DataTable) => {
    // [When] Describes the action or event that triggers the scenario.
    // <DataTable> argument is detected:
    // - With column headers: use DataTable.rowsHash(), which outputs an object containing key-value pairs for each row (e.g. { key1: value, key2: value }).
    // - With row headers: use DataTable.hashes(), which outputs an array of objects (e.g. [{ key1: value, key2: value }]).
});

Then(`I should see a list of products in the selected categories`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the total number of results should be an integer value`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

When(`I select {string} from the brand filter`, (arg0: string) => {
    // [When] Describes the action or event that triggers the scenario.
});

When(`I select {string} from the price filter`, (arg0: string) => {
    // [When] Describes the action or event that triggers the scenario.
});

Then(`I should see a list of products that match the applied filters`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the total number of results should be greater than {int}`, (arg0: number) => {
    // [Then] Describes the expected outcome or result of the scenario.
});

When(`I click the {string} link`, (arg0: string) => {
    // [When] Describes the action or event that triggers the scenario.
});

When(`I fill in the following information:`, (arg0: string) => {
    // [When] Describes the action or event that triggers the scenario.
    // <DocString> argument is detected:
    // - DocString allows for passing a multi-line string as an argument.
    // - It can also be used to provide large amounts of text data, such as JSON or XML payloads.
});

Then(`I should see a list of products that match the advanced search criteria`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the total number of results should be a float value`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});

When(`I click the search button without entering a keyword`, () => {
    // [When] Describes the action or event that triggers the scenario.
});

Then(`I should see the home page with no search results displayed`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
});
```

## Feedback

If you discover a bug, or have a suggestion for a feature request, please
submit an [issue](https://github.com/nguyenngoclongdev/step-definition-generator/issues).

## LICENSE

This extension is licensed under the [MIT License](LICENSE)

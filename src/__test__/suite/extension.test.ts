import assert from 'assert';
import { globSync } from 'glob';
import fs from 'node:fs';
import path from 'node:path';
import { skip } from 'node:test';
import vscode from 'vscode';

type TestExpectedType = {
    content: string;
};

type TestCaseType = {
    input: string;
    expectedOutput: TestExpectedType;
};

const testWorkspace = path.resolve(__dirname, '../../../src/__test__/fixtures');
const inFiles = globSync(`${testWorkspace}/*.{feature,features}`);
const getTestCaseExpected = (filepath: string): TestExpectedType => {
    switch (filepath) {
        case path.join(testWorkspace, './empty.feature'): {
            return { content: '' };
        }
        case path.join(testWorkspace, './full.feature'): {
            const outFilePath = path.join(testWorkspace, './out/full.out');
            return { content: fs.readFileSync(outFilePath, { encoding: 'utf-8' }) };
        }
        case path.join(testWorkspace, './incorrect.feature'): {
            return { content: '' };
        }
        case path.join(testWorkspace, './simple1.feature'): {
            const outFilePath = path.join(testWorkspace, './out/simple1.out');
            return { content: fs.readFileSync(outFilePath, { encoding: 'utf-8' }) };
        }
        case path.join(testWorkspace, './simple2.features'): {
            const outFilePath = path.join(testWorkspace, './out/simple2.out');
            return { content: fs.readFileSync(outFilePath, { encoding: 'utf-8' }) };
        }
        default:
            throw Error('Please define expected output!');
    }
};

const trimAll = (text: string): string => {
    return text.replace(/(\r\n|\n|\r)/gm, '');
};

enum COMMANDS {
    generateToFile = 'step-definition-generator.generateStepDefinitionToFile',
    generateToClipboard = 'step-definition-generator.generateStepDefinitionToClipboard'
}

enum ACTIONS {
    generateToFile = 'Generate step definition to file',
    generateToClipboard = 'Generate step definition to clipboard'
}

const assertGenerateStepDefinitionToFile = (input: string, expectedOutput: TestExpectedType) => {
    const failMsg = `[${input}] Fail on generate step definition to file!`;
    const actualOutputPath = input.replace('.features', '.ts').replace('.feature', '.ts');
    if (expectedOutput.content) {
        const actualOutput = fs.readFileSync(actualOutputPath, { encoding: 'utf-8' });
        assert.strictEqual(trimAll(actualOutput), trimAll(expectedOutput.content), failMsg);
    } else {
        assert.strictEqual(fs.existsSync(actualOutputPath), false, failMsg);
    }
};

const assertGenerateStepDefinitionToClipboard = (
    input: string,
    actualOutput: string,
    expectedOutput: TestExpectedType
) => {
    const failMsg = `[${input}] Fail on generate step definition to clipboard!`;
    assert.strictEqual(trimAll(actualOutput), trimAll(expectedOutput.content), failMsg);
};

suite('Extension Test Suite', () => {
    const testCases: TestCaseType[] = inFiles.map((f) => ({ input: f, expectedOutput: getTestCaseExpected(f) }));
    testCases.forEach(async (testCase) => {
        const { input, expectedOutput } = testCase;

        // From Command Palette
        test(`Generate ${input} with Command Palette`, async () => {
            // Open the feature file
            vscode.workspace.openTextDocument(vscode.Uri.file(input)).then(async (document) => {
                await vscode.window.showTextDocument(document);
            });

            // Test generate step definition to file
            // - Check actual output is equals with expected output
            vscode.commands.executeCommand(COMMANDS.generateToFile).then(() => {
                assertGenerateStepDefinitionToFile(input, expectedOutput);
            });

            // Test generate step definition to clipboard
            // - Check actual output is equals with expected output
            vscode.env.clipboard.writeText('').then(async () => {
                await vscode.commands.executeCommand(COMMANDS.generateToClipboard);
                const actualOutput = await vscode.env.clipboard.readText();
                assertGenerateStepDefinitionToClipboard(input, actualOutput, expectedOutput);
            });
        });

        // From Editor Context
        test.skip(`Generate ${input} with Editor Context`, async () => {
            skip;
        });

        // From Explorer Context
        test.skip(`Generate ${input} with Explorer Context`, async () => {
            skip;
        });

        // From Editor Title
        test.skip(`Generate ${input} with Editor Title`, async () => {
            skip;
        });
    });
});

import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import * as Extension from '../../extension';

const testFolderLocation = '/../../../examples/';

function sleep(ms: number): Promise<void> {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

suite('Extension Test Suite', () => {
	test('should annotate function with parameters', async () => {
		const uri = vscode.Uri.file(
			path.join(__dirname ,  '../examples/test.feature')
		);
		console.log(uri);
		const document = await vscode.workspace.openTextDocument(uri);
		const editor = await vscode.window.showTextDocument(document);
		// await sleep(500);
		// const [decArray, errDecArray] = await Extension.createDecorations(
		// 	editor,
		// 	editor.document.getText()
		// )

		// assert.deepEqual(decArray.length, 1);
		// assert.deepEqual(errDecArray.length, 0);

		vscode.commands.executeCommand('extension.generateStepDefinitionsToFile');
	});
});

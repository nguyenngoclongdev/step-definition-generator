import { Uri, workspace } from 'vscode';
const { fs } = workspace;

class WorkspaceFs {
    existAsync = async (path: string) => {
        try {
            const uri = Uri.file(path);
            await fs.stat(uri);
            return true;
        } catch (e) {
            return false;
        }
    };

    createDirectoryAsync = async (path: string) => {
        const uri = Uri.file(path);
        await fs.createDirectory(uri);
    };

    readFileAsync = async (path: string) => {
        const uri = Uri.file(path);
        const content = await fs.readFile(uri);
        return content.toString();
    };

    appendFileAsync = async (path: string, content: string) => {
        const uri = Uri.file(path);
        const existingContent = await fs.readFile(uri);
        const contentBytes = new TextEncoder().encode(content);
        const updatedContent = new Uint8Array(existingContent.length + contentBytes.length);
        updatedContent.set(existingContent, 0);
        updatedContent.set(contentBytes, existingContent.length);
        await fs.writeFile(uri, updatedContent);
    };

    writeFileAsync = async (path: string, content: string) => {
        const uri = Uri.file(path);
        const contentBytes = new TextEncoder().encode(content);
        await fs.writeFile(uri, contentBytes);
    };
}

export const wfs = new WorkspaceFs();
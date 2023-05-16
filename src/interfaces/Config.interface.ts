import * as vscode from 'vscode';

export interface CycucumConfiguration extends vscode.WorkspaceConfiguration {
    language?: string;
    feature?: string;
    import?: string;
    destination?: string;
}

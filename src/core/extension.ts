/**
 * Main entry point for nodejs-package-manager extension
 */

import * as vscode from 'vscode';
import * as path from 'path';
import { NpmGuiManagerPanel } from './webviewPanel';
import { setGlobalStorageUri } from '../services/cacheService';
import { NpmDependenciesProvider } from './sidebarProvider';

export function activate(context: vscode.ExtensionContext): void {
  console.log('nodejs-package-manager extension is now active');

  // Set global storage URI for cache service
  setGlobalStorageUri(context.globalStorageUri);

  const openManagerHandler = async (resource?: vscode.Uri): Promise<void> => {
      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage(
          'nodejs-package-manager: No workspace folder is open. Please open a folder containing a package.json file.'
        );
        return;
      }

      let workspaceRoot = workspaceFolders[0]!.uri.fsPath;
      let preferredProjectPath: string | undefined;

      const activeUri = resource || vscode.window.activeTextEditor?.document.uri;
      if (activeUri && activeUri.scheme === 'file') {
        const folder = vscode.workspace.getWorkspaceFolder(activeUri);
        if (folder) {
          workspaceRoot = folder.uri.fsPath;
        }

        const isPackageJson = path.basename(activeUri.fsPath).toLowerCase() === 'package.json';
        preferredProjectPath = isPackageJson ? path.dirname(activeUri.fsPath) : activeUri.fsPath;
      }

      try {
        await NpmGuiManagerPanel.createOrShow(
          context.extensionUri,
          context.globalStorageUri,
          workspaceRoot,
          preferredProjectPath
        );
      } catch (error) {
        vscode.window.showErrorMessage(
          `nodejs-package-manager: Failed to open manager - ${error instanceof Error ? error.message : String(error)}`
        );
      }
    };

  // Register main command and compatibility aliases from older extension IDs
  const openManagerCommands = [
    'nodejs-package-manager.openManager',
    'package-manager.openManager',
    'npm-visual-manager.openManager',
  ].map(commandId => vscode.commands.registerCommand(commandId, openManagerHandler));

  const refreshHandler = async (): Promise<void> => {
    vscode.window.showInformationMessage('Refreshing dependencies...');
    await openManagerHandler();
  };

  const showSidebarHandler = async (): Promise<void> => {
    // Reveal the contributed activity bar view container and focus its webview.
    await vscode.commands.executeCommand('workbench.view.extension.nodejs-package-manager');
    await vscode.commands.executeCommand('nodejs-package-manager.sidebar.focus');
  };

  // Register refresh command and compatibility aliases from older extension IDs
  const refreshCommands = [
    'nodejs-package-manager.refresh',
    'package-manager.refresh',
    'npm-visual-manager.refresh',
  ].map(commandId => vscode.commands.registerCommand(commandId, refreshHandler));

  const showSidebarCommands = [
    'nodejs-package-manager.showSidebar',
  ].map(commandId => vscode.commands.registerCommand(commandId, showSidebarHandler));

  // Register sidebar webview provider
  const sidebarProvider = new NpmDependenciesProvider(context.extensionUri);
  const sidebarDisposable = vscode.window.registerWebviewViewProvider('nodejs-package-manager.sidebar', sidebarProvider, {
    webviewOptions: {
      retainContextWhenHidden: true,
    },
  });

  context.subscriptions.push(...openManagerCommands);
  context.subscriptions.push(...refreshCommands);
  context.subscriptions.push(...showSidebarCommands);
  context.subscriptions.push(sidebarDisposable);
}

export function deactivate(): void {
  console.log('nodejs-package-manager extension is now deactivated');
}

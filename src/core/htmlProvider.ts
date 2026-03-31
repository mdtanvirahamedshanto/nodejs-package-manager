import * as vscode from 'vscode';
import { getNonce } from '../utils/nonce';

/**
 * Generates the HTML content for the Webview Panel.
 * Sets up the Content Security Policy, links to frontend assets, and injects the initialization script.
 * Also exposes brand icons (light and dark) securely to the webview.
 */
export function getHtmlForWebview(webview: vscode.Webview, extensionUri: vscode.Uri, language: string): string {
  const scriptPath = vscode.Uri.joinPath(extensionUri, 'out', 'webview', 'assets', 'index.js');
  const cssPath = vscode.Uri.joinPath(extensionUri, 'out', 'webview', 'assets', 'index.css');

  const scriptUri = webview.asWebviewUri(scriptPath);
  const cssUri = webview.asWebviewUri(cssPath);
  const cacheBuster = Date.now();

  // Expose brand icons to the webview
  const iconDarkPath = vscode.Uri.joinPath(extensionUri, 'resources', 'icon-dark.svg');
  const iconLightPath = vscode.Uri.joinPath(extensionUri, 'resources', 'icon-light.svg');
  
  const iconDarkUri = webview.asWebviewUri(iconDarkPath);
  const iconLightUri = webview.asWebviewUri(iconLightPath);

  const nonce = getNonce();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}'; style-src ${webview.cspSource} 'unsafe-inline'; font-src ${webview.cspSource}; connect-src https:; img-src ${webview.cspSource} data:;">
  <title>Node.js Package Manager</title>
  <link rel="stylesheet" href="${cssUri}?v=${cacheBuster}">
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}">
    window.initialLanguage = '${language}';
    window.vscodeIcons = {
      dark: '${iconDarkUri}',
      light: '${iconLightUri}'
    };
  </script>
  <script nonce="${nonce}" src="${scriptUri}?v=${cacheBuster}"></script>
</body>
</html>`;
}

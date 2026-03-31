/**
 * Sidebar provider for nodejs-package-manager
 * Enhanced welcome view with quick actions and useful info
 */

import * as vscode from 'vscode';
import { getNonce } from '../utils/nonce';
import { getVSCodeLanguage } from '../i18n/getLanguage';
import { getTranslations } from '../i18n';

function getExtensionVersion(): string {
  const extension = vscode.extensions.getExtension('mdtanvirahamedshanto.nodejs-package-manager');
  const version = extension?.packageJSON?.version;
  return typeof version === 'string' ? version : 'unknown';
}

export class NpmDependenciesProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'nodejs-package-manager.sidebar';

  constructor(private readonly _extensionUri: vscode.Uri) {}

  private async openManagerFromSidebar(): Promise<void> {
    const availableCommands = new Set(await vscode.commands.getCommands(true));
    const candidates = [
      'nodejs-package-manager.openManager',
      'package-manager.openManager',
      'npm-visual-manager.openManager',
    ];

    for (const command of candidates) {
      if (availableCommands.has(command)) {
        await vscode.commands.executeCommand(command);
        return;
      }
    }

    vscode.window.showErrorMessage(
      'Node.js Package Manager: Open command is unavailable. Please reload VS Code and try again.'
    );
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void {
    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Handle messages from webview
    webviewView.webview.onDidReceiveMessage(async message => {
      switch (message.type) {
        case 'OPEN_PANEL':
          await this.openManagerFromSidebar();
          break;
        case 'OPEN_DOCS':
          await vscode.env.openExternal(vscode.Uri.parse('https://github.com/mdtanvirahamedshanto/nodejs-package-manager#readme'));
          break;
        case 'OPEN_ISSUES':
          await vscode.env.openExternal(vscode.Uri.parse('https://github.com/mdtanvirahamedshanto/nodejs-package-manager/issues'));
          break;
      }
    });
  }

  private _getHtmlForWebview(_webview: vscode.Webview): string {
    const nonce = getNonce();
    const language = getVSCodeLanguage();
    const t = getTranslations(language);
    const extensionVersion = getExtensionVersion();
    const logoUri = _webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'nodejs-package-manager.png'));

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src vscode-webview-resource: https: data:;">
  <title>Node.js Package Manager</title>
  <style>
    * {
      box-sizing: border-box;
    }
    
    body {
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      color: var(--vscode-foreground);
      background: var(--vscode-sideBar-background);
      padding: 20px 16px;
      margin: 0;
      line-height: 1.5;
    }
    
    .welcome-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      max-width: 400px;
      margin: 0 auto;
    }
    
    .logo-container {
      width: 72px;
      height: 72px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--vscode-editor-background);
      border: 1px solid var(--vscode-widget-border);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .logo-container:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 12px 28px rgba(203, 56, 55, 0.25);
    }
    
    .logo-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .header-group {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      margin: 0;
      color: var(--vscode-foreground);
      letter-spacing: -0.3px;
    }
    
    .version {
      font-size: 11px;
      font-weight: 600;
      color: var(--vscode-textPreformat-foreground, var(--vscode-descriptionForeground));
      background: var(--vscode-badge-background, rgba(128, 128, 128, 0.15));
      padding: 3px 10px;
      border-radius: 12px;
    }
    
    .description {
      font-size: 13px;
      color: var(--vscode-descriptionForeground);
      text-align: center;
      line-height: 1.5;
      margin: 0;
      padding: 0 8px;
    }
    
    .primary-btn {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.2s ease;
      width: 100%;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
    
    .primary-btn:hover {
      background: var(--vscode-button-hoverBackground);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .primary-btn svg {
      width: 14px;
      height: 14px;
      fill: currentColor;
    }
    
    .shortcut-hint {
      font-size: 12px;
      color: var(--vscode-descriptionForeground);
      text-align: center;
      margin-top: 4px;
      padding: 8px;
      border-radius: 6px;
      width: 100%;
      line-height: 2.2;
      background: var(--vscode-editor-background);
      border: 1px dashed var(--vscode-widget-border);
    }
    
    .shortcut-hint kbd {
      background: var(--vscode-keybindingLabel-background);
      color: var(--vscode-keybindingLabel-foreground);
      border: 1px solid var(--vscode-keybindingLabel-border);
      border-bottom-color: var(--vscode-keybindingLabel-bottomBorder);
      border-radius: 4px;
      padding: 3px 6px;
      font-family: var(--vscode-editor-font-family);
      font-size: 11px;
      font-weight: 600;
      box-shadow: inset 0 -1px 0 var(--vscode-keybindingLabel-bottomBorder);
      margin: 0 2px;
    }
    
    .divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(to right, transparent, var(--vscode-widget-border), transparent);
      margin: 8px 0;
    }
    
    .links-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: var(--vscode-editor-background);
      padding: 12px;
      border-radius: 8px;
      border: 1px solid var(--vscode-widget-border);
    }
    
    .links-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--vscode-descriptionForeground);
      letter-spacing: 0.8px;
      margin-bottom: 4px;
    }
    
    .link-group {
      display: flex;
      gap: 8px;
    }
    
    .link-btn {
      flex: 1;
      background: var(--vscode-button-secondaryBackground, rgba(128, 128, 128, 0.1));
      color: var(--vscode-button-secondaryForeground, var(--vscode-foreground));
      border: 1px solid transparent;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    
    .link-btn:hover {
      background: var(--vscode-button-secondaryHoverBackground, rgba(128, 128, 128, 0.2));
      border-color: var(--vscode-widget-border);
    }
    
    .tips-section {
      width: 100%;
      margin-top: 4px;
      padding: 16px;
      background: var(--vscode-textBlockQuote-background);
      border-left: 4px solid #CB3837;
      border-radius: 0 8px 8px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    
    .tips-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--vscode-foreground);
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .tip-item {
      font-size: 12px;
      color: var(--vscode-descriptionForeground);
      margin: 6px 0;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      line-height: 1.4;
    }
    
    .tip-icon {
      color: #F59E0B;
      flex-shrink: 0;
    }
  </style>
</head>
<body>
  <div class="welcome-container">
    <div class="logo-container">
      <img src="${logoUri}" alt="Node.js Package Manager" class="logo-img" />
    </div>
    
    <div class="header-group">
      <h1 class="title">Node.js Package Manager</h1>
      <span class="version">v${extensionVersion}</span>
    </div>
    
    <p class="description">
      ${t.sidebar.description}
    </p>
    
    <button class="primary-btn" id="openBtn">
      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      ${t.sidebar.openButton}
    </button>
    
    <div class="shortcut-hint">
      ${t.sidebar.shortcut}
    </div>
    
    <div class="divider"></div>
    
    <div class="links-section">
      <span class="links-title">${t.sidebar.quickLinks}</span>
      <div class="link-group">
        <button class="link-btn" id="docsBtn">
          📖 ${t.sidebar.documentation}
        </button>
        <button class="link-btn" id="issuesBtn">
          🐛 ${t.sidebar.reportIssue}
        </button>
      </div>
    </div>
    
    <div class="tips-section">
      <div class="tips-title">💡 ${t.sidebar.proTips}</div>
      <div class="tip-item">
        <span class="tip-icon">✨</span>
        <span>${t.sidebar.tip1}</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">✨</span>
        <span>${t.sidebar.tip2}</span>
      </div>
    </div>
  </div>
  
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    
    document.getElementById('openBtn').addEventListener('click', () => {
      vscode.postMessage({ type: 'OPEN_PANEL' });
    });
    
    document.getElementById('docsBtn').addEventListener('click', () => {
      vscode.postMessage({ type: 'OPEN_DOCS' });
    });
    
    document.getElementById('issuesBtn').addEventListener('click', () => {
      vscode.postMessage({ type: 'OPEN_ISSUES' });
    });
  </script>
</body>
</html>`;
  }
}

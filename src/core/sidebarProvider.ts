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
    :root {
      --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      --transition-base: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
      --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
      --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.16);
    }
    
    * {
      box-sizing: border-box;
    }
    
    body {
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      color: var(--vscode-foreground);
      background: linear-gradient(135deg, var(--vscode-sideBar-background), color-mix(in srgb, var(--vscode-sideBar-background) 98%, var(--vscode-editor-background) 2%));
      padding: 24px 16px;
      margin: 0;
      line-height: 1.5;
    }
    
    .welcome-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      max-width: 100%;
      margin: 0 auto;
      padding: 0;
    }
    
    .logo-container {
      width: clamp(64px, 20vw, 100px);
      height: clamp(64px, 20vw, 100px);
      border-radius: clamp(12px, 3vw, 16px);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, color-mix(in srgb, var(--vscode-editor-background) 85%, var(--vscode-focusBorder) 15%), color-mix(in srgb, var(--vscode-editor-background) 92%, var(--vscode-focusBorder) 8%));
      border: 1.5px solid color-mix(in srgb, var(--vscode-widget-border) 70%, transparent);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      transition: all var(--transition-base);
      position: relative;
      padding: clamp(4px, 2vw, 8px);
      flex-shrink: 0;
    }
    
    .logo-container::before {
      content: '';
      position: absolute;
      inset: -50%;
      background: radial-gradient(circle, color-mix(in srgb, var(--vscode-focusBorder) 25%, transparent), transparent);
      opacity: 0;
      transition: opacity var(--transition-base);
      pointer-events: none;
    }
    
    .logo-container:hover {
      transform: translateY(-6px) scale(1.12);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15);
      border-color: color-mix(in srgb, var(--vscode-focusBorder) 80%, transparent);
    }
    
    .logo-container:hover::before {
      opacity: 1;
    }
    
    .logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
    }
    
    .header-group {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      animation: fadeInUp 0.4s ease-out;
    }

    .title {
      font-size: clamp(13px, 4vw, 17px);
      font-weight: 800;
      margin: 0;
      color: var(--vscode-foreground);
      letter-spacing: -0.3px;
      background: linear-gradient(135deg, var(--vscode-foreground), color-mix(in srgb, var(--vscode-foreground) 85%, transparent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      word-break: break-word;
      line-height: 1.2;
    }
    
    .version {
      font-size: clamp(9px, 2.5vw, 11px);
      font-weight: 700;
      color: var(--vscode-focusBorder);
      background: linear-gradient(135deg, color-mix(in srgb, var(--vscode-focusBorder) 15%, transparent), color-mix(in srgb, var(--vscode-focusBorder) 10%, transparent));
      padding: clamp(3px, 1vw, 4px) clamp(8px, 2vw, 12px);
      border-radius: clamp(5px, 1.5vw, 6px);
      border: 1px solid color-mix(in srgb, var(--vscode-focusBorder) 25%, transparent);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      box-shadow: 0 2px 4px color-mix(in srgb, var(--vscode-focusBorder) 10%, transparent);
      white-space: nowrap;
    }
    
    .description {
      font-size: clamp(11px, 3vw, 13px);
      color: var(--vscode-descriptionForeground);
      text-align: center;
      line-height: 1.5;
      margin: 0;
      padding: 0 clamp(2px, 2vw, 4px);
      opacity: 0.95;
      word-break: break-word;
    }
    
    .primary-btn {
      background: linear-gradient(135deg, var(--vscode-button-background), color-mix(in srgb, var(--vscode-button-background) 88%, var(--vscode-focusBorder) 12%));
      color: var(--vscode-button-foreground);
      border: 1px solid color-mix(in srgb, var(--vscode-button-foreground) 15%, transparent);
      padding: clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px);
      border-radius: clamp(6px, 1.5vw, 8px);
      font-size: clamp(11px, 3vw, 13px);
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: clamp(6px, 2vw, 10px);
      transition: all var(--transition-base);
      width: 100%;
      justify-content: center;
      box-shadow: var(--shadow-md);
      letter-spacing: 0.3px;
      position: relative;
      overflow: hidden;
      min-height: 32px;
      flex-wrap: wrap;
    }
    
    .primary-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, color-mix(in srgb, white 20%, transparent), transparent);
      pointer-events: none;
    }
    
    .primary-btn:hover {
      background: linear-gradient(135deg, var(--vscode-button-hoverBackground), color-mix(in srgb, var(--vscode-button-hoverBackground) 92%, var(--vscode-focusBorder) 8%));
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
    
    .primary-btn:active {
      transform: translateY(0);
      box-shadow: var(--shadow-sm);
    }
    
    .primary-btn svg {
      width: clamp(12px, 3vw, 14px);
      height: clamp(12px, 3vw, 14px);
      fill: currentColor;
      position: relative;
      z-index: 1;
      flex-shrink: 0;
    }
    
    .shortcut-hint {
      font-size: clamp(9px, 2.5vw, 12px);
      color: var(--vscode-descriptionForeground);
      text-align: center;
      padding: clamp(6px, 2vw, 10px) clamp(8px, 2vw, 12px);
      border-radius: clamp(6px, 1.5vw, 8px);
      width: 100%;
      line-height: 1.6;
      background: color-mix(in srgb, var(--vscode-editor-background) 96%, var(--vscode-focusBorder) 4%);
      border: 1px solid color-mix(in srgb, var(--vscode-widget-border) 60%, transparent);
      transition: all var(--transition-base);
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
      word-break: break-word;
    }
    
    .shortcut-hint:hover {
      background: color-mix(in srgb, var(--vscode-editor-background) 92%, var(--vscode-focusBorder) 8%);
      border-color: color-mix(in srgb, var(--vscode-widget-border) 80%, transparent);
    }
    
    .shortcut-hint kbd {
      background: linear-gradient(135deg, var(--vscode-keybindingLabel-background), color-mix(in srgb, var(--vscode-keybindingLabel-background) 92%, var(--vscode-focusBorder) 8%));
      color: var(--vscode-keybindingLabel-foreground);
      border: 1px solid color-mix(in srgb, var(--vscode-keybindingLabel-border) 80%, transparent);
      border-bottom-color: var(--vscode-keybindingLabel-bottomBorder);
      border-radius: 3px;
      padding: 2px clamp(3px, 1vw, 7px);
      font-family: var(--vscode-editor-font-family);
      font-size: clamp(8px, 2vw, 10px);
      font-weight: 700;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
      margin: 0 clamp(1px, 1vw, 3px);
      display: inline-block;
    }
    
    .divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(to right, transparent, color-mix(in srgb, var(--vscode-widget-border) 50%, transparent), transparent);
      margin: 4px 0;
    }
    
    .links-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: clamp(6px, 2vw, 10px);
      background: color-mix(in srgb, var(--vscode-editor-background) 96%, var(--vscode-focusBorder) 4%);
      padding: clamp(10px, 3vw, 14px);
      border-radius: clamp(6px, 1.5vw, 8px);
      border: 1px solid color-mix(in srgb, var(--vscode-widget-border) 60%, transparent);
      box-shadow: var(--shadow-sm);
    }
    
    .links-title {
      font-size: clamp(8px, 2vw, 10px);
      font-weight: 800;
      text-transform: uppercase;
      color: var(--vscode-descriptionForeground);
      letter-spacing: 0.6px;
      margin-bottom: clamp(1px, 1vw, 2px);
      opacity: 0.85;
    }
    
    .link-group {
      display: flex;
      gap: 8px;
    }
    
    .link-btn {
      flex: 1;
      background: color-mix(in srgb, var(--vscode-button-secondaryBackground) 98%, var(--vscode-focusBorder) 2%);
      color: var(--vscode-button-secondaryForeground);
      border: 1px solid color-mix(in srgb, var(--vscode-button-secondaryForeground) 15%, transparent);
      padding: clamp(6px, 1.5vw, 8px) clamp(8px, 2vw, 12px);
      border-radius: clamp(5px, 1.2vw, 6px);
      font-size: clamp(9px, 2.5vw, 11px);
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(3px, 1vw, 5px);
      transition: all var(--transition-base);
      box-shadow: var(--shadow-sm);
      min-height: 28px;
    }
    
    .link-btn:hover {
      background: var(--vscode-button-secondaryHoverBackground);
      border-color: color-mix(in srgb, var(--vscode-button-secondaryForeground) 40%, transparent);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    
    .link-btn:active {
      transform: translateY(0);
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .tips-section {
      width: 100%;
      padding: clamp(10px, 3vw, 14px);
      background: linear-gradient(135deg, color-mix(in srgb, var(--vscode-editor-background) 92%, var(--vscode-errorForeground) 8%), color-mix(in srgb, var(--vscode-editor-background) 96%, var(--vscode-errorForeground) 4%));
      border-left: clamp(2px, 0.5vw, 3px) solid #CB3837;
      border-radius: clamp(6px, 1.5vw, 8px);
      box-shadow: 0 3px 8px color-mix(in srgb, #CB3837 10%, transparent);
      border: 1px solid color-mix(in srgb, #CB3837 20%, transparent);
    }
    
    .tips-title {
      font-size: clamp(10px, 2.5vw, 12px);
      font-weight: 800;
      color: var(--vscode-foreground);
      margin-bottom: clamp(6px, 2vw, 10px);
      display: flex;
      align-items: center;
      gap: clamp(4px, 1.5vw, 6px);
      letter-spacing: 0.3px;
    }
    
    .tip-item {
      font-size: clamp(10px, 2.5vw, 12px);
      color: var(--vscode-descriptionForeground);
      margin: clamp(4px, 1.5vw, 6px) 0;
      display: flex;
      align-items: flex-start;
      gap: clamp(6px, 2vw, 8px);
      line-height: 1.4;
      animation: slideIn 0.4s ease-out backwards;
      word-break: break-word;
    }
    
    .tip-item:nth-child(2) { animation-delay: 0.1s; }
    .tip-item:nth-child(3) { animation-delay: 0.2s; }
    
    .tip-icon {
      color: #F59E0B;
      flex-shrink: 0;
      font-size: clamp(11px, 2.5vw, 13px);
      min-width: 16px;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-8px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    /* Responsive Design for Extra Small Screens (< 240px) */
    @media (max-width: 240px) {
      body {
        padding: 12px 8px;
      }
      
      .welcome-container {
        gap: 8px;
      }
      
      .header-group {
        gap: 4px;
      }
      
      .version {
        padding: 2px 8px;
        font-size: 9px;
      }
      
      .primary-btn svg {
        display: none;
      }
      
      .link-group {
        gap: 4px;
      }
    }
    
    /* Responsive Design for Small Screens (240px - 300px) */
    @media (max-width: 300px) {
      .divider {
        margin: 2px 0;
      }
      
      .link-group {
        flex-direction: column;
      }
      
      .link-btn {
        width: 100%;
      }
    }
    
    /* Responsive Design for Large Screens (> 400px) */
    @media (min-width: 400px) {
      body {
        padding: 28px 18px;
      }
      
      .welcome-container {
        gap: 20px;
      }
      
      .logo-container {
        padding: 12px;
      }
      
      .header-group {
        gap: 12px;
      }
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

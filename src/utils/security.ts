/**
 * XSS防护工具函数
 */

// HTML特殊字符转义映射
const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
}

/**
 * 转义HTML特殊字符，防止XSS攻击
 * @param str 需要转义的字符串
 * @returns 转义后的字符串
 */
export function escapeHtml(str: string): string {
  return str.replace(/[&<>"'`=\/]/g, (char) => HTML_ESCAPE_MAP[char] || char)
}

/**
 * 转义URL参数，防止URL注入攻击
 * @param str 需要转义的URL参数
 * @returns 转义后的URL参数
 */
export function escapeUrl(str: string): string {
  return encodeURIComponent(str)
}

/**
 * 清理用户输入的HTML内容，移除危险的标签和属性
 * @param html 需要清理的HTML字符串
 * @returns 清理后的HTML字符串
 */
export function sanitizeHtml(html: string): string {
  // 移除script标签及其内容
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")

  // 移除on*事件属性
  html = html.replace(/\s+on\w+="[^"]*"/gi, "")

  // 移除javascript:协议
  html = html.replace(/javascript:[^"']*/gi, "")

  // 移除data:协议
  html = html.replace(/data:[^"']*/gi, "")

  return html
}

/**
 * 生成CSRF Token
 * @returns CSRF Token
 */
export function generateCsrfToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * 验证CSRF Token
 * @param token 要验证的token
 * @param storedToken 存储的token
 * @returns 是否验证通过
 */
export function validateCsrfToken(token: string, storedToken: string): boolean {
  return token === storedToken
}

/**
 * 内容安全策略(CSP)配置
 */
export const cspConfig: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "https://cdn.staticfile.org",
    "https://cdnjs.cloudflare.com",
    "https://umami.guoqi.dev",
  ],
  "style-src": [
    "'self'",
    "'unsafe-inline'",
    "https://cdn.staticfile.org",
    "https://cdnjs.cloudflare.com",
  ],
  "img-src": ["'self'", "data:", "https:"],
  "connect-src": ["'self'", "https://umami.guoqi.dev"],
  "font-src": ["'self'"],
  "object-src": ["'none'"],
  "media-src": ["'self'"],
  "frame-src": ["'none'"],
}

/**
 * 生成CSP头
 * @returns CSP头字符串
 */
export function generateCspHeader(): string {
  return Object.entries(cspConfig)
    .map(([key, value]) => `${key} ${value.join(" ")}`)
    .join("; ")
}

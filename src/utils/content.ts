import { escapeHtml, sanitizeHtml } from "./security"

/**
 * 处理文章内容，防止XSS攻击
 * @param content 原始文章内容
 * @returns 处理后的安全内容
 */
export function processContent(content: string): string {
  // 1. 首先进行HTML清理
  let safeContent = sanitizeHtml(content)

  // 2. 转义特殊字符
  safeContent = escapeHtml(safeContent)

  // 3. 处理代码块，确保代码块内容被正确转义
  safeContent = safeContent.replace(
    /<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g,
    (match, code) => {
      return `<pre><code>${escapeHtml(code)}</code></pre>`
    },
  )

  // 4. 处理行内代码
  safeContent = safeContent.replace(/`([^`]+)`/g, (match, code) => {
    return `<code>${escapeHtml(code)}</code>`
  })

  // 5. 处理链接，确保href属性安全
  safeContent = safeContent.replace(
    /<a[^>]+href="([^"]+)"[^>]*>/g,
    (match, href) => {
      const safeHref = href.replace(/javascript:/gi, "").replace(/data:/gi, "")
      return match.replace(href, safeHref)
    },
  )

  // 6. 处理图片，确保src属性安全
  safeContent = safeContent.replace(
    /<img[^>]+src="([^"]+)"[^>]*>/g,
    (match, src) => {
      const safeSrc = src.replace(/javascript:/gi, "").replace(/data:/gi, "")
      return match.replace(src, safeSrc)
    },
  )

  return safeContent
}

/**
 * 处理文章标题，防止XSS攻击
 * @param title 原始文章标题
 * @returns 处理后的安全标题
 */
export function processTitle(title: string): string {
  return escapeHtml(title)
}

/**
 * 处理文章标签，防止XSS攻击
 * @param tags 原始文章标签数组
 * @returns 处理后的安全标签数组
 */
export function processTags(tags: string[]): string[] {
  return tags.map((tag) => escapeHtml(tag))
}

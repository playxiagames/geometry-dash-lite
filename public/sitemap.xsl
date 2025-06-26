<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>网站地图 - Geometry Dash Lite</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <style type="text/css">
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        margin: 0;
                        padding: 20px;
                        min-height: 100vh;
                    }
                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                        background: rgba(255, 255, 255, 0.95);
                        border-radius: 15px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .header {
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        text-align: center;
                        padding: 40px 20px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 2.5em;
                        font-weight: 700;
                    }
                    .header p {
                        margin: 15px 0 0 0;
                        font-size: 1.1em;
                        opacity: 0.9;
                    }
                    .stats {
                        display: flex;
                        justify-content: center;
                        gap: 30px;
                        padding: 30px 20px;
                        background: #f8fafc;
                    }
                    .stat-item {
                        text-align: center;
                        padding: 20px;
                        background: white;
                        border-radius: 12px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                        min-width: 100px;
                    }
                    .stat-number {
                        font-size: 2em;
                        font-weight: 700;
                        color: #667eea;
                        display: block;
                    }
                    .stat-label {
                        color: #718096;
                        font-size: 0.9em;
                        margin-top: 5px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        background: white;
                    }
                    th, td {
                        padding: 16px 20px;
                        text-align: left;
                        border-bottom: 1px solid #e2e8f0;
                    }
                    th {
                        background: #f7fafc;
                        color: #2d3748;
                        font-weight: 600;
                        font-size: 0.9em;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                    }
                    tr:hover {
                        background-color: #f8fafc;
                    }
                    .url-link {
                        color: #667eea;
                        text-decoration: none;
                        font-weight: 500;
                        word-break: break-all;
                    }
                    .url-link:hover {
                        color: #5a67d8;
                        text-decoration: underline;
                    }
                    .priority {
                        font-weight: 600;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 0.85em;
                        color: white;
                        text-align: center;
                        min-width: 50px;
                        display: inline-block;
                    }
                    .priority-1 { background: #48bb78; }
                    .priority-08 { background: #4299e1; }
                    .priority-07 { background: #ed8936; }
                    .priority-06 { background: #9f7aea; }
                    .priority-04 { background: #718096; }
                    .changefreq {
                        padding: 4px 10px;
                        border-radius: 15px;
                        font-size: 0.8em;
                        font-weight: 500;
                        text-transform: capitalize;
                        border: 2px solid;
                    }
                    .daily { color: #38a169; border-color: #38a169; background: rgba(56, 161, 105, 0.1); }
                    .weekly { color: #4299e1; border-color: #4299e1; background: rgba(66, 153, 225, 0.1); }
                    .monthly { color: #ed8936; border-color: #ed8936; background: rgba(237, 137, 54, 0.1); }
                    .yearly { color: #718096; border-color: #718096; background: rgba(113, 128, 150, 0.1); }
                    .footer {
                        text-align: center;
                        padding: 30px 20px;
                        background: #f8fafc;
                        color: #718096;
                        font-size: 0.9em;
                    }
                    .footer a {
                        color: #667eea;
                        text-decoration: none;
                        font-weight: 500;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🗺️ 网站地图</h1>
                        <p>Geometry Dash Lite 游戏网站完整页面列表</p>
                    </div>
                    
                    <div class="stats">
                        <div class="stat-item">
                            <span class="stat-number">
                                <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
                            </span>
                            <div class="stat-label">总页面数</div>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">
                                <xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority='0.8'])"/>
                            </span>
                            <div class="stat-label">游戏页面</div>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">
                                <xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority='0.7'])"/>
                            </span>
                            <div class="stat-label">分类页面</div>
                        </div>
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>页面链接</th>
                                <th>优先级</th>
                                <th>更新频率</th>
                                <th>最后修改</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="sitemap:urlset/sitemap:url">
                                <xsl:sort select="sitemap:priority" order="descending"/>
                                <tr>
                                    <td>
                                        <a href="{sitemap:loc}" class="url-link" target="_blank">
                                            <xsl:value-of select="sitemap:loc"/>
                                        </a>
                                    </td>
                                    <td>
                                        <xsl:variable name="priority" select="sitemap:priority"/>
                                        <span>
                                            <xsl:attribute name="class">
                                                priority
                                                <xsl:choose>
                                                    <xsl:when test="$priority = '1'"> priority-1</xsl:when>
                                                    <xsl:when test="$priority = '0.8'"> priority-08</xsl:when>
                                                    <xsl:when test="$priority = '0.7'"> priority-07</xsl:when>
                                                    <xsl:when test="$priority = '0.6'"> priority-06</xsl:when>
                                                    <xsl:when test="$priority = '0.4'"> priority-04</xsl:when>
                                                    <xsl:otherwise> priority-04</xsl:otherwise>
                                                </xsl:choose>
                                            </xsl:attribute>
                                            <xsl:value-of select="sitemap:priority"/>
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            <xsl:attribute name="class">
                                                changefreq <xsl:value-of select="sitemap:changefreq"/>
                                            </xsl:attribute>
                                            <xsl:value-of select="sitemap:changefreq"/>
                                        </span>
                                    </td>
                                    <td>
                                        <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                    
                    <div class="footer">
                        <p>此网站地图由 <a href="https://geometry-dash-lite.org">Geometry Dash Lite</a> 自动生成</p>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet> 
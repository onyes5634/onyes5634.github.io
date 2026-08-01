# Onyes 的小站 · onyes5634.github.io

个人静态站点，聚合了一批实用的在线小工具、物理/化学模拟实验和休闲小游戏。托管于 GitHub Pages，全部为单文件 HTML 应用，无构建依赖。

## 站点地址

https://onyes5634.github.io/

## 内容分类

- **实用工具**：二维码生成/解码、图片转 Base64、密码生成器、待办清单、番茄时钟、单位换算、倒计时、秒表、计算器、Markdown 预览、屏幕取色器
- **模拟实验**：太阳系天体运动、流体物理、颜色混合、音波可视化、抛体运动、电路模拟、热传导
- **游戏类**：贪吃蛇、2048、华容道、数字华容道、打地鼠、拼图游戏

## 技术说明

- 纯静态 HTML/CSS/JS，每个应用独立成页，不依赖构建工具
- 图标使用内联 SVG（无第三方字体图标库）
- 适配移动端（viewport + 响应式布局）

## 本地开发

```bash
git clone https://github.com/onyes5634/onyes5634.github.io.git
cd onyes5634.github.io
# 直接打开 index.html 或用任意静态服务器预览
```

新增应用：在根目录放一个独立 HTML 文件，并在 `index.html` 对应分类中增加一张卡片（`data-name` + `data-url`）即可。

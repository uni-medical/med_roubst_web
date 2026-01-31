# MedQ-Deg Website 项目指南

## 项目概述
这是一个使用 Astro + React + TypeScript 构建的医疗退化机制研究网站。采用数据驱动设计，通过 JSON 文件管理内容，实现快速更新和维护。

## 技术栈
- **框架**: Astro 5.1.4
- **UI库**: React 18.3.1
- **语言**: TypeScript 5.7.3
- **样式**: Tailwind CSS + DaisyUI
- **图标**: Lucide React

## 常用开发命令

```bash
cd med-q-deg-website

# 安装依赖
npm install

# 开发模式（热重载）
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview

# 类型检查
npm run astro check
```

## 核心架构

### 页面结构（4个页面）
1. **Home** (`/`) - 首页，展示项目概览
2. **Members** (`/members`) - 团队成员
3. **Publications** (`/publications`) - 研究成果
4. **Software** (`/software`) - 软件工具

### 核心组件（4个 React 组件）
所有组件位于 `src/components/`：

1. **Hero.tsx** - 首页英雄区块
2. **TeamMember.tsx** - 团队成员卡片
3. **Publication.tsx** - 出版物列表
4. **Software.tsx** - 软件展示

### TypeScript 路径别名
```typescript
// astro.config.mjs 中配置
'@/': './src/*'
'@components': './src/components'
'@data': './src/data'
```

使用示例：
```typescript
import Hero from '@components/Hero';
import teamData from '@data/team.json';
```

## 关键配置文件

### 1. astro.config.mjs
- 定义路径别名
- 配置 React 集成
- 设置 Tailwind CSS

### 2. src/config.ts
网站全局配置，包含：
- 网站标题、描述
- 社交媒体链接
- 导航菜单结构
- 联系信息

### 3. 数据文件（src/data/）
```
src/data/
├── team.json           # 团队成员信息
├── publications.json   # 出版物列表
└── software.json       # 软件工具信息
```

## 开发工作流

### 修改内容
1. **更新团队成员**: 编辑 `src/data/team.json`
2. **添加出版物**: 编辑 `src/data/publications.json`
3. **更新软件信息**: 编辑 `src/data/software.json`
4. **修改网站配置**: 编辑 `src/config.ts`

### 添加图片
1. 将图片放入 `public/` 目录
2. 在 JSON 中引用：`/images/filename.jpg`
3. 推荐格式：WebP（体积小）或 JPG/PNG

### 替换 PDF
直接替换根目录的 PDF 文件：
- `Robust_Review_Paper.pdf`
- `Robust_Review_Paper_Supp.pdf`

## 注意事项

### Git 提交规范
- ✅ **提交**: 源代码、配置文件、数据文件
- ❌ **不提交**: node_modules、dist、.astro、.DS_Store

### 图片优化建议
- 使用 WebP 格式减小体积
- 压缩图片（推荐工具：TinyPNG、Squoosh）
- 头像建议尺寸：400x400px

### 部署前检查
```bash
# 1. 类型检查
npm run astro check

# 2. 生产构建测试
npm run build
npm run preview

# 3. 检查构建输出
ls -lh dist/
```

## Python 脚本使用说明

项目根目录包含 Python 工具脚本，用于批量处理数据。

### 环境准备
```bash
# 安装依赖（如果需要）
pip install -r requirements.txt
```

### 脚本使用
运行脚本时，可通过命令行参数或使用默认值：

```bash
# 示例：使用默认参数
python script_name.py

# 示例：自定义参数
python script_name.py --input data.json --output result.json
```

所有脚本内部都定义了 `default_xxx` 变量，方便快速测试。

## 项目结构

```
agents-e49ff69830/
├── CLAUDE.md                      # 本文档
├── med-q-deg-website/             # 网站项目
│   ├── src/
│   │   ├── components/            # React 组件
│   │   ├── data/                  # JSON 数据文件
│   │   ├── layouts/               # Astro 布局
│   │   ├── pages/                 # 页面路由
│   │   └── config.ts              # 全局配置
│   ├── public/                    # 静态资源
│   ├── astro.config.mjs           # Astro 配置
│   ├── tailwind.config.cjs        # Tailwind 配置
│   └── package.json
├── Robust_Review_Paper.pdf        # 主论文
└── Robust_Review_Paper_Supp.pdf   # 补充材料
```

## 常见问题

### Q: 修改内容后没有生效？
A: 检查开发服务器是否在运行，刷新浏览器（Cmd+Shift+R 强制刷新）

### Q: 图片不显示？
A: 确认图片在 `public/` 目录，路径以 `/` 开头（如 `/images/photo.jpg`）

### Q: TypeScript 报错？
A: 运行 `npm run astro check` 检查类型错误

### Q: 构建失败？
A: 检查 JSON 文件格式是否正确，运行 `npm run build` 查看详细错误

## 维护建议

1. **定期更新依赖**: `npm update` 检查更新
2. **代码质量**: 保持模块化、可泛化的代码风格
3. **避免屎山**: 精确、有效的修改，避免无效堆砌
4. **文档同步**: 修改功能时更新本文档

## 联系方式

如需技术支持或有疑问，请参考：
- Astro 文档：https://docs.astro.build
- React 文档：https://react.dev
- Tailwind CSS：https://tailwindcss.com

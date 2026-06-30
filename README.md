# Playwright Practice Site

一个用于学习 Playwright 的静态练习站点，包含表单、异步加载、弹窗、文件上传、拖拽、表格筛选和 localStorage 等测试场景。

## Docker 一键运行

```powershell
docker compose up --build
```

打开：

```text
http://localhost:8080
```

后台运行：

```powershell
docker compose up -d --build
```

停止：

```powershell
docker compose down
```

## 不使用 Docker

```powershell
python -m http.server 5177
```

打开：

```text
http://localhost:5177
```

## Playwright Python 测试

安装依赖：

```powershell
python -m pip install -r requirements.txt
python -m playwright install
```

先启动站点：

```powershell
docker compose up -d --build
```

运行测试：

```powershell
python -m pytest
```

停止站点：

```powershell
docker compose down
```

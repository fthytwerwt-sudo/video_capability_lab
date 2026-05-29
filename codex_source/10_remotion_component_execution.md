# Remotion 组件执行边界

## 当前定位

当前只做 `待验证` 组件级能力 probe，不做正式视频主剪辑，不声明 Remotion 能力已成立。

## 输入字段

- `component_id`
- `duration_seconds`
- `fps`
- `text_layers`
- `timeline_markers`
- `style_preset`
- `output_probe_path`

## 输出字段

- `component_probe_manifest`
- `render_or_preview_status`
- `validation_result`
- `review_pack_path`
- `current_status`

## 必须验证内容

- 时间轴不漂移。
- 图层不遮挡核心内容。
- 文本可读。
- 输出 manifest 可复核。
- 未真实 render 时标 `待验证`。

## 阻断条件

- 缺 Remotion 项目入口。
- 缺输入字段。
- 需要安装大型依赖但未获明确授权。
- 输出会被误写成正式 publish candidate。

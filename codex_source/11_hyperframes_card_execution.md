# HyperFrames 卡片执行边界

## 当前定位

HyperFrames 在本项目中只作为卡片动效层候选能力，当前状态 `待验证`。

## 允许范围

- 原创 glass-like / apple-like 卡片。
- 音乐卡、搜索问题卡、CTA 尾卡。
- 局部动效层或视觉包装层。

## 禁止范围

- 不做真实视频主剪辑。
- 不进入证据段遮挡。
- 不复刻 Apple / 抖音真实 UI。
- 不迁移第三方品牌资产。

## 输入字段

- `card_type`
- `copy_text`
- `style_preset`
- `animation_in`
- `animation_out`
- `duration_seconds`

## 输出字段

- `card_manifest`
- `preview_status`
- `limitations`
- `review_pack_path`

## 阻断条件

- 用户要求复刻真实品牌 UI。
- 卡片遮挡主体证据。
- 缺少回审截图或 manifest。

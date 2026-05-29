# Review Pack 与导出规则

## 每个 probe 必须有 review_pack

任何 `component_probe` 或 `technical_sample` 都必须输出 review_pack，供 GPT / 用户 / Codex 回审。

## review_pack 必须包含

- `manifest`
- 验证结果
- 截图 / contact sheet 规则
- 限制说明
- 下一个目标
- 当前状态

## 截图 / contact sheet 规则

- 关键时间点必须可读。
- 卡片、字幕、主体不可相互遮挡。
- 未生成截图时必须标 `待验证`。

## 限制说明

必须写清：

- 哪些能力已做技术检查。
- 哪些仍为 `待验证`。
- 哪些不能升级为 publish candidate。

## 下一个目标

review_pack 结尾必须给出下一个目标，而不是只列动作清单。

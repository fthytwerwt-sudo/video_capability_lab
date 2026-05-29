# 参考视频解析与落地契约

## 基本规则

参考视频只能提供质量机制，不直接提供项目事实。参考效果必须拆成可执行组件，不能直接复刻平台 UI、品牌资产或可识别第三方素材。

## 禁止项

- 禁止复刻真实平台 UI。
- 禁止复刻 Apple、抖音或第三方品牌资产。
- 禁止把参考视频里的素材路径写成本项目素材。
- 禁止把参考视频效果写成能力已验证。

## 必须输出

| 字段 | 说明 |
|---|---|
| 参考效果 | 用户想学习的观感或节奏 |
| 可迁移机制 | 可以抽象成原创组件的部分 |
| 不可迁移资产 | UI、Logo、品牌、人物、音乐、素材等 |
| 组件映射 | 映射到 Remotion / HyperFrames / BGM / FFmpeg 的组件 |
| 验收标准 | probe 如何判断接近目标而不复刻 |

## 输出模板

```json
{
  "status": "待验证",
  "reference_effect": "",
  "transferable_mechanisms": [],
  "non_transferable_assets": [],
  "component_mapping": [],
  "acceptance_standards": [],
  "blocked_if": []
}
```

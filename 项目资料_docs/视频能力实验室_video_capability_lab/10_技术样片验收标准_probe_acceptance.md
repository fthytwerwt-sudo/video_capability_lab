# 技术样片验收标准

## 类型区分

| 类型 | 定义 | 当前是否允许 |
|---|---|---|
| `component_probe` | 验证单个组件或管线片段 | 允许 |
| `technical_sample` | 组合多个待验证能力形成技术样片 | 允许 |
| `publish_candidate` | 可发布候选片 | 当前不允许 |

当前阶段只允许：

```text
component_probe
technical_sample
```

不得写：

```text
publish_candidate_ready
```

除非未来用户明确把本项目升级为正式出片项目。

## component_probe 验收

- 输入字段明确。
- 输出文件或配置明确。
- 有截图 / contact sheet / manifest 规则。
- 有验证脚本或手工检查清单。
- 失败时能定位到组件边界。

## technical_sample 验收

- 明确使用了哪些待验证组件。
- 不把样片通过写成能力稳定成立。
- 有 review_pack。
- 有限制说明和下一个目标。

## publish_candidate 禁止线

本项目当前不做正式可发布候选片。若未来升级，必须新增人审、版权、素材授权、平台适配、发布质量和业务目标验收。

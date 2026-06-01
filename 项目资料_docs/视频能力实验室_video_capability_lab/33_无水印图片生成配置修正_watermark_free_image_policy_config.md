# 无水印图片生成配置修正

## 1. status

- task_type: `watermark_free_image_policy_config`
- source_probe_report: `32_API贴纸候选探针报告_api_sticker_candidate_probe_report.md`
- policy_config_file: `配置_configs/图片生成策略_image_generation_policy.json`
- current_status: `watermark_policy_config_updated_no_new_asset`
- next_goal: `watermark_free_provider_probe`
- api_call_allowed_this_round: `false`
- asset_generation_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- render_allowed_this_round: `false`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`

已确认：本轮只改配置和项目状态，不调用 API，不生成新图片，不修改 Remotion，不 render。

## 2. user_feedback

用户反馈：以后图片都改成无水印；本轮可以不带出产物，只改配置。

真实目标：避免继续用会带 `AI生成` 标识或水印的图片输出作为正式贴纸候选，减少后续 API 次数浪费。

## 3. failure_facts_from_32

| item | value |
|---|---|
| provider | `zhipu` |
| model | `glm-image` |
| API connection | `succeeded` |
| generated candidate count | `1` |
| transparent_background_status | `not_transparent` |
| visible generated label | `AI生成` |
| no watermark / no generated label check | `fail` |
| ready_for_remotion | `fail` |

已确认：上述失败来自 `32` 报告和本地视觉检查，不是本轮新生成。

## 4. policy_update

未来 `sticker_candidate（贴纸候选）` 图片必须满足：

1. `require_no_watermark=true`
2. `require_no_generated_label=true`
3. `require_no_logo=true`
4. `require_no_brand_mark=true`
5. `require_transparent_background_or_clean_background_for_cutout=true`

默认动作：

| condition | action |
|---|---|
| 输出带水印 | `reject_candidate` |
| 输出带 `AI生成` 或其他 generated label | `reject_candidate` |
| 输出带 logo / brand mark | `reject_candidate` |
| 输出背景不透明但干净可抠图 | `needs_cutout_review` |
| 输出透明 PNG 且无水印 | `candidate_review_allowed` |

## 5. provider_route_decision

| provider_model | status | allowed_for_sticker_candidate | allowed_for_connection_test | reason |
|---|---|---:|---:|---|
| `zhipu + glm-image` | `connection_probe_only` | `false` | `true` | 上一轮返回可见 `AI生成` 标识且背景不透明。 |

已确认：`zhipu + glm-image` 目前只能作为连通性测试证据，不再作为正式贴纸候选默认 provider。

待验证：若未来该 provider / model 能通过无水印输出配置或官方权限重新验证，才可重新评估。

## 6. do_not_route

禁止把以下方案作为默认路线：

- 去水印。
- 裁掉 `AI生成` 标识。
- 修补 / inpaint 水印。
- 把带水印图片接入 Remotion。
- 把带水印图片写成可用贴纸资产。

已确认：正确做法是更换 provider / model 或先验证 provider 能输出无水印候选。

## 7. do_not_claim

本轮不得声明：

- no-watermark provider verified
- sticker asset approved
- sticker asset pack completed
- video fixed
- visual language passed
- Remotion integration completed
- vlog director capability verified

## 8. next_goal

进入 `watermark_free_provider_probe（无水印 provider 探针）`。

下一轮必须先确认 provider / model 支持：

- no watermark
- no generated label
- no logo / brand mark
- transparent PNG 或干净可抠图背景

未确认前，不允许批量生成贴纸候选。

# 十八秒锚点贴纸正片候选报告

## 1. status（状态）

- task_type: `remotion_18s_anchor_sticker_review_candidate`
- generated_at: `2026-06-02`
- repository: `/Users/fan/Documents/vlog、odd/video_capability_lab`
- branch: `main`
- composition_id: `十八秒锚点贴纸候选-18s-anchor-sticker-candidate`
- duration_target: `18s ±0.5s`
- duration_rendered: `18.000000s video stream / 18.048000s container+audio`
- current_status: `18s_anchor_sticker_review_candidate_rendered_pending_user_review`
- content_status: `rendered_pending_user_review`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- visual_language_status: `pending_user_review`
- sticker_mechanism_status: `pending_user_review`
- api_call_allowed_this_round: `false`
- image_generation_allowed_this_round: `false`
- runtime_asset_commit_allowed_this_round: `false`

已确认：本轮允许 Remotion 编辑和本地 render，但不允许调用图片 / 视频 / 音频 API，不允许提交视频、图片、音频、抽帧、`tmp/`、`dist/`、runtime assets 或 `.env`。

已确认：本轮生成的是本地 18 秒审片候选，不是 publish candidate，不是视觉语言通过，不是贴纸机制验证通过，也不是 vlog director capability verified。

## 2. outputs（输出）

| artifact | path | git_status |
|---|---|---|
| Remotion composition | `remotion/组合_compositions/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.tsx` | source committed |
| Remotion data | `remotion/数据_data/十八秒锚点贴纸事件_18s_anchor_sticker_events.ts` | source committed |
| rendered local candidate | `dist/十八秒锚点贴纸候选_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.mp4` | ignored runtime, not committed |
| frame review frames | `tmp/十八秒锚点贴纸候选_frame_review_18s_anchor_sticker_candidate/frames/` | ignored runtime, not committed |
| frame review sheet | `tmp/十八秒锚点贴纸候选_frame_review_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_start_mid_exit_sheet.jpg` | ignored runtime, not committed |

已确认：rendered candidate 和 frame review 只存在本地 ignored 目录，用于用户 / GPT 人审，不进入 Git。

## 3. technical validation（技术验证）

| check | result |
|---|---|
| Remotion composition discovery | passed: `十八秒锚点贴纸候选-18s-anchor-sticker-candidate` = `540 frames / 18.00 sec / 1080x1920 / 30fps` |
| render | passed |
| output video stream | `h264 / 1080x1920 / 30fps / 18.000000s` |
| output audio stream | `aac / stereo / 18.048000s` |
| decode check | passed: `ffmpeg -v error -i ... -f null -` |
| duration gate | passed: `18.048000s` container/audio within `18s ±0.5s` |
| source BGM | existing local BGM-derived runtime wav, no new provider call |

已确认：技术验证只说明本地候选可 render、可播放、有音频、可解码，不代表内容或审美通过。

待验证：BGM 仍只是粗情绪 / 候选节奏参考，未做人耳复听，不声明 precise beat sync。

## 4. event selection（事件选择）

本轮从 `41_目标样片贴纸锚点事件表与执行机制` 中选择 4 个 `sticker_needed=true` 事件进入 18 秒候选：

| source_shot_id | source_timecode | candidate_time | sticker_kind | anchor_target | status |
|---|---:|---:|---|---|---|
| `shot_01_panda_open_arrow` | `00:02.38` | `2.38s` | `arrow` | `panda_head_turn / bamboo_bite_direction` | included |
| `shot_03_bamboo_hide_circle` | `00:06.82` | `6.82s` | `circle` | `panda_face / leaf_hide_edge` | included |
| `shot_04_sand_trace_wave` | `00:08.08` | `8.08s` | `wave` | `footprint_trace / sand_curve` | included |
| `shot_05_panda_bite_tag` | `00:09.70` | `9.70s` | `tag` | `panda_mouth / bamboo_bite` | included |

已确认：本轮包含 4 个来自 `41` 的 sticker events，满足至少 3 个事件要求。

已确认：本轮包含多个 no-sticker shots，例如 `sand_trace_opening_no_sticker`、`mist_people_wide_no_sticker`、`cloud_tide_open_no_sticker`、`mist_walkaway_no_sticker`、`silver_sky_close_no_sticker` 和 `panda_end_reprise_hold`。这些镜头用于验证“不为凑数量硬贴”的机制。

## 5. frame review（抽帧回审）

| source_shot_id | start_frame | mid_frame | exit_frame | local observation |
|---|---|---|---|---|
| `shot_01_panda_open_arrow` | `2.48s` | `2.92s` | `3.36s` | 部分成立：箭头在熊猫动作窗口内可见，仍需用户判断是否自然、是否太像提示 UI。 |
| `shot_03_bamboo_hide_circle` | `6.98s` | `7.38s` | `7.84s` | 部分成立：圈注绑定竹叶遮挡 / 熊猫区域，exit 仍在同一镜头内；是否圈得准待人审。 |
| `shot_04_sand_trace_wave` | `8.24s` | `8.62s` | `9.02s` | 部分成立：二次修正后 start/mid/exit 均落在沙纹窗口，不再跨到熊猫镜头。 |
| `shot_05_panda_bite_tag` | `9.86s` | `10.26s` | `10.72s` | 部分成立：纸签保持在熊猫咬竹窗口内，不再跨到海雾镜头；是否像自然贴纸待人审。 |

已确认：首次 frame review 发现 `shot_04` / `shot_05` exit 跨入下一镜头，本轮已调整 segment timing 并重新 render / 抽帧。

待验证：以上 frame review 是 Codex 本地 sanity check，不替代用户最终审片。

## 6. implementation notes（实现说明）

- 新增 `anchor18sSegments`：每个镜头都标注 `stickerPolicy`，区分 `sticker_needed_true`、`sticker_needed_false` 和 `no_sticker_shot`。
- 新增 `anchor18sStickerEvents`：每个贴纸保留 `sourceShotId`、`sourceTimecode`、`anchorTarget`、`stickerRole`、`shapeDerivedFromEvent`、`placementRelation` 和 `reviewFrames`。
- 新增 4 个原创 Remotion vector / CSS 贴纸：轻手绘箭头、不规则圈注、轨迹波纹、小纸签。
- 没有使用第三方贴纸图、平台 UI、原字体、原文案、品牌包装或账号信息。
- 没有调用图片 / 视频 / 音频生成 API。

## 7. forbidden declarations（禁止声明）

本轮不得声明：

- `publish_candidate_ready`
- `visual_language_passed`
- `sticker_system_verified`
- `sticker_mechanism_passed`
- `vlog_director_capability_verified`
- `precise_beat_sync_confirmed`
- `video_fixed`

## 8. next goal（下一个目标）

下一个目标：用户 / GPT 人审 `dist/十八秒锚点贴纸候选_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.mp4` 和 `tmp/十八秒锚点贴纸候选_frame_review_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_start_mid_exit_sheet.jpg`。

若人审不通过，必须按失败类型退回：

| failure | route_back_to |
|---|---|
| 贴纸贴空或遮挡主体 | 单个 `anchor18sStickerEvents` placement / duration |
| 贴纸像 UI / 工程 SVG | `shapeDerivedFromEvent` 和视觉质感重画 |
| 贴纸太多或抢镜 | `stickerPolicy` 减法，不新增贴纸 |
| BGM 节奏不贴 | BGM 复听 / marker review，不声明精准卡点 |
| 整体不像参考 | `29/31/40/41` 的判断层重判，不盲目调参 |

## 9. user_review_and_gap_audit（用户人审与差距审计）

- user_review_quote: `我看了贴纸，没得啊，和之前比就是锚点更清晰了，但是还是和对标视频的差距很大啊。`
- gap_audit_report: `项目资料_docs/视频能力实验室_video_capability_lab/43_十八秒候选与对标贴纸差距审计_18s_candidate_reference_sticker_gap_audit.md`
- gap_audit_status: `18s_candidate_sticker_gap_audit_completed_pending_gpt_review`

已确认：用户反馈说明锚点层有进步，但贴纸视觉语言仍未过线。

待验证：不得把 18 秒候选写成视觉语言通过、贴纸机制通过、视频已修好或 vlog director capability verified。

# 贴纸图形适配与有限修复报告

## 1. 状态

- task_type: `sticker_visual_fit_limited_remotion_fix`
- target_sample: `三十秒对标样片-30s-reference-sample`
- composition_id: `三十秒对标样片-30s-reference-sample`
- source_file: `remotion/组合_compositions/三十秒对标样片_30s_reference_sample.tsx`
- data_file: `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts`
- content_status: `limited_remotion_fix_rendered_pending_user_review`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- render_allowed_this_round: `true`
- remotion_edit_allowed_this_round: `limited`
- external_api_call: 未执行
- generated_sticker_assets: 未执行
- runtime_artifacts_committed: false

已确认：本轮只做 `25 + 26` 已明确允许的有限 Remotion 修复，不重做整条 30 秒结构。

已确认：本轮 render 成功只证明 technical validation，不证明审美、人审或正式成片判断通过。

## 2. 本轮修复边界

允许执行：

- 删除 / 替换无功能 caption。
- 删除 / 重定位无锚点或无功能 sticker。
- 将 sticker 表现层改轻，减少随机 SVG / 模板感。
- 删除 scrapbook 中重复硬编码的 `慢一点`。
- 普通 cut / fade 继续按 `26` 的 transition role 保持有限处理。

未执行：

- 未调用外部 API。
- 未生成 AI sticker image。
- 未新增大型依赖。
- 未提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 未声明 BGM 精准卡点。
- 未声明 `PeakFlash` 精准对齐。

## 3. 贴纸图形适配机制新增内容

已补入机制字段：

| field | 本轮用途 |
|---|---|
| `sticker_visual_fit` | 检查贴纸图形、颜色、质感和当前镜头 / 整体 vlog 语气是否匹配。 |
| `graphic_role` | 明确图形是指向、圈注、轨迹、呼吸、动作短标签还是粗峰值候选。 |
| `color_fit` | 判断颜色是否贴合画面明暗和主体，不抢画面也不弱到不可见。 |
| `texture_fit` | 判断线条、边缘、阴影、透明度是否像轻手绘 / 胶贴语气。 |
| `style_conflict` | 识别随机素材包、儿童模板、电商爆炸贴、赛博 UI、硬 SVG 展示感。 |
| `fail_sticker_graphic_mismatch` | 新增贴纸图形不匹配失败项。 |

核心规则：有 `anchor_target` 和 `placement_rule` 不等于贴纸成立。贴纸图形必须配合画面主体、颜色、运动、情绪和整体 vlog 风格。

## 4. Caption 修复清单

| caption_id | old | new | action | reason |
|---|---|---|---|---|
| `caption_wind_first` | `风先到` | `风动了` | replace | 更贴开场熊猫 / 竹叶动势。 |
| `caption_ka` | `咔` | - | remove | 未确认可见切闪，不保留拟声。 |
| `caption_look` | `看这` | `藏这儿` | replace | 更贴竹叶遮挡 / attention cue。 |
| `caption_tiny` | `tiny thing` | `咬一口` | replace | 绑定熊猫咬竹动作。 |
| `caption_slow` | `慢一点` | `慢一点` | keep | 保留一处呼吸提示，同时删除 scrapbook 重复硬编码文字。 |
| `caption_hidden` | `藏在路上` | `藏一下` | replace | 改为更短的遮挡 / 显露语气。 |
| `caption_just` | `刚好` | - | remove | 缺少明确落点。 |
| `caption_blink` | `别眨眼` | - | remove | 峰值与音乐未人工确认，先不保留 hype 字幕。 |
| `caption_breathe` | `呼` | `呼` | revise | 改为手写高对比语气，服务降速呼吸段。 |
| `caption_second` | `one more second` | - | remove | 避免和 EndCard 主语言竞争。 |

结果：caption events 从 10 条收缩为 6 条。

## 5. Sticker 修复清单

| sticker_id | action | sticker_visual_fit | graphic_role | color_fit | texture_fit | style_conflict |
|---|---|---|---|---|---|---|
| `sticker_open_arrow` | keep + reposition | `partial` | 指向熊猫动作。 | 降低黄色强度。 | 保留手绘线条。 | 仍需人审确认是否真正指向动作。 |
| `sticker_cloud_spark` | remove | `fail` | 无稳定亮点。 | 高亮黄像随机星星。 | 实心星形偏素材包。 | 随机素材包 / 儿童模板感。 |
| `sticker_bamboo_circle` | keep + reposition | `partial` | 圈住遮挡主体。 | 降低饱和。 | 手绘圈可保留。 | 锚点仍需人审。 |
| `sticker_sand_wave` | keep + reposition | `partial` | 沿脚印 / 沙纹轨迹。 | 蓝色增强但保持低饱和。 | 手绘波纹可保留。 | 仍需确认是否贴到真实轨迹。 |
| `sticker_panda_tag` | replace | `partial` | 熊猫咬竹动作短标签。 | 改为浅暖纸感。 | pill 改轻纸签。 | 原说明标签感已降低。 |
| `sticker_scrap_under` | remove | `fail` | 无具体被强调对象。 | 不适用。 | 无对象线条像装饰。 | 随机线条感。 |
| `sticker_reprise_dottrail` | remove | `fail` | 无路径 endpoint。 | 绿色不贴画面。 | 点线像素材包。 | 随机 SVG 库感。 |
| `sticker_peak_burst` | remove | `blocked` | 粗峰值候选。 | 强黄色抢画面。 | 爆炸图形偏模板。 | BGM / 视觉峰值未确认。 |
| `sticker_peak_circle` | remove | `fail` | 未圈主体。 | 粉色冲突。 | 圈注无对象。 | 边缘漂浮。 |
| `sticker_slow_wave` | keep + reposition | `partial` | 呼吸段云 / 海边缘轻线条。 | 提高可见但低饱和。 | 手绘波纹可保留。 | 仍需确认是否贴空天。 |
| `sticker_end_arrow` | remove | `fail` | 结尾不需要额外箭头。 | 黄色抢 EndCard。 | 箭头和尾卡竞争。 | 与 EndCard 冲突。 |

结果：sticker events 从 11 条收缩为 5 条。

## 6. Transition / BGM 处理说明

- 普通 cut / fade：本轮不重做结构，只沿用当前 18 段 visual chain 和 `26` 的 transition role。
- `PeakFlash`：代码层保留，但只能标为 `rough_peak_candidate`，不能写精准卡点。
- BGM：本轮未人工复听，所有音乐相关判断均为 `auto_marker_only` / `needs_review`。
- peak 段：删除 `caption_blink`、`sticker_peak_burst`、`sticker_peak_circle`，避免用强 overlay 证明未确认峰值。

## 7. Render 输出

| artifact | path | git |
|---|---|---|
| limited fix video | `dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample_limited_fix.mp4` | not submitted |
| contact sheet | `dist/remotion_demo_三十秒对标样片_30s_reference_sample/contact_sheet_limited_fix.jpg` | not submitted |
| frame review sheet | `tmp/贴纸图形适配有限修复_frame_review_limited_fix/frame_review_sheet_limited_fix.jpg` | not submitted |

ffprobe / decode summary：

- duration_seconds: `30.058667`
- resolution: `1080x1920`
- fps: `30.000`
- video_codec: `h264`
- audio_present: true
- audio_codec: `aac`
- audio_channels: `2`
- decodable: true
- validation_status: `passed`

说明：以上只属于 technical validation。

## 8. Frame-level review

### 8.1 Captions

| caption_id | start | mid | end | review_status |
|---|---:|---:|---:|---|
| `caption_wind_first` | `00:02.22` | `00:02.80` | `00:03.37` | `needs_review`，开场短词已替换，仍需人审确认是否贴动作。 |
| `caption_look` | `00:07.02` | `00:07.55` | `00:08.07` | `needs_review`，绑定竹叶遮挡语气。 |
| `caption_tiny` | `00:09.28` | `00:09.89` | `00:10.50` | `needs_review`，替换为熊猫动作短词。 |
| `caption_slow` | `00:12.52` | `00:13.14` | `00:13.77` | `needs_review`，scrapbook 重复硬编码已删除。 |
| `caption_hidden` | `00:15.52` | `00:16.11` | `00:16.70` | `needs_review`，短词已改轻。 |
| `caption_breathe` | `00:24.40` | `00:25.03` | `00:25.65` | `needs_review`，呼吸词已提高对比。 |

### 8.2 Stickers

| sticker_id | start | mid | end | review_status |
|---|---:|---:|---:|---|
| `sticker_open_arrow` | `00:02.38` | `00:02.91` | `00:03.43` | `needs_review`，箭头已重定位，仍需确认不遮脸且指向动作。 |
| `sticker_bamboo_circle` | `00:06.82` | `00:07.35` | `00:07.87` | `needs_review`，圈注已重定位，仍需确认圈到主体 / 遮挡边缘。 |
| `sticker_sand_wave` | `00:08.08` | `00:08.61` | `00:09.13` | `needs_review`，波纹已移近沙纹轨迹。 |
| `sticker_panda_tag` | `00:09.70` | `00:10.29` | `00:10.88` | `needs_review`，短标签已改为 `咬`。 |
| `sticker_slow_wave` | `00:24.86` | `00:25.54` | `00:26.21` | `needs_review`，波纹已提高可见度，仍需确认不贴空天。 |

### 8.3 Structure / Peak / End

| event | start | mid | end | review_status |
|---|---:|---:|---:|---|
| `scrapbook_layer_10_92_14_94` | `00:10.92` | `00:12.93` | `00:14.94` | `needs_review`，重复硬编码 `慢一点` 已删除，只保留 caption event。 |
| `PeakFlash` | `00:19.20` | `00:20.40` | `00:22.20` | `rough_peak_candidate` + `needs_review`，未做人耳复听，不写精准对齐。 |
| `EndCard` | `00:27.18` | `00:28.59` | `00:30.00` | `needs_review`，已删除结尾箭头和英文 caption，主语言更集中。 |

## 9. 仍未解决项

- BGM 仍未人工复听。
- `PeakFlash` 仍只是 `rough_peak_candidate`。
- 保留的 5 个 sticker 仍需要用户按真实画面判断图形语气是否足够贴合。
- 当前视频不是正式成片，不是发布候选。
- Codex vlog 导演能力仍需多案例验证。

## 10. 用户人审事项

请优先看：

1. 开场熊猫处 `风动了` + arrow 是否比旧版更自然。
2. 竹叶遮挡处 `藏这儿` + circle 是否真能引导视线。
3. 沙纹处 wave 是否像轨迹标点，还是仍像装饰。
4. 熊猫咬竹处 `咬一口` / `咬` 是否贴动作。
5. `PeakFlash` 是否该保留、降低或删除。
6. EndCard 是否因为删掉结尾 arrow / 英文 caption 后更干净。

## 11. 当前结论

- limited fix video: 已 render。
- contact sheet: 已生成。
- frame-level review: 已生成。
- content_status: `limited_remotion_fix_rendered_pending_user_review`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`

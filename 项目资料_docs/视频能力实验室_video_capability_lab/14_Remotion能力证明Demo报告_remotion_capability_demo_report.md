# Remotion 能力证明 Demo 报告

## 1. 状态

- status: 已确认
- task_type: `technical_sample + capability_proof_demo`
- true_goal: 判断 `Codex + Remotion + BGM marker` 能否基于用户素材做出像样的 10-15 秒 demo
- source_material_folder: `素材/剪辑素材`
- source_material_folder_note: 部分成立：用户描述为 `素材-剪辑素材`，当前仓库实际路径为 `素材/剪辑素材`
- bgm_source: `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`
- bgm_format: `.MOV`
- bgm_audio_extracted: 已确认
- marker_generated: 已确认
- render_result: 已确认：Remotion render 成功
- composition_id: `能力证明Demo-capability-demo`
- composition_id_note: 部分成立：执行单建议 `能力证明Demo_capability_demo`，但 Remotion 不允许 composition id 使用 `_`，因此实际 id 使用 `-`
- demo_video_path: `dist/remotion_demo_能力证明_capability_demo/demo.mp4`
- contact_sheet_path: `dist/remotion_demo_能力证明_capability_demo/contact_sheet.jpg`
- video_committed: false
- external_api: 未调用
- capability_decision: `pass_continue_to_mechanism_design`

## 2. 素材读取结果

| type | file | duration | resolution | has_audio | selected | notes |
|---|---|---:|---|---|---|---|
| BGM | `copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV` | 25.40s | 720x960 | true | yes | 已确认：ffprobe 可读，audio stream 存在。 |
| clip | `sd1674359014_2.MP4` | 6.17s | 720x1280 | true | yes | 已确认：竖屏素材，转码为 runtime demo asset。 |
| clip | `sd1674358932_2.MP4` | 6.30s | 1280x720 | true | yes | 已确认：横屏素材，进入背景/过桥段。 |
| clip | `IMG_3225.MOV` | 8.76s | 1920x1080 | true | yes | 已确认：HEVC 横屏素材，转码为 runtime demo asset。 |
| clip | `IMG_3226.MOV` | 6.01s | 1920x1080 | true | yes | 已确认：HEVC 横屏素材，转码为 runtime demo asset。 |

## 3. BGM 处理结果

| item | status | output | notes |
|---|---|---|---|
| audio stream probe | 已确认 | ffprobe / video-metadata-probe | BGM `.MOV` 包含 AAC stereo audio。 |
| audio extraction | 已确认 | `tmp/remotion_demo_assets/audio/bgm_extracted.wav` | 运行产物，不提交。 |
| 15s demo audio | 已确认 | `tmp/remotion_demo_assets/audio/bgm_demo_15s.wav` | 运行产物，不提交。 |
| Remotion runtime audio | 已确认 | `public/能力证明Demo_assets/audio/bgm_demo_15s.wav` | ignored runtime asset，不提交。 |

## 4. marker 结果

| marker_type | count | confidence | used_in_demo | notes |
|---|---:|---|---|---|
| beat | 16 | 0.68 | yes | 自动分析，未人工复听确认，不是精准 beat tracking。 |
| onset | 20 | 0.62 | yes | 自动分析，未人工复听确认，不是成品级卡点。 |
| rms_peak | 12 | 0.58 | yes | 自动 RMS peak 粗分析，用于辅助触发。 |

## 5. demo 结构

| time_range | section | visual_goal | components | marker_used | result |
|---|---|---|---|---|---|
| 0.0-3.5s | 开场标题 + 手写字 | 用真实竖屏素材先建立 demo 不是网页模板 | `TitleOverlay`, `HandwritingBeatLayer` | beat / onset | 已确认：出现标题和手写 underline。 |
| 3.5-8.3s | 分屏 collage | 同屏验证多素材 layout、裁切、边界稳定 | `SplitScreenCollage`, `HandwritingBeatLayer` | beat / rms_peak | 已确认：出现三 panel collage。 |
| 7.7-10.5s | 标题叠画面 | 用横屏素材承载标题叠层和节奏层 | `TitleOverlay`, `HandwritingBeatLayer` | beat / rms_peak | 已确认：文字层和素材同屏出现。 |
| 10.0-12.0s | 自有 CTA end card | 用原创收束卡表达继续判断，不复刻平台 UI | `OwnCtaEndCard` | rms_peak | 已确认：出现自有 CTA，不含 logo / 二维码 / 账号页。 |

## 6. 组件实现

| component | file_path | status | role | result |
|---|---|---|---|---|
| Root | `remotion/Root.tsx` | 已确认 | 注册 Remotion composition | `npx remotion compositions` passed。 |
| CapabilityDemo | `remotion/组合_compositions/能力证明Demo_capability_demo.tsx` | 已确认 | 组合真实素材、BGM、组件时间轴 | render passed。 |
| HandwritingBeatLayer | `remotion/组件_components/手写字节奏层_handwriting_beat_layer.tsx` | 已确认 | 手写字节奏层 | contact sheet 可见。 |
| SplitScreenCollage | `remotion/组件_components/分屏拼贴_split_screen_collage.tsx` | 已确认 | 分屏 collage | contact sheet 可见。 |
| TitleOverlay | `remotion/组件_components/标题叠层_title_overlay.tsx` | 已确认 | 标题叠画面 | contact sheet 可见。 |
| OwnCtaEndCard | `remotion/组件_components/自有尾卡_own_cta_end_card.tsx` | 已确认 | 自有 CTA end card | contact sheet 可见。 |
| Marker script | `脚本_scripts/生成BGM卡点标记_generate_bgm_beat_markers.py` | 已确认 | 生成 beat/onset/RMS marker | generated counts: beat 16, onset 20, rms_peak 12。 |

## 7. 验收结果

| criterion | pass/fail | evidence | notes |
|---|---|---|---|
| 正确仓库执行 | pass | `/Users/fan/Documents/vlog、odd/video_capability_lab`, remote `fthytwerwt-sudo/video_capability_lab` | 已确认。 |
| 找到 BGM 和剪辑素材 | pass | `素材/剪辑素材/BGM`, `素材/剪辑素材/剪辑` | 路径名与用户描述部分不同，已标部分成立。 |
| BGM `.mov` 音轨提取 | pass | `bgm_extracted.wav`, `bgm_demo_15s.wav` | 运行产物未提交。 |
| beat / onset / RMS marker 生成 | pass | `beat_map.json`, `onset_map.json`, `rms_peaks.json` | 自动粗 marker，不是精准卡点。 |
| Remotion render 成功 | pass | `demo.mp4`, 12.05s, 1080x1920, h264+aac | video-metadata-probe passed。 |
| 手写字节奏层出现 | pass | contact sheet 可见中文手写层与黄色 underline | 视觉自检通过。 |
| 分屏 collage 出现 | pass | contact sheet 第 4-8 秒可见三 panel layout | 视觉自检通过。 |
| 标题叠画面成立 | pass | contact sheet 可见标题叠真实素材 | 视觉自检通过。 |
| CTA end card 成立 | pass | contact sheet 10-12 秒可见原创 CTA | 不含平台 UI。 |
| 明显不像默认网页模板 | pass | 多素材视频 + overlay + collage + CTA | 已确认。 |
| 使用用户剪辑素材 | pass | 4 个剪辑文件均参与 runtime asset | 未提交原素材。 |
| 没有复刻第三方资产 | pass | 未使用平台 logo、二维码、账号页、品牌 UI | 素材本体仅作本地 demo 输入。 |
| 可复跑 | pass | 见本报告命令与源码 | 需先生成 ignored runtime assets。 |

## 8. 最终判断

`pass_continue_to_mechanism_design`

判断理由：Remotion 能读取用户素材转成的本地 runtime assets，BGM `.MOV` 音频可提取，自动 marker 可生成，12 秒 demo 可真实 render，contact sheet 显示手写字节奏层、分屏 collage、标题叠画面和自有 CTA end card 都成立。
保留边界：BGM marker 只是自动粗分析，未人工复听，不得写成精准 beat tracking 已成立；本 demo 不是正式成片，不是发布候选。

## 9. 不足与下一轮修复

- 部分成立：BGM beat_map quality 仍是自动粗 marker，下一轮机制设计需要定义人工复听或更强 validator。
- 部分成立：本轮 demo 已经像样，但还没有多素材主题化编辑 profile；下一轮可沉淀 `demo_editing_profile`。
- 待验证：Remotion 多组件能力能否在第二套素材上稳定复用。
- 待验证：是否需要把 runtime asset 准备过程脚本化，避免手动 FFmpeg 命令散落。

## 10. 保真检查

- 是否把 demo 写成正式成片: 否
- 是否把自动 marker 写成精准卡点: 否
- 是否提交视频 / 音频 / 图片: 否
- 是否使用平台 UI / 品牌资产: 否
- 是否调用外部 API: 否
- 是否把 render 成功写成项目闭环成立: 否
- 是否把 capability proof 写成 publish candidate: 否

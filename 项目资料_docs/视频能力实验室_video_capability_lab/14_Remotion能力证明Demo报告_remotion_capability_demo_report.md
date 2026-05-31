# Remotion 能力证明 Demo 报告

## 1. 状态

- status: 已确认
- task_type: `technical_sample + capability_proof_demo`
- source_material_folder: `素材/剪辑素材`
- source_material_folder_note: 部分成立：用户描述为 `素材-剪辑素材`，当前仓库实际路径为 `素材/剪辑素材`
- bgm_source: `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`
- bgm_format: `.MOV`
- bgm_audio_extracted: 已确认
- marker_generated: 已确认
- render_result: 已确认：Remotion v1 render 成功
- composition_id: `能力证明Demo-capability-demo`
- composition_id_note: 部分成立：执行单建议 `能力证明Demo_capability_demo`，但 Remotion 不允许 composition id 使用 `_`，因此实际 id 使用 `-`
- demo_video_path: `dist/remotion_demo_能力证明_capability_demo/demo.mp4`
- contact_sheet_path: `dist/remotion_demo_能力证明_capability_demo/contact_sheet.jpg`
- video_committed: false
- external_api: 未调用
- user_review: `效果还行，但不是我想要的那种`
- capability_decision: `technical_pass_content_mismatch`

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

## 5. v1 技术通过事实

| criterion | pass/fail | evidence | notes |
|---|---|---|---|
| 正确仓库执行 | pass | `/Users/fan/Documents/vlog、odd/video_capability_lab`, remote `fthytwerwt-sudo/video_capability_lab` | 已确认。 |
| 找到 BGM 和剪辑素材 | pass | `素材/剪辑素材/BGM`, `素材/剪辑素材/剪辑` | 路径名与用户描述部分不同，已标部分成立。 |
| BGM `.mov` 音轨提取 | pass | `bgm_extracted.wav`, `bgm_demo_15s.wav` | 运行产物未提交。 |
| beat / onset / RMS marker 生成 | pass | `beat_map.json`, `onset_map.json`, `rms_peaks.json` | 自动粗 marker，不是精准卡点。 |
| Remotion render 成功 | pass | `demo.mp4`, 12.05s, 1080x1920, h264+aac | video-metadata-probe passed。 |
| 使用用户剪辑素材 | pass | 4 个剪辑文件均参与 runtime asset | 未提交原素材。 |
| 没有复刻第三方平台 UI | pass | 未使用平台 logo、二维码、账号页、品牌 UI | 素材本体仅作本地 demo 输入。 |

## 6. 用户人审反馈

已确认：用户最新 P0 人审反馈为：`效果还行，但不是我想要的那种`。
已确认：该反馈覆盖 Codex 原自评 `pass_continue_to_mechanism_design`。
已确认：v1 技术链路通过不等于审美方向通过。

## 7. 内容方向未通过

v1 当前不合格核心：

- 画面像功能组件展示，不像视频导演作品。
- 文案像项目说明 / PPT / 内部验收，不像观众能看的视频。
- 手写字、分屏、标题、尾卡都在证明组件存在，而不是服务情绪、叙事和镜头节奏。
- 结尾卡在问“继续机制设计？”，这是项目管理语言，不是视频收束语言。
- v1 可以作为技术证明，但不能作为审美方向通过。

## 8. 重判后的最终判断

`technical_pass_content_mismatch`

判断理由：Remotion 能读取用户素材转成的本地 runtime assets，BGM `.MOV` 音频可提取，自动 marker 可生成，12 秒 v1 demo 可真实 render；但用户人审已确认内容方向不是想要的对标感。因此 v1 只能写为技术链路证明，不得继续写为审美通过或进入机制设计。

保留边界：

- BGM marker 只是自动粗分析，未人工复听，不得写成精准 beat tracking 已成立。
- v1 demo 不是正式成片，不是发布候选。
- v1 render success 不是 content pass。
- 进入机制设计必须等待 v2 经用户人审确认方向对。

## 9. v2 方向

- next_target: `demo_v2_aesthetic_retarget`
- required_reference_file: `项目资料_docs/视频能力实验室_video_capability_lab/15_demo审美回审与v2方向_aesthetic_review_retarget.md`
- v2_composition_id: `审美重定Demo-aesthetic-retarget-demo`
- v2_render_status: `rendered_pending_user_review`
- v2_demo_video_path: `dist/remotion_demo_审美重定_aesthetic_retarget/demo_v2.mp4`
- v2_contact_sheet_path: `dist/remotion_demo_审美重定_aesthetic_retarget/contact_sheet_v2.jpg`
- v2_technical_metadata: 已确认：12.053333s / 1080x1920 / 30fps / h264 / AAC stereo
- user_review_required: true

## 10. 保真检查

- 是否把 demo 写成正式成片: 否
- 是否把自动 marker 写成精准卡点: 否
- 是否提交视频 / 音频 / 图片: 否
- 是否使用平台 UI / 品牌资产: 否
- 是否调用外部 API: 否
- 是否把 render 成功写成项目闭环成立: 否
- 是否把 capability proof 写成 publish candidate: 否
- 是否把 v1 写成审美方向通过: 否

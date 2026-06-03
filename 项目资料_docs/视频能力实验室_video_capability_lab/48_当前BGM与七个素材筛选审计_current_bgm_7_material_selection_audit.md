# 当前 BGM 与七个素材筛选审计

## status（状态）

- task_type: `current_bgm_7_material_selection_audit`
- bgm_path: `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`
- materials_count: `7`
- audit_status: `completed_pending_gpt_user_review`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- evidence_level: `metadata_validation_passed + rough_audio_feature_based + partial_visual_contact_sheet_review`
- do_not_claim:
  - 不得声明素材选择已最终通过
  - 不得声明 BGM 精准卡点已确认
  - 不得声明视频已可剪
  - 不得声明 vlog director capability verified

已确认：本轮当前素材路径为 `素材/剪辑素材/剪辑`。

已确认：该目录共有 14 个视频文件，其中 2026-06-03 20:06:08 到 21:49:48 修改的文件正好 7 个，和用户“新加了 7 个素材”的输入吻合，因此本轮以这 7 个文件作为当前审计对象。

已确认：当前 BGM 选用 `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`，因为它是当前素材包 `素材/剪辑素材/BGM/` 下唯一 BGM 文件；`public/` 下的音频属于旧 demo / 样片资产，本轮不作为当前 BGM。

部分成立：本轮通过 contact sheet 做了视觉粗审，但视觉语义仍需 GPT / 用户回审；不得写成 `human_review_confirmed`。

## bgm_related_docs_status（BGM 相关文件读取状态）

- bgm_related_docs_status: `found`
- related_files_read:
  - `codex_source/12_bgm_beat_execution.md`
  - `脚本_scripts/生成BGM卡点标记_generate_bgm_beat_markers.py`
  - `项目资料_docs/视频能力实验室_video_capability_lab/12_音频卡点工具链检测_audio_beat_toolchain_check.md`
  - `项目资料_docs/视频能力实验室_video_capability_lab/24_通用vlog剪辑机制_vlog_director_capability_mechanism.md`
  - `项目资料_docs/视频能力实验室_video_capability_lab/29_对标判断库机制_reference_judgement_library.md`

已确认：已有规则要求区分 `RMS`、`beat_map` 和人工复听；自动 marker 不得写成精准卡点。

## bgm_metadata_and_rough_style（BGM 元数据与粗风格）

| field | value |
|---|---|
| duration | `25.400000s` |
| format | `MOV / hevc video + aac audio` |
| video | `720x960 / 30fps / hevc` |
| audio channels | `2` |
| audio codec | `aac` |
| technical_validation | `passed`，可读、可解码、有音轨 |
| tempo_estimate_bpm | `95.703` |
| beat_count_full | `38` |
| onset_count_full | `94` |
| generated_marker_counts | `beat=16 / onset=20 / rms_peak=12` |
| evidence source | `ffprobe + ffmpeg decode + librosa rough_audio_feature_based` |
| confidence | `rough_audio_feature_based_not_human_listening_confirmed` |

### rough energy sections（粗能量段落）

| section | time_range | mean_rms_norm | max_rms_norm | onset_count | rough_function |
|---|---:|---:|---:|---:|---|
| `intro` | `0.00-4.00s` | `0.417` | `0.820` | `19` | 开头已经有明显 onset，适合快速建立主体，不适合太慢空镜。 |
| `rise` | `4.00-8.00s` | `0.493` | `0.781` | `17` | 推进段，可接场景 / 主体变化。 |
| `action` | `8.00-13.00s` | `0.523` | `0.853` | `21` | 动作 / 视觉变化候选段。 |
| `breath` | `13.00-18.00s` | `0.519` | `0.874` | `19` | 能量不低，呼吸段应短而干净，不宜完全静止过长。 |
| `outro` | `18.00-25.40s` | `0.299` | `1.000` | `18` | 平均能量下降但有 late peak，结尾可先收再给一个短回声。 |

### rough style tags（粗风格标签）

- `medium_tempo_95_7_bpm`
- `steady_pulse`
- `high_onset_density`
- `mid_section_energy_lift`
- `late_peak_then_drop`
- `gym_or_urban_motion_candidate（推测，未人工听感确认）`

待验证：上述风格标签来自自动音频特征和当前素材语境，不是人工听感结论。

## material_inventory（素材清单）

| material_id | path | mtime | duration | resolution | fps | audio | evidence_level |
|---|---|---:|---:|---|---:|---|---|
| `M01` | `素材/剪辑素材/剪辑/IMG_1350.MOV` | `2026-06-03 20:06:08 +0800` | `3.936700s` | `3840x2160` | `59.940` | yes | `metadata_validation_passed + contact_sheet_review` |
| `M02` | `素材/剪辑素材/剪辑/IMG_1351.MOV` | `2026-06-03 20:08:05 +0800` | `6.406700s` | `1920x1080` | `59.940` | yes | `metadata_validation_passed + contact_sheet_review` |
| `M03` | `素材/剪辑素材/剪辑/IMG_1353.MOV` | `2026-06-03 20:10:56 +0800` | `2.935000s` | `1920x1080` | `59.940` | yes | `metadata_validation_passed + contact_sheet_review` |
| `M04` | `素材/剪辑素材/剪辑/IMG_1358.MOV` | `2026-06-03 20:26:01 +0800` | `5.065000s` | `1920x1080` | `30.000` | yes | `metadata_validation_passed + contact_sheet_review` |
| `M05` | `素材/剪辑素材/剪辑/IMG_1359.MOV` | `2026-06-03 20:41:16 +0800` | `3.388333s` | `1920x1080` | `59.940` | yes | `metadata_validation_passed + contact_sheet_review` |
| `M06` | `素材/剪辑素材/剪辑/IMG_1360.MOV` | `2026-06-03 21:09:09 +0800` | `2.485000s` | `1920x1080` | `59.940` | yes | `metadata_validation_passed + contact_sheet_review` |
| `M07` | `素材/剪辑素材/剪辑/IMG_1361.MOV` | `2026-06-03 21:49:48 +0800` | `9.531700s` | `1920x1080` | `30.000` | yes | `metadata_validation_passed + contact_sheet_review` |

## material_candidate_table（素材候选表）

| material_id | selection | recommended_use | matched_bgm_section | reason | risk | evidence_level |
|---|---|---|---|---|---|---|
| `M01` | `selected` | 健身房动作 / 器械中景，可作为 action 或 build 里的主动作素材。 | `rise -> action` | 人物和器械动作可读，4K / 59.94fps 给裁切和短切余量。 | 前景器械遮挡明显，画面密度高，不能长时间停留。 | `contact_sheet_review_partial` |
| `M02` | `backup` | 器械纹理 / gym texture，适合 0.4-0.8s 过渡短切。 | `rise` | 同一健身房语境，能补充机械节奏。 | 主体不够清楚，若放长会像无目的机位。 | `contact_sheet_review_partial` |
| `M03` | `backup` | 健身房建立镜头或空间提示。 | `intro` | 能交代场景，有空间感。 | 画面倾斜且主体弱，开头使用需裁切或回审。 | `contact_sheet_review_partial` |
| `M04` | `backup` | 器械纵向纹理 / 切点遮挡素材。 | `rise -> action` | 金属线条和设备运动感适合高 onset 段短切。 | 前景杆件占比过大，视觉噪音高；不适合做主镜头。 | `contact_sheet_review_partial` |
| `M05` | `selected` | 饮品特写，作为 breath / contrast / ending object。 | `breath -> outro` | 主体清楚、低动作、低信息密度，可给高密度 BGM 一个短换气点。 | 品牌字样可见，是否保留需用户回审；不适合 action peak。 | `contact_sheet_review_partial` |
| `M06` | `selected_pending_review` | 镜面人物 / gym identity，可做开头人物锚点或 build 前身份确认。 | `intro -> rise` | 人物主体清楚，和健身房主题直接相关。 | 涉及可识别人物 / 自拍语境，隐私、裁切和风格需用户确认。 | `contact_sheet_review_partial + user_review_required` |
| `M07` | `selected_pending_style_review` | 夜路树影 / 人影，适合 mood opening、外部过渡或 ending。 | `intro or outro` | 情绪和光影强，视觉密度较低，可承担气氛或收束。 | 和 gym 主线场景差异大；若中段使用会显得跳戏。 | `contact_sheet_review_partial + style_review_required` |

## sequence_suggestion（素材顺序建议）

本节只输出候选顺序，不生成视频，不写最终剪辑方案。

| function | primary_candidate | backup_candidate | note |
|---|---|---|---|
| opening candidate | `M06` | `M07` | 如果本期要先建立“健身 / 自我记录”，用 `M06`；如果要 mood-first，用 `M07`。 |
| build candidate | `M03` | `M02` | `M03` 建空间，`M02` 用作短切纹理。 |
| action / visual change candidate | `M01` | `M04` | `M01` 更适合主动作；`M04` 只建议短切。 |
| breath candidate | `M05` | `M07` | `M05` 适合 0.8-1.2s 短换气；`M07` 适合情绪转场。 |
| ending candidate | `M07` | `M05` | 如果结尾想有日记感 / 回路感，用 `M07`；如果保持 gym-only，用 `M05`。 |

候选结构：

```text
M06 or M07 -> M03 -> M01 -> M02/M04 short texture -> M05 -> M07 or M05
```

部分成立：该结构只说明素材功能关系，不代表片段时长、卡点或最终顺序已通过。

## do_not_use_or_review（禁用 / 待确认）

- `M02`：只建议短切备选；如果 GPT / 用户觉得主体不清，应降级为 `rejected_for_current_bgm_mainline`。
- `M04`：只建议短切备选；前景器械遮挡太强，不适合承担主叙事。
- `M05`：品牌字样清晰，是否保留需用户回审；若要避免品牌露出，只做裁切或不用。
- `M06`：涉及可识别人物和自拍语境，必须用户确认后才能作为主 opening。
- `M07`：夜路 / 影子和健身房主线差异大；如果本期目标是纯 gym workout，不应放入中段。

## next_goal（下一个目标）

```text
gpt_user_review_current_bgm_7_material_selection_audit
```

回审通过后，下一轮才允许进入：

```text
bgm_driven_material_sequence_plan（BGM 驱动素材顺序方案）
```

待验证：下一轮仍只能产出候选剪辑结构和片段建议；进入 Remotion / render 前必须继续补 `visual_selection_table`、`video_event_table` 和人工回审结果。

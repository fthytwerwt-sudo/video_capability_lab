# 通用 BGM 风格驱动素材筛选机制

## status（状态）

- task_type: `universal_bgm_style_driven_material_selection_system`
- mechanism_status: `completed_pending_gpt_user_review`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- source_files:
  - `AGENTS.md`
  - `项目资料_docs/视频能力实验室_video_capability_lab/24_通用vlog剪辑机制_vlog_director_capability_mechanism.md`
  - `项目资料_docs/视频能力实验室_video_capability_lab/29_对标判断库机制_reference_judgement_library.md`
  - `codex_source/12_bgm_beat_execution.md`
  - `脚本_scripts/生成BGM卡点标记_generate_bgm_beat_markers.py`
  - `项目资料_docs/视频能力实验室_video_capability_lab/12_音频卡点工具链检测_audio_beat_toolchain_check.md`
- do_not_claim:
  - 不得声明 `BGM precise beat sync confirmed`
  - 不得声明 `material selection approved`
  - 不得声明 `video ready to edit`
  - 不得声明 `vlog director capability verified`

已确认：本机制是每期视频开剪前必须执行的通用前置机制，不是某一条 demo 的局部修补。

已确认：本轮没有生成视频、没有 render、没有调用图片 / 视频 / 音频 API、没有修改 Remotion 正片时间线。

待验证：本机制仍需多 BGM、多素材包、多风格锚点回归后，才能证明 Codex 稳定具备 BGM 驱动素材筛选能力。

## mechanism_positioning（机制定位）

`universal_bgm_style_driven_material_selection_system` 位于 `visual_selection_table（画面选择表）` 之前，负责回答“这些素材为什么适合这首 BGM，以及每个素材应该承担什么剪辑功能”。

它解决的问题不是“素材能不能解码”，也不是“素材好不好看”，而是：

```text
material_pack + bgm -> bgm_style_analysis -> material_function_selection -> candidate_sequence -> GPT / user review -> edit allowed
```

每期视频开剪前，Codex 不能直接把素材丢进时间线。即使素材技术可读，也必须先跑 BGM 风格、能量曲线、素材动作、画面密度和情绪匹配判断。

## core_principle（核心原则）

素材选择不是“好看就用”。

素材选择必须由：

```text
BGM_style + energy_curve + scene_function + material_motion + visual_density + emotion_fit + edit_structure
```

共同决定。

如果素材好看但不服务当前 BGM 的情绪、段落、能量或呼吸点，应降级为 `backup` 或 `rejected`，不得因为可用就进入时间线。

## bgm_analysis_fields（BGM 分析字段）

| field | required_judgement | evidence_rule |
|---|---|---|
| `tempo_feel（速度感）` | 判断快 / 中 / 慢，以及是否适合短切。 | 自动 tempo 只能写 `rough_audio_feature_based`。 |
| `energy_curve（能量曲线）` | 判断 intro / rise / action / breath / outro 的强弱。 | RMS / waveform / 人工复听分开标。 |
| `mood（情绪）` | 判断冷、热、松、紧、运动感、日常感等。 | 未人工听感确认时写 `推测`。 |
| `density（音乐密度）` | 判断 onset 密度和画面可承载信息量。 | onset count 只代表粗密度。 |
| `section_map（段落结构）` | 粗分开头、推进、峰值、呼吸、收束。 | 自动分段必须允许 GPT / 用户改。 |
| `onset_marker（粗起点 / 变化点）` | 给短切、动作点、字幕 / 贴纸候选提供参考。 | 不得写精准卡点。 |
| `breath_points（换气点）` | 给留白、饮品、远景、低动势素材留位置。 | 未复听时只能写 `candidate_breath_point`。 |
| `peak_points（峰值点）` | 给动作峰值、视觉变化、节奏推进素材留位置。 | RMS peak 不能等同于 beat peak。 |
| `ending_feel（收束感）` | 判断结尾应干净、回环、停顿或强收。 | 必须和素材 ending candidate 联动。 |
| `confidence（置信度）` | 标明 `metadata_only`、`rough_audio_feature_based`、`human_listening_confirmed`。 | 默认不得升级到人工确认。 |

## material_analysis_fields（素材分析字段）

| field | required_judgement | failure_if_missing |
|---|---|---|
| `material_id（素材编号）` | 每个素材必须有稳定编号。 | `fail_material_inventory_missing` |
| `path（路径）` | 使用仓库相对路径。 | `fail_material_path_missing` |
| `duration（时长）` | 判断可切片长度。 | `fail_material_duration_unknown` |
| `resolution（分辨率）` | 判断是否适合竖屏 / 横屏裁切。 | `fail_resolution_unknown` |
| `motion_intensity（动作强度）` | 判断素材适合推进、峰值、呼吸还是收束。 | `fail_motion_unknown` |
| `camera_motion（镜头运动）` | 判断是否稳、晃、推拉、转向或遮挡。 | `fail_camera_motion_unknown` |
| `subject_type（主体类型）` | 人、物、环境、手部、器械、影子等。 | `fail_subject_unclear` |
| `visual_density（画面密度）` | 判断画面信息是否会和 BGM 密度冲突。 | `fail_visual_density_unknown` |
| `mood_fit（情绪适配）` | 判断素材和 BGM 情绪是否同向或形成有效反差。 | `fail_mood_fit_unknown` |
| `usable_segments（可用片段）` | 只给候选时段，不写最终剪辑方案。 | `fail_no_usable_segment` |
| `do_not_use_when（禁用场景）` | 说明什么时候不能用。 | `fail_no_rejection_rule` |
| `evidence_level（证据等级）` | `metadata_only` / `contact_sheet_review` / `human_review_confirmed`。 | `fail_evidence_level_missing` |

## bgm_material_match_matrix（BGM-素材匹配矩阵）

| edit_function | material_fit | bgm_fit | judgement_rule |
|---|---|---|---|
| 开头建立气质 | 低到中密度、有清楚主体或环境锚点。 | intro 情绪清楚但未完全起势。 | 若 BGM 开头密度高，开头素材也要有明确动作或强视觉锚点。 |
| 节奏推进 | 中高运动、能承接短切。 | rise 段 onset / beat 稳定。 | 画面运动不能比 BGM 更散。 |
| 动作峰值 | 清楚动作、触点、转身、机械运动或镜头变化。 | RMS peak / onset cluster 候选。 | 自动 peak 只做候选，进时间线前需复听或回审。 |
| 视觉变化 | 场景、色温、主体尺度明显变化。 | 从 rise 到 action 或 action 到 breath 的变化点。 | 不为变化而变化，必须服务段落。 |
| 呼吸留白 | 饮品、远景、静物、低动作或空镜。 | energy drop / breath point 候选。 | 呼吸段不加过多贴纸或字幕。 |
| 情绪反差 | 夜路、影子、镜面、自我叙事等和主体线形成转折。 | BGM 有停顿、降速或段落换气。 | 反差必须被结构解释，否则降级备选。 |
| 收束镜头 | 稳定、干净、可停留，有回环或尾声感。 | outro / late drop / ending feel。 | 若结尾 BGM 仍强，不宜用过静素材硬收。 |

## pre_edit_execution_flow（剪辑前执行流程）

1. 定位 BGM。
2. 分析 BGM 粗风格和段落。
3. 定位素材池。
4. 给每个素材打标签。
5. 判断素材和 BGM 的风格匹配。
6. 选出主素材、辅助素材、弃用素材。
7. 给每个素材分配剪辑功能。
8. 形成候选剪辑结构。
9. 进入 Remotion / 剪辑前必须由 GPT / 用户回审。
10. 失败后按失败类型回路。

## judgement_standards（判断标准）

| standard | pass | partial | fail | evidence_required |
|---|---|---|---|---|
| `bgm_style_fit（BGM 风格适配）` | 素材情绪和 BGM 主风格同向或反差有结构理由。 | 只适合某一小段。 | 素材情绪完全跑题。 | BGM 粗分析 + 素材 contact sheet / 人审。 |
| `energy_fit（能量适配）` | 素材动势匹配段落能量。 | 动势可用但需要短切。 | 高能 BGM 配低效素材或反之。 | RMS / onset / motion tag。 |
| `motion_fit（动作适配）` | 动作点清楚，可承接 beat / onset。 | 动作弱但可做呼吸。 | 动作散或不可读。 | contact sheet / 抽帧 / 人审。 |
| `visual_density_fit（画面密度适配）` | 画面密度和音乐密度互相支撑。 | 需裁切或缩短。 | 画面太乱或太空。 | contact sheet + density tag。 |
| `emotional_fit（情绪适配）` | 情绪能服务本期主题。 | 需 GPT / 用户确认。 | 情绪冲突无结构理由。 | style_anchor + user review。 |
| `section_fit（段落适配）` | 素材功能清楚归入 intro / rise / action / breath / outro。 | 功能可选但不唯一。 | 放在哪都解释不通。 | section_map + material role。 |
| `cut_potential（剪辑潜力）` | 有明确入点、出点和可切动作。 | 可用但需要强裁切。 | 只能作为背景或不建议用。 | duration + camera motion + visual moment。 |
| `avoid_noise（避免视觉噪音）` | 不增加无意义设备遮挡、杂乱或 UI 感。 | 仅短切可用。 | 会破坏观看焦点。 | contact sheet / frame review。 |

## failure_feedback_routing（失败反馈路由）

| fail_code | symptom | route |
|---|---|---|
| `fail_bgm_style_unclear（BGM 风格不清）` | 只知道有音乐，不知道风格和能量。 | 回到 BGM 分析或人工听感确认。 |
| `fail_material_semantics_unclear（素材语义不清）` | Codex 看不清主体 / 动作 / 情绪。 | 回到素材 contact sheet / 用户确认。 |
| `fail_energy_mismatch（能量不匹配）` | 切出来显得拖或乱。 | 回到 BGM section map 或素材排序。 |
| `fail_motion_mismatch（动作不匹配）` | 动作点和音乐点不搭。 | 回到 material motion tag。 |
| `fail_visual_density_mismatch（画面密度不匹配）` | 画面太乱或太空。 | 回到画面密度选择。 |
| `fail_edit_structure_flat（剪辑结构平）` | 全片像素材顺序播放。 | 回到片段功能分配，不是直接加贴纸。 |
| `fail_bgm_cut_not_feel_right（音乐剪辑不顺）` | 技术卡点有但观看不顺。 | 回到 BGM marker / 人工复听。 |
| `fail_material_overused（素材过度使用）` | 一个素材被拖太长。 | 回到素材筛选和时长分配。 |
| `fail_wrong_opening_material（开头素材错）` | 开头建立错情绪或错主体。 | 回到 BGM intro mood 和开场功能。 |
| `fail_no_breath_point（没有换气点）` | 全片一直满，用户疲劳。 | 回到 BGM breath points 和留白素材。 |

## next_execution_bridge（下一轮执行桥接）

下一轮建议任务：

```text
bgm_driven_material_sequence_plan（BGM 驱动素材顺序方案）
```

进入下一轮前必须先回审本轮 `48_当前BGM与七个素材筛选审计_current_bgm_7_material_selection_audit.md`。

下一轮允许产出候选顺序、片段时长建议、剪辑功能表和失败回路；仍不得把自动 marker 写成精准卡点，也不得把候选顺序写成最终剪辑方案。

## do_not_claim（禁止声明）

不得声明：

- BGM 精准卡点已确认
- 素材选择已最终通过
- 视频已可剪
- vlog director capability verified

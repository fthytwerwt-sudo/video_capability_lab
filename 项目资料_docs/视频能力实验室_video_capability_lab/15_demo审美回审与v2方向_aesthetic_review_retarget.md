# Demo 审美回审与 v2 方向

## 1. 状态

- task_type: `demo_v1_review_and_aesthetic_retarget`
- v1_technical_validation: `pass`
- v1_content_validation: `fail`
- v1_status: `technical_pass_content_mismatch`
- user_review: `效果还行，但不是我想要的那种`
- next_target: `demo_v2_aesthetic_retarget`
- v2_allowed_status_after_render: `rendered_pending_user_review`
- content_pass_authority: 用户人审

## 2. 对标锚点

- primary_reference: `素材/vlog 参考/02.MP4`
- secondary_reference: `素材/vlog 参考/01.MP4`
- reference_use_rule: 只迁移机制，不迁移资产。

已确认：本轮对标以 `video_02` 为主，`video_01` 为辅。
已确认：参考视频提供的是镜头组织、文字节奏、分屏变化、标题叠实拍和结尾收束机制，不提供可直接复刻的 UI、品牌、字体、音乐、人物或地点资产。

## 3. 合格审美方向

- 像短视频 / vlog montage，不像组件展示。
- 先有镜头和情绪，再有文字和组件。
- 开场先给真实镜头、物件、运动或空间进入感，不先放大标题。
- 手写字短、快、贴切点，只做节奏层，不抢主体。
- 分屏短时出现，只作为节奏变化，不做长时间 layout 展示。
- 标题叠在真实画面上，表达情绪或主题，不做项目说明。
- 尾卡是视频收束，不是项目管理问题。
- BGM marker 只能作为粗节奏辅助，不能写成精准卡点。

## 4. 不合格审美标准

### fail_01_self_referential_project_copy

画面文案出现 `Remotion capability proof`、`BGM marker`、`继续机制设计`、`review`、`capability proof only` 等内部项目语言，判定不合格。

### fail_02_component_showcase_layout

片子看起来像在展示“我有哪些组件”，而不是一个连续视频，判定不合格。

### fail_03_web_ppt_card_feel

画面以大标题、大边框、说明文字、静态卡片为主，像网页 / PPT / UI mockup，判定不合格。

### fail_04_no_story_or_emotion

没有开场、推进、回环、收束，只是素材拼贴，判定不合格。

### fail_05_overlays_fight_with_footage

手写字、标题、分屏遮挡主体或抢走镜头注意力，判定不合格。

### fail_06_split_screen_too_long_or_too_rigid

分屏停留太久，边框感太重，像 layout demo，判定不合格。

### fail_07_cta_is_project_management

尾卡在问“是否继续机制设计”或解释项目状态，判定不合格。

### fail_08_claims_music_sync_without_review

未经人工复听，把自动 marker 写成精准卡点，判定不合格。

### fail_09_reference_asset_copying

复刻平台 UI、品牌资产、原字体、原文案、二维码、搜索框，判定不合格。

## 5. v2 反向验收标准

- 不出现内部项目说明文案。
- 不解释技术链路。
- 不用“组件名称”当观众文案。
- 画面先让人感到“这是一条视频”，再让人看到能力。
- v2 允许是技术 demo，但观感必须像能展示的视频样片。
- v2 内容状态只能写为 `rendered_pending_user_review` 或 `technical_render_completed_pending_user_review`，不得写成内容通过。

### 5.1 v2 10-15 秒时间结构

| time_range | required_shape | acceptance |
|---|---|---|
| 0-2s | 真实镜头 / 物件 / 运动开场 | 不先上大标题，不解释项目。 |
| 2-5s | 微镜头切换或生活切片 | 用节奏推进，不做组件说明。 |
| 4-7s | 短手写字进入 | 不遮挡主体，文字像视频内短句。 |
| 6-9s | 短分屏 collage | 只做节奏变化，不能像 UI layout demo。 |
| 8-11s | 标题叠真实画面 | 表达情绪或主题，不解释技术。 |
| 10-12s | 自有尾卡 | 做视频收束，不提机制设计。 |

## 6. v2 禁止项

- 禁止复刻平台 UI、logo、watermark、账号页、搜索框、二维码。
- 禁止复刻品牌包装、商标、店铺海报。
- 禁止复刻原字体、原贴图、原文案、原音乐。
- 禁止使用路人、人脸、地标、交通/站内标识作为可识别资产目标。
- 禁止把 render success 写成 content pass。
- 禁止把自动 BGM marker 写成精准卡点。

## 7. 当前判断

已确认：v1 技术链路通过。
已确认：用户 P0 人审反馈推翻 `pass_continue_to_mechanism_design`。
已确认：v1 当前仓库判断必须降级为 `technical_pass_content_mismatch`。
待验证：v2 是否方向对，必须等待用户人审确认。

## 8. v2 本地 render 结果

- composition_id: `审美重定Demo-aesthetic-retarget-demo`
- render_status: `rendered_pending_user_review`
- local_demo_path: `dist/remotion_demo_审美重定_aesthetic_retarget/demo_v2.mp4`
- contact_sheet_path: `dist/remotion_demo_审美重定_aesthetic_retarget/contact_sheet_v2.jpg`
- duration_seconds: `12.053333`
- resolution: `1080x1920`
- fps: `30`
- video_codec: `h264`
- audio_present: true
- audio_codec: `aac`
- technical_validation: 已确认：video-metadata-probe passed
- content_validation: 待验证：必须等待用户人审

已确认：v2 本地技术 render 成功。
已确认：v2 demo 和 contact sheet 都是 ignored 运行产物，不得提交。
已确认：v2 当前只能写 `rendered_pending_user_review`，不得写内容方向已通过。

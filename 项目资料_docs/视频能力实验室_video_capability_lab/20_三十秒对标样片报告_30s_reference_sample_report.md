# 三十秒对标样片报告

## 状态

- task_type: `30s_reference_sample_rebuild`
- route_decision: `full_30s_reference_sample_rebuild`
- duration_target: `30s`
- actual_duration: `30.058667s`
- composition_id: `三十秒对标样片-30s-reference-sample`
- duration_in_frames: `900`
- fps: `30`
- local_demo_path: `dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample.mp4`
- contact_sheet_path: `dist/remotion_demo_三十秒对标样片_30s_reference_sample/contact_sheet_30s_reference_sample.jpg`
- content_status: `rendered_pending_user_review`

本轮已确认：上一轮 12 秒样片不满足用户“看到一个对标的东西”的要求。本轮不是贴纸小修，不是字幕小修，不是继续做 capability proof，而是新增完整 30 秒竖屏对标样片。

## 用户反馈记录

- 已确认：用户指出上一轮只有 12 秒。
- 已确认：用户认为上一轮没有真正学习到 10 个新参考视频。
- 已确认：用户要求这次看到 30 秒对标样片，且“该有的东西都要有”。
- 已确认：本轮成功标准不是技术可行，而是把参考报告的审美方式落入完整 30 秒结构。

## 参考报告使用方式

参考依据：`项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`

已使用规则：

- `object_pov_opening`: 以沙纹/脚印真实纹理开场，不先上标题。
- `micro_montage_chain`: 18 个微段落推进，单段约 1.4-2.4 秒。
- `emotion_word_overlay`: 字幕使用情绪词、拟声字和短英文，不写说明句。
- `scrapbook_black_canvas`: 10.92-14.94 秒使用短 scrapbook / 画中画呼吸段。
- `motif_reprise`: 沙纹、竹叶熊猫、海雾、云层在前中后回环。
- `short_split_or_screen_within_screen`: 拼贴段只作节奏变化，不作长 layout 展示。
- `own_cta_end_card`: 27.18-30 秒原创尾卡收束，不复刻平台 UI。

已避开的 hard fail：

- 不出现内部项目观众文案。
- 不做 PPT / 网页 / 组件展示感。
- 不复刻平台 UI、搜索框、二维码、账号页、watermark、品牌包装、原字体、原贴纸、原文案或原音乐。
- 不把自动 marker 写成精准卡点。
- 不把 render 成功写成内容通过。

## 新素材使用情况

visual_source_folder: `素材/剪辑素材/剪辑`

已确认：该目录下 7 个视频均可读取和解码。本轮选用 6 个视频，排除 `IMG_6985.MOV`，原因是儿童和室内吉祥物场景会提高风险并干扰本轮 motif。

| selected | source_path | usage |
|---|---|---|
| yes | `sd1674359014_2.MP4` | 沙纹、脚印、纹理开场和 motif 回声 |
| yes | `IMG_0971.MOV` | 熊猫/竹叶主 motif 与尾声回看 |
| yes | `sd1674358932_2.MP4` | 海雾、远景人物、降速呼吸 |
| yes | `IMG_3226.MOV` | 云潮、海边空间推进 |
| yes | `IMG_0970.MOV` | 竹叶遮挡、熊猫回环和高潮 |
| yes | `IMG_3225.MOV` | 云层、海边远景、高潮和收束 |
| no | `IMG_6985.MOV` | 儿童/吉祥物场景，未进入本轮 |

## BGM 沿用情况

- bgm_source: `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`
- bgm_same_as_previous: `true`
- bgm_audio_status: `aac / 2ch / duration 25.4s`
- bgm_looped_or_extended: `true`
- runtime_audio: `public/三十秒对标样片_assets/音频_audio/三十秒BGM_30s_bgm_looped.wav`
- marker_counts: `beat 16` / `onset 20` / `rms_peak 12`

部分成立：本轮 BGM 已做 30 秒本地平滑延展，并生成自动粗 marker。待验证：未做人耳复听，不是精准 beat tracking，不是 publish-grade 音乐卡点。

## 30 秒时间结构

| time_range | section | implementation |
|---|---|---|
| 00:00-00:03 | opening_hook | 沙纹真实纹理开场，随后熊猫进入，不上项目标题 |
| 00:03-00:07 | micro_montage_1 | 海雾、云潮、竹叶遮挡形成空间推进 |
| 00:07-00:11 | sticker_caption_moment | 沙纹、熊猫和海滩切换，字幕/贴纸贴动作出现 |
| 00:11-00:15 | scrapbook_or_split | 黑底拼贴 / 画中画，用海、沙、竹叶三块画面呼吸 |
| 00:15-00:19 | motif_reprise | 竹叶、云洞、熊猫、沙面回到主 motif |
| 00:19-00:23 | emotional_peak | 云层和竹影叠大词与明显贴纸 |
| 00:23-00:27 | slowdown_breath | 海雾、银色天空降速 |
| 00:27-00:30 | own_end_card | 熊猫尾声作背景，原创尾卡收束 |

## 素材段落表

| count | value |
|---|---:|
| selected_segments | 18 |
| source_videos_used | 6 |
| runtime_clips_generated | 18 |
| main_motif | `sand_bamboo_sea_breath` |

18 个段落覆盖：`opening_hook`、`object_or_texture`、`movement_bridge`、`sticker_moment`、`caption_moment`、`scrapbook_or_split`、`motif_reprise`、`emotional_peak`、`slowdown_breath`、`end_card_background`。

## 字幕事件表

| count | text_events |
|---|---|
| 10 | `风先到`、`咔`、`看这`、`tiny thing`、`慢一点`、`藏在路上`、`刚好`、`别眨眼`、`呼`、`one more second` |

已确认：字幕是情绪/节奏层，不是解释层；没有内部项目语言。

## 贴纸事件表

| count | sticker_types |
|---|---|
| 11 | arrow、spark、circle、wave、tag、underline、dottrail、burst |

已确认：贴纸为纯代码 SVG / CSS / text，尺寸按肉眼可见处理，单帧不堆满，不使用参考视频原贴纸或原 emoji 样式。

## Motif 回环

- 开头：沙纹 + 竹叶熊猫。
- 中段：沙纹、竹叶、海雾在 scrapbook 中交错。
- 高潮：云层和竹影放大，贴纸增强情绪。
- 尾声：熊猫回看 + 自有尾卡，呼应开头的竹叶/熊猫。

## 技术验证

- `npx remotion compositions remotion/Root.tsx`: 新 composition 显示 `900 (30.00 sec)`。
- `npx remotion render remotion/Root.tsx 三十秒对标样片-30s-reference-sample ...`: passed。
- video metadata: 30.058667s / 1080x1920 / 30fps / h264 / AAC stereo / decodable / passed。
- contact sheet: 已生成，覆盖 00:00、00:03、00:07、00:11、00:15、00:19、00:23、00:27、00:29.5。
- visual self-check: 开场为真实沙纹；贴纸肉眼可见；11 秒进入 scrapbook；尾卡为原创收束。

## 未提交运行产物

已确认：以下产物只保留本地，不进入 Git：

- demo video: `dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample.mp4`
- contact sheet: `dist/remotion_demo_三十秒对标样片_30s_reference_sample/contact_sheet_30s_reference_sample.jpg`
- runtime assets: `public/三十秒对标样片_assets/`
- temp files: `tmp/三十秒对标样片_30s_reference_sample/`

## 当前状态

- final_task_status: `completed_remote_verified`
- content_status: `rendered_pending_user_review`
- remaining_confirmation: 用户仍需人工审看 30 秒样片，判断它是否已经明显在学习 10 个新参考视频的审美方式。

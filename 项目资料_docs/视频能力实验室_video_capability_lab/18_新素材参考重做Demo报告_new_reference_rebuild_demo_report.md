# 新素材参考重做 Demo 报告

## 结论

- task_type: `new_reference_rebuild_demo`
- route_decision: `full_rebuild_from_new_materials`
- source_reference_report: `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`
- visual_source_folder: `素材/剪辑素材/剪辑`
- bgm_source: `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`
- composition_id: `新素材参考重做Demo-new-reference-rebuild-demo`
- render_status: `rendered`
- content_status: `rendered_pending_user_review`
- local_demo_path: `dist/remotion_demo_新素材参考重做_new_reference_rebuild/demo_new_reference_rebuild.mp4`
- contact_sheet_path: `dist/remotion_demo_新素材参考重做_new_reference_rebuild/contact_sheet_new_reference_rebuild.jpg`

本轮已重新做一个完整 Remotion demo，不 patch 旧 v2。技术层已 render 成功；内容层仍必须等待用户人审，不能写成审美方向已通过。

## 输入确认

### 新素材

已确认 `素材/剪辑素材/剪辑` 下 7 个视频文件均可读取和解码：

| file | duration | resolution | fps | decode |
|---|---:|---|---:|---|
| `IMG_0970.MOV` | 14.40s | 1920x1080 | 59.94 | passed |
| `IMG_0971.MOV` | 16.77s | 1920x1080 | 59.94 | passed |
| `IMG_3225.MOV` | 8.76s | 1920x1080 | 59.94 | passed |
| `IMG_3226.MOV` | 6.00s | 1920x1080 | 59.94 | passed |
| `IMG_6985.MOV` | 18.30s | 1920x1080 | 59.96 | passed |
| `sd1674358932_2.MP4` | 6.30s | 1280x720 | 30.00 | passed |
| `sd1674359014_2.MP4` | 6.17s | 720x1280 | 30.00 | passed |

### BGM

- 已确认：沿用同一个 BGM 文件。
- 已确认：BGM 文件有 AAC stereo 音轨，可提取本地运行音频。
- 部分成立：BGM marker 已生成自动粗分析，包含 `beat: 16`、`onset: 20`、`rms_peak: 12`。
- 待验证：该 marker 未做人耳复听，不是精准 beat tracking，也不是 publish-grade 音乐卡点。

## 选材决策

本轮 motif 定为 `sand_bamboo_breath`：沙纹 / 熊猫竹叶 / 海雾 / 云层呼吸。

| role | selected_source | reason | risk_note |
|---|---|---|---|
| opening_object | `sd1674359014_2.MP4` | 沙纹和脚印先行，符合真实镜头先于文字。 | 低风险，无平台 UI、品牌或可识别人脸。 |
| motif_reprise | `IMG_0971.MOV` | 熊猫和竹叶提供具体记忆点。 | 部分成立，只作本地 demo 素材。 |
| movement_bridge | `sd1674358932_2.MP4` | 海雾和远景人物让画面从物件转向空间。 | 部分成立，远处有人影但不可识别。 |
| movement_bridge | `IMG_3226.MOV` | 海边与云层提供呼吸感。 | 部分成立，远景人群只作本地 demo。 |
| motif_reprise | `IMG_0970.MOV` | 竹叶遮挡和熊猫回环强化 motif。 | 部分成立，只作本地 demo 素材。 |
| closing_breath | `IMG_3225.MOV` | 云层和海边远景适合收束。 | 部分成立，远景人群只作本地 demo。 |

`IMG_6985.MOV` 未选用：画面包含儿童和室内吉祥物/场馆环境，内容风险和审美干扰更高。

## 剪辑结构

- `0.00-2.05s`: 沙纹开场，先给真实纹理，不急着解释。
- `1.85-3.40s`: 熊猫/竹叶进入，字幕 `风过来` 与手绘箭头短暂出现。
- `3.18-4.63s`: 海雾桥段降速，保留空间和人物距离。
- `4.44-6.29s`: 竹叶遮挡回环，字幕 `慢一点` 与手绘圈短暂出现。
- `6.52-8.57s`: 黑底 scrapbook 三画面，模拟参考包里的呼吸式拼贴，不做长时间布局展示。
- `8.36-9.94s`: 云层和海边远景，字幕 `藏在路上`。
- `9.68-10.86s`: 熊猫 motif 短回看。
- `10.46-12.00s`: 自有尾卡式收束，文案 `先停在这里。`

## 字幕与贴纸规则

- 已确认：字幕只使用情绪短词和原创短句，不使用项目内部说明。
- 已确认：贴纸为手绘箭头、手绘圈、短 wave 和 spark，均为原创 SVG doodle。
- 已确认：字幕和贴纸只在局部出现，不长时间压住主体。
- 已确认：没有复刻平台 UI、logo、二维码、账号页、搜索框、品牌贴纸、原字体或原文案。

## 参考规则对齐

对齐 `16_新参考包审美解析_new_reference_aesthetic_pack.md` 的可迁移规则：

- `object_pov_opening`: 用沙纹/脚印作为开场真实物件。
- `micro_montage_chain`: 每个段落控制在约 1.2-2.1 秒。
- `emotion_word_overlay`: 只用 `风过来`、`慢一点`、`藏在路上` 这类情绪词。
- `scrapbook_black_canvas`: 使用短黑底拼贴，不做网页/PPT/card 展示。
- `short_split_or_screen_within_screen`: 拼贴段控制在约 2 秒。
- `own_cta_end_card`: 结尾为自有短句收束，不复刻平台 CTA。

## Hard Fail 避免项

- 已确认：没有使用 `Codex`、`BGM marker`、`capability proof`、`机制设计`、`component` 等内部观众不可见文案。
- 已确认：没有把 render success 写成 content pass。
- 已确认：没有提交视频、音频、图片、runtime assets、`dist` 或 `tmp`。
- 已确认：没有调用外部 API，没有训练模型，没有安装大型依赖。
- 部分成立：BGM marker 只能作为粗节奏辅助，未做人耳复听。

## 技术验证

- `python3 脚本_scripts/检查视频能力工具链_check_video_capability_toolchain.py`: passed
- `npx remotion compositions remotion/Root.tsx`: passed，包含新 composition id。
- `npx remotion render remotion/Root.tsx 新素材参考重做Demo-new-reference-rebuild-demo ...`: passed
- video metadata: 12.053333s / 1080x1920 / 30fps / h264 / AAC stereo / decodable / passed
- contact sheet: 已生成并完成视觉自检。

## 当前状态

- final_task_status: `completed_remote_verified`
- content_status: `rendered_pending_user_review`
- remaining_confirmation: 用户需要人工审看本地 demo，确认这次是否更接近想要的参考包审美。

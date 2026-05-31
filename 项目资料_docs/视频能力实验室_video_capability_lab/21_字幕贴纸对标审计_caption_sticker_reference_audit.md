# 字幕贴纸对标审计

## 状态

- task_type: `caption_sticker_reference_audit`
- source_video: `dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample.mp4`
- source_contact_sheet: `dist/remotion_demo_三十秒对标样片_30s_reference_sample/contact_sheet_30s_reference_sample.jpg`
- source_report: `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`
- source_sample_report: `项目资料_docs/视频能力实验室_video_capability_lab/20_三十秒对标样片报告_30s_reference_sample_report.md`
- source_composition: `remotion/组合_compositions/三十秒对标样片_30s_reference_sample.tsx`
- source_data: `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts`
- user_feedback: 用户认为 30 秒样片“有了”，但字幕和贴纸与对标视频差距太大，贴纸位置有问题，贴纸大小和判断标准基本为零。
- status: `audit_completed_fix_pending`

## 总判断

已确认：当前不是插件缺失优先，也不是马上调用 API 生成贴纸的问题。

已确认：当前核心问题是 `caption_sticker_quality_gap_requires_audit_before_fix`：30 秒样片代码里存在 `10` 个 caption events 和 `11` 个 sticker events，但事件数量不等于字幕/贴纸审美达标。

已确认：旧报告中“贴纸肉眼可见”的判断太浅，因为它没有逐帧证明以下事实：贴纸是否贴住主体、是否足够大、是否有参考功能、是否在正确节奏点出现、是否像参考视频里的语气标点。

部分成立：当前字幕已经避开内部项目语言，且多数是短词；但它们仍缺少 `semantic role`、镜头动作绑定和位置理由。

部分成立：当前贴纸在部分 mid frame 中可见；但多数贴纸更像代码 SVG 形状，不像参考视频里贴着动作或小主体出现的语气标点。

## 检测标准表

### 字幕检测标准

| rule_id | 检测标准 | 合格判断 | 不合格判断 |
|---|---|---|---|
| caption_short_phrase | 是否为 1-3 个词 | 1-3 个词，像情绪词、拟声词、歌词碎片 | 说明句、项目词、过长 headline |
| caption_semantic_role | 是否有 semantic role | 明确承担情绪、拟声、提示、呼吸或 peak 角色 | 只是有 text，没有为什么出现 |
| caption_action_binding | 是否绑定镜头动作 | 字幕靠近手部、物件、动作或主体变化 | 字幕飘在空处，只和时间点弱相关 |
| caption_timing | 是否出现在正确节奏点 | 出现在动作发生、切镜、降速或 peak 的 0.2-0.5s 内 | 早到、晚到、或和镜头切换错位 |
| caption_position | 是否不抢主体 | 放在主体旁边或留白处，帮助看主体 | 遮挡主体、太边缘、或和画面重心无关 |
| caption_not_explanation | 是否像说明文字 | 像情绪/节奏层 | 像解说、验收项、项目说明 |
| caption_motif | 是否与 motif 有关系 | 与 `sand_bamboo_sea_breath` 的沙、竹、海、风、呼吸有关 | 泛化短词，换到任何视频都能用 |

### 贴纸检测标准

| rule_id | 检测标准 | 合格判断 | 不合格判断 |
|---|---|---|---|
| sticker_visible_size | 是否肉眼可见 | mid frame 能一眼看清，且不只靠暂停查找 | start/mid 都淡、太小、太浅或混进背景 |
| sticker_minimum_size | 是否有 minimum visible size | 有明确宽高下限，例如主体贴纸不低于画面宽 14%-18% | 只有 SVG 原始尺寸，没有视频画面里的可见尺寸标准 |
| sticker_anchor_target | 是否有 anchor target | 明确贴住熊猫、脚印、云洞、海面波纹、字幕或动作点 | 只有 x/y，没有目标主体 |
| sticker_placement_rule | 是否和主体距离合理 | 贴纸离主体边缘约 12-48px，方向能指向动作 | 位置太边缘、太高、太远、或指向不清 |
| sticker_reference_function | 是否像语气标点 | 强化一个动作、小主体、疑问、惊讶、节奏停顿 | 像随机装饰、抽象形状或代码 demo |
| sticker_not_steal_subject | 是否抢主体 | 只辅助主体，不压过主体 | 大面积抢画面或和字幕一起造成 overlay overload |
| sticker_style_unified | 是否和字幕同风格 | 贴纸、字幕、motif 使用同一套手写/轻喜剧/呼吸语言 | 字幕像文案，贴纸像 SVG 库，两套语言断开 |
| sticker_frame_check | 是否有 frame-level check | 每个 sticker 有 start/mid 关键帧证据 | 只看代码事件数量或笼统写“可见” |

## 抽帧 / contact sheet 对照

已确认：原 contact sheet 只覆盖 9 个时间点，不足以审计全部 sticker event。

已确认：本轮从当前本地视频重新抽取所有 sticker event 的 start / mid frame，输出到 ignored 临时目录，不提交。

| artifact | path | status |
|---|---|---|
| sticker frame map | `tmp/三十秒贴纸字幕审计_caption_sticker_audit/frame_map.tsv` | 已生成，未提交 |
| sticker keyframes | `tmp/三十秒贴纸字幕审计_caption_sticker_audit/frames/` | 已生成 22 张，未提交 |
| sticker keyframe sheet | `tmp/三十秒贴纸字幕审计_caption_sticker_audit/sticker_keyframe_sheet.jpg` | 已生成，未提交 |

观察结论：贴纸在 mid frame 多数能被暂停识别，但不少 start frame 处于淡入或位置无意义；这不能支撑“贴纸审美成立”，只能说明 technical overlay 存在。

## 字幕事件审计表

| id | text | time | duration | x/y | tone | bound_segment | expected_reference_rule | actual_problem | pass/fail | fix_direction |
|---|---|---:|---:|---|---|---|---|---|---|---|
| `caption_wind_first` | 风先到 | 2.22 | 1.20 | 86/1184 | hand | `panda_head_turn` | 情绪词应贴真实动作或风/叶/运动感 | 文案有诗意，但画面主体是熊猫吃竹，字幕没有明确绑定风、叶或动作，位置偏左下只是避让主体 | fail | 改为绑定熊猫抬头或竹叶动势，例如标注 `anchor_target=panda_head/leaf_motion` |
| `caption_ka` | 咔 | 4.88 | 0.90 | 756/386 | small | `mist_people_wide` -> `cloud_tide_open` | 拟声词应贴切镜、快门、碰撞或动作点 | 时间靠近切镜但画面是雾海/云潮，缺少“咔”的可见动作依据，位置高右也没有主体 | fail | 只在真正切镜闪点或画面遮挡点出现，或换成呼吸/风类词 |
| `caption_look` | 看这 | 7.18 | 1.00 | 78/948 | hand | `bamboo_hide` | 提示词应指向一个具体小主体 | 文字泛化，用户不知道要看竹叶、熊猫还是遮挡；没有箭头/贴纸协同 | fail | 必须增加 `semantic_role=attention_cue` 与 `anchor_target=bamboo_hide/panda_face` |
| `caption_tiny` | tiny thing | 9.36 | 1.35 | 72/220 | serif | `panda_bamboo_bite` | 短英文应像 editorial 情绪层并贴画面 | 熊猫不是 tiny thing，语义和主体尺度冲突；上方位置像标题但没有 editorial 画面支撑 | fail | 改成与熊猫动作或竹叶 motif 相关的短词，或换到真正小物件镜头 |
| `caption_slow` | 慢一点 | 12.52 | 1.25 | 112/832 | small | `scrapbook_or_split` | 降速词可在 scrapbook 呼吸段出现 | 方向基本对，但 composition 中 scrapbook 层另有硬编码“慢一点”，造成重复；小字位置在黑底边缘，像注释 | fail | 保留一个版本，绑定到 scrapbook 降速段中心留白，避免重复字幕 |
| `caption_hidden` | 藏在路上 | 15.52 | 1.35 | 74/1210 | impact | `bamboo_reprise` -> `cloud_window` | motif 词应绑定具体回环镜头 | 语义和 motif 接近，但时间跨竹叶/云洞，位置低左像大标题，未说明藏的是竹叶、熊猫还是路 | fail | 拆成具体 shot_binding_reason：竹叶遮挡/云洞回环二选一 |
| `caption_just` | 刚好 | 18.82 | 1.00 | 682/1074 | hand | `sand_echo` | 情绪词应贴动作完成点或构图巧合 | 字幕短，但“刚好”没有对应动作或构图证据，只是放在沙面留白 | fail | 绑定脚印/波纹/切镜落点；若无动作，删除 |
| `caption_blink` | 别眨眼 | 20.18 | 1.35 | 82/988 | impact | `sky_peak` | peak 字幕应和高潮视觉同步 | 可读性强，但偏 hype 口号；画面是云层/人群远景，没有可辨的瞬间动作，容易像通用短视频模板 | fail | 只有在 burst、遮挡转场或主体动作 peak 处保留，并加 `reference_function=peak_punctuation` |
| `caption_breathe` | 呼 | 24.40 | 1.20 | 830/320 | small | `silver_sky_close` | 拟声/呼吸词应服务降速 | 语义方向对，但位置高右、字体深色，和天空背景对比不足，观众容易漏掉 | fail | 放到低动势留白且提高对比，绑定 `slowdown_breath` |
| `caption_second` | one more second | 26.72 | 1.40 | 78/1160 | serif | `panda_end_reprise` + `EndCard` | 结尾短英文可做收束 | 3 词勉强合格，但和 27.18s EndCard 重叠，形成两套结尾文案；位置低左也可能被 end card 视觉重心接管 | fail | 结尾只保留 caption 或 EndCard 一套主语言，并明确收束层级 |

字幕归因：`caption_semantic_mismatch`、`caption_timing_mismatch`、`caption_position_mismatch` 均存在。最主要问题不是“没有字幕”，而是每条字幕缺少 `semantic role`、`anchor target` 和 `shot_binding_reason`。

## 贴纸事件审计表

| id | kind | text | time | duration | x/y | color | estimated_visual_size | bound_segment | expected_reference_rule | actual_problem | pass/fail | fix_direction |
|---|---|---|---:|---:|---|---|---|---|---|---|---|---|
| `sticker_open_arrow` | arrow | - | 2.38 | 1.05 | 710/1098 | `#ffe15a` | 约 172-210px 宽，107-130px 高；mid frame 可见 | `panda_head_turn` | 箭头应指向熊猫动作或竹叶动势 | mid frame 可见且接近熊猫，但 start frame 不明显；没有明确定义箭头尖端要指向的 body part | fail | 加 `anchor_target=panda_paw/bamboo_bite`，按主体框重新定位箭头尖端 |
| `sticker_cloud_spark` | spark | - | 4.98 | 1.15 | 800/498 | `#f8ff74` | 约 119-145px 方形；mid frame 可见 | `cloud_tide_open` | spark 应强化一个小主体或惊讶点 | 贴在天空右上，远离海边人群/云层动作，像随机星星；start frame 极淡 | fail | 若保留，绑定云洞亮点；否则删除 |
| `sticker_bamboo_circle` | circle | - | 6.80 | 1.05 | 514/564 | `#ffcf5b` | 约 139-170px 方形；mid frame 可见 | `bamboo_hide` | 圈应圈住主体或被遮挡的小重点 | 圈在竹叶/树叶区域，未圈住熊猫脸或关键动作；用户很难知道为什么圈那里 | fail | 绑定 `panda_face` 或 `leaf_hide_edge`，不要圈空叶子 |
| `sticker_sand_wave` | wave | - | 8.12 | 1.00 | 120/1320 | `#9fe8ff` | 约 189-230px 宽，79-96px 高；mid frame 可见 | `sand_footprint_detail` | 波浪应贴脚印/沙纹运动 | 视觉可见，但位置偏低，贴住的是沙面空纹理；没有明确脚印 anchor | fail | 贴近脚印或沙纹线条，建立 `anchor_target=footprint_trace` |
| `sticker_panda_tag` | tag | 小重点 | 9.70 | 1.20 | 688/302 | `#ff8c7a` | 约 139-170px 宽，59-72px 高；mid frame 可见但小 | `panda_bamboo_bite` | tag 应像轻喜剧语气，贴住小主体 | 位置在上方栏杆/竹叶附近，不贴熊猫；“小重点”像说明标签，不像参考视频里的自然语气 | fail | 改成更短拟声/表情词，并贴近熊猫头部或手部 |
| `sticker_scrap_under` | underline | - | 12.78 | 1.10 | 132/902 | `#fff0a6` | 约 189-230px 宽，79-96px 高；sheet 中可见度弱 | `scrapbook_or_split` | underline 应服务某个字或画中画焦点 | underline 贴在黑底/画中画附近，但没有明显 underline 对象；像装饰线 | fail | 只给具体 caption 或 panel 边缘做强调，避免无对象下划线 |
| `sticker_reprise_dottrail` | dottrail | - | 15.86 | 1.20 | 730/1098 | `#c2ff8a` | 约 172-210px 宽，98-120px 高；小点可见但弱 | `cloud_window` | dot trail 应表示视线/动作路径 | 绿点在云海/远景人群上漂浮，没有路径终点，像随机点 | fail | 绑定云洞运动方向或删除 |
| `sticker_peak_burst` | burst | - | 20.42 | 1.25 | 804/924 | `#ffdd45` | 约 139-170px 方形；mid frame 明显 | `sky_peak` | burst 应强化高潮动作 | 尺寸可见，但贴在天空/人群远景右侧，缺少具体动作；更像 generic SVG | fail | 绑定 peak 的亮点/云层开口，或换成更贴 reference 的手写符号 |
| `sticker_peak_circle` | circle | - | 21.46 | 1.05 | 130/472 | `#ff9ec4` | 约 139-170px 方形；mid frame 可见 | `bamboo_peak` | circle 应圈主体小重点 | 位置靠左上边缘，不圈住熊猫/竹影主体；色彩可见但语义无依据 | fail | 重新定位到主体边缘，或删除该圈 |
| `sticker_slow_wave` | wave | - | 24.86 | 1.35 | 626/436 | `#d7f6ff` | 约 189-230px 宽，79-96px 高；浅色贴天空较弱 | `silver_sky_close` | wave 可表达呼吸/海风 | 语义方向接近，但色彩太淡，贴在天空空处，没有海面或风向 anchor | fail | 提高对比并贴海面/云层边缘，写入 `reference_function=slowdown_breath` |
| `sticker_end_arrow` | arrow | - | 27.10 | 1.00 | 710/1220 | `#ffe15a` | 约 172-210px 宽，107-130px 高；mid frame 受 EndCard 竞争 | `panda_end_reprise` + `EndCard` | 结尾箭头应辅助最终关注点 | 箭头与 EndCard 同时争夺视线；指向不清，像临时贴纸而非收束语气 | fail | 结尾只保留一个明确视觉引导，绑定熊猫回看或 end line，不要两者都抢 |

贴纸归因：`sticker_size_too_small` 部分成立，主要表现为 start frame 淡入不可见、tag/dottrail/spark 视觉弱；`sticker_position_unmotivated`、`sticker_not_bound_to_subject`、`sticker_shape_too_generic`、`sticker_style_not_reference_like`、`sticker_visibility_unverified` 已确认存在。

## 主要问题归因

| issue_type | judgment | evidence | next_fix_rule |
|---|---|---|---|
| `caption_semantic_mismatch` | 已确认 | `tiny thing` 对熊猫主体语义不准，`咔` 缺少动作依据 | 每条 caption 必须有 `semantic_role` |
| `caption_timing_mismatch` | 部分成立 | 部分 caption 靠近切镜，但没有动作级触发点 | caption timing 必须绑定切镜、动作或音频 marker，不只写秒数 |
| `caption_position_mismatch` | 已确认 | 多数 caption 只是放在留白或边缘，缺少主体距离规则 | caption 必须写 `anchor_target` 和避让主体规则 |
| `sticker_size_too_small` | 部分成立 | start frame 淡入不可见；tag/dottrail/spark 在整屏中偏弱 | sticker 必须有 `minimum visible size` |
| `sticker_position_unmotivated` | 已确认 | spark、circle、dottrail 多数贴在空天空/树叶/边缘 | sticker 必须有 placement_rule |
| `sticker_not_bound_to_subject` | 已确认 | 多数 sticker 只有 x/y，没有主体框或 shot_binding_reason | sticker 必须有 `anchor target` |
| `sticker_shape_too_generic` | 已确认 | star/circle/wave/dottrail 更像 SVG 库形状 | sticker 必须有 reference_function，不能只从 kind 生成 |
| `sticker_style_not_reference_like` | 已确认 | 参考贴纸像语气助词，本片贴纸像抽象装饰 | 建立统一 handwriting / light-comedy punctuation 风格 |
| `sticker_visibility_unverified` | 已确认 | 旧报告未覆盖所有 sticker start/mid frame | 每个 sticker 必须有 frame-level check |
| `self_check_too_shallow` | 已确认 | 旧报告把“事件数量”和“可见”写成审美事实 | 禁止只用数量达标判断质量 |

## 下一轮修复建议

修复前置规则：

1. 每个贴纸必须有 `anchor target`，例如 `panda_face`、`panda_paw`、`footprint_trace`、`cloud_gap`、`caption_word`。
2. 每个贴纸必须有 `minimum visible size`，并在 1080x1920 画面中写明最小宽/高或画面占比。
3. 每个贴纸必须有 `reference function`，例如 `attention_cue`、`comic_punctuation`、`slowdown_breath`、`peak_punctuation`。
4. 每个贴纸必须有 `shot_binding_reason`，说明它为什么在这个镜头出现。
5. 每个贴纸必须有 frame-level check，至少覆盖 start frame 和 mid frame。
6. 字幕必须有 `semantic role`，不得只写 text。
7. 字幕必须绑定镜头动作、motif 或节奏点，不得只写泛化短词。
8. 不允许只用数量达标判断质量；`10` 个字幕和 `11` 个贴纸只能说明 overlay 存在，不能说明审美成立。
9. 贴纸和字幕必须形成同一套风格语言：如果字幕是手写轻情绪，贴纸也要像手写语气标点，而不是随机 SVG 库。
10. 下一轮修复应先改 spec / data schema，再改 Remotion 表现层；否则仍会把 x/y 当审美判断。

## API 贴纸方案判断

已确认：本轮不建议直接 API。

已确认：API 可以作为下一阶段 `api_generated_sticker_pack_probe`，但不是当前优先解法。

已确认：API 不解决放置、大小、时机和语气问题。

原因：当前失败主要在 placement、anchor、timing、reference function 和 self-check 标准。即使 API 生成更可爱的贴纸，如果没有 `sticker spec`，仍会继续出现贴纸太小、位置飘、和主体无关、抢主体或语气不对的问题。

如果后续做 API，必须先有以下 sticker spec：

| field | required | rule |
|---|---|---|
| `sticker_name` | yes | 原创命名，不复制参考贴纸 |
| `emotion` | yes | 轻喜剧、惊讶、呼吸、提示、peak 等 |
| `visual_style` | yes | 手写、胶贴、软边、透明底等 |
| `transparent_background` | yes | 必须说明是否透明背景 |
| `size` | yes | 在 1080x1920 中的目标宽高和最小宽高 |
| `placement_rule` | yes | 和主体的距离、方向、避让规则 |
| `forbidden_style` | yes | 禁止平台贴纸、原 emoji、品牌/IP、过度拟真等 |
| `reference_function` | yes | 说明它学的是参考视频的哪种功能，不是复制样式 |
| `not_to_copy` | yes | 不复制原贴纸、原字体、原文案、平台 UI |

## 完成状态

- audit_status: `audit_completed_fix_pending`
- missing_plugin_required: `false`
- api_should_be_used_now: `false`
- fix_allowed_this_round: `false`
- source_video_technical_validation: `passed`
- content_validation: `failed_pending_fix`
- next_goal: 基于本审计报告修复 30 秒样片字幕和贴纸层，不允许再只用事件数量判断达标。

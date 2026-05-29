# BGM beat 执行边界

## 当前定位

BGM beat_map 管线当前状态 `待验证`。本文件只规定边界，不证明音频结果已验证。

## 输入字段

- `source_audio_path`
- `clip_start`
- `clip_duration`
- `target_bpm`
- `voiceover_path`
- `ducking_policy`

## 输出字段

- `trimmed_audio_path`
- `beat_map_path`
- `rms_report_path`
- `mix_output_path`
- `validation_result`

## RMS 和精准 beat 区分

`RMS` 表示能量变化，可用于 ducking；`beat_map` 是用于卡点的 marker 列表。不能用 RMS 高点冒充精准 beat。

## TTS ducking

旁白存在时，BGM 必须 ducking。若没有响度验证，状态必须写 `待验证`。

## BGM 不得盖人声

混音验收必须检查旁白清晰度。未检查不得写音频结果已完成。

## 阻断条件

- 没有本地授权 BGM。
- 缺音频输入。
- 缺 FFmpeg 或音频分析能力。
- 输出无法验证响度或 marker。

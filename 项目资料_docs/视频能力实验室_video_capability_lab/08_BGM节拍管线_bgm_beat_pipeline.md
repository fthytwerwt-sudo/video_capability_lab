# BGM 节拍管线

## 当前状态

当前状态：待验证

## 本地 BGM 输入

输入只能来自本地授权或用户明确允许使用的 BGM 文件。当前阶段不调用外部音乐 API，不下载未经授权音乐。

## 音频裁切

裁切目标是得到 probe 可用的短音频片段，并记录 source、start、duration、output_path。裁切不等于节拍识别成功。

## BPM / RMS / onset / beat marker 区别

- `BPM`：整体节奏速度估计。
- `RMS`：音量能量曲线，可辅助 ducking。
- `onset`：声音事件起点，适合找明显敲击或入点。
- `beat marker`：最终给 Remotion / timeline 使用的卡点时间列表。

## beat_map 输出格式

```json
{
  "status": "待验证",
  "source_audio": "path/to/local.wav",
  "bpm": null,
  "markers": [
    {"time": 0.0, "type": "beat", "confidence": "待验证"}
  ],
  "rms_segments": [],
  "notes": []
}
```

## Remotion 卡点读取方式

Remotion probe 应读取 `markers[].time`，把卡片、文字、转场或镜头切换绑定到 marker，而不是靠硬编码帧数冒充卡点。

## FFmpeg 混音方式

FFmpeg 混音必须保留原始旁白可读性，记录输入、滤镜、输出和响度检查结果。

## 旁白 ducking 要求

旁白出现时 BGM 需要自动或手动 ducking。BGM 不得盖过人声；若没有响度检查，状态只能写 `待验证`。

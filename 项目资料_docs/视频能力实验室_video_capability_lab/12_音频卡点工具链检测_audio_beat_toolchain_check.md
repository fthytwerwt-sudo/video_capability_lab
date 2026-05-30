# 音频卡点工具链检测报告

## 1. 状态

- status: 部分成立
- task_type: audio_beat_toolchain_check
- workdir: `/Users/fan/Documents/vlog、odd/video_capability_lab`
- repo: `fthytwerwt-sudo/video_capability_lab`
- branch: `main`
- generated_at: `2026-05-31 00:26:18 +0800`
- ffmpeg_status: available
- ffprobe_status: available
- python_status: available
- venv_status: created
- librosa_status: available
- numpy_status: available
- scipy_status: available
- soundfile_status: available
- install_performed: true
- external_api: 未调用
- video_generation: 未执行
- capability_status: `BGM beat_map` 仍为 `待验证`

## 2. 检测结果

| item | status | version | notes |
|---|---|---|---|
| FFmpeg | available | `ffmpeg version 8.1` | path: `/opt/homebrew/bin/ffmpeg` |
| ffprobe | available | `ffprobe version 8.1` | path: `/opt/homebrew/bin/ffprobe` |
| Python | available | `3.9.6` | path: `.venv/bin/python` |
| `.venv` | created | Python 3.9.6 | 使用项目根目录本地虚拟环境；未全局安装。 |
| pip | available | `26.0.1` | 由 `.venv` 内 `pip 21.2.4` 升级。 |
| librosa | available | `0.11.0` | import test passed |
| numpy | available | `2.0.2` | import test passed |
| scipy | available | `1.13.1` | import test passed |
| soundfile | available | `0.13.1` | import test passed |

## 3. 安装记录

- 是否创建 `.venv`: 是
- 是否安装 librosa: 是，安装到 `.venv`
- 是否安装 numpy: 是，安装到 `.venv`
- 是否安装 scipy: 是，安装到 `.venv`
- 是否安装 soundfile: 是，安装到 `.venv`
- 安装命令: `.venv/bin/python -m pip install librosa soundfile numpy scipy`
- 是否全局安装: 否
- 是否使用 sudo: 否
- 是否使用 Homebrew 安装系统依赖: 否
- 是否提交 `.venv`: 否
- 额外本地修复: 已确认，系统 `python3` 创建的 `.venv` 首次加载 `numpy` compiled extension 时被 macOS library policy 拒绝；已仅对 `.venv` 内 pip wheel 的 `.so` 文件执行本地 ad-hoc `codesign --force --sign -`，未修改系统环境。
- requirements 记录: `依赖_requirements/音频分析_audio_analysis_requirements.txt`
- requirements 路径说明: 部分成立：执行单建议 `requirements/音频分析_audio_analysis_requirements.txt`，但本仓库新建目录必须中文+English，因此改用 `依赖_requirements/`。

## 4. synthetic audio test（合成音频测试）

- test_status: passed
- generated_click_count: 8
- estimated_tempo: 117.454
- beat_count: 7
- beat_times: `[0.511, 1.022, 1.509, 2.02, 2.531, 3.019, 3.529]`
- notes:
  - synthetic click audio only
  - does not prove real BGM beat_map quality
  - 首次运行因 `numba` / `librosa` 初始化较慢，后续复跑已正常完成

## 5. 当前能力判断

- audio_toolchain: 部分成立
- BGM beat_map: 待验证
- reason: FFmpeg / ffprobe / Python / librosa / numpy / scipy / soundfile 已能在本地 `.venv` 中运行，且 synthetic audio test 已通过；但尚未对真实 BGM 或 vlog 音频生成 `beat_map.json`、`onset_map.json`、`rms_peaks.json`，因此不能写成 `BGM beat_map 管线已验证`。

## 6. 下一步建议

下一个目标：执行 `BGM beat_map probe（音乐卡点能力探针）`。

建议输入：

- 一段真实 BGM，或从 `素材/vlog 参考` 的视频中提取的音频。

建议输出：

- `beat_map.json`
- `onset_map.json`
- `rms_peaks.json`
- `waveform_review.png`
- 人工复听清单

## 7. 保真检查

- 是否全局安装: 否
- 是否提交 `.venv`: 否
- 是否提交音频 / 视频 / 图片: 否
- 是否把 synthetic test 写成真实 beat_map 能力成立: 否
- 是否生成正式视频: 否
- 是否调用外部 API: 否
- 是否安装大型依赖: 否

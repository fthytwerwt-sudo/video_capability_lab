# 阿里图片 API 环境变量配置

## 1. status

- task_type: `alibaba_image_env_setup`
- provider: `alibaba_dashscope`
- env_status: `env_prepared_pending_user_key`
- current_state: `alibaba_image_env_created_pending_user_key`
- next_probe: `alibaba_image_contract_and_watermark_free_sticker_probe`
- api_call_allowed_this_round: `false`
- asset_generation_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- render_allowed_this_round: `false`

已确认：本轮只为阿里图片 API 建立 env 填写入口，不调用 API，不生成图片。

## 2. 本轮目标

用户要从 MiniMax key 阻断路线切换到阿里图片 API 路线。

本轮真实目标是：

1. 在 `.env.example` 中加入阿里图片 API 的空字段和默认策略值。
2. 在 ignored 本地 `.env` 中补齐同名字段。
3. 在图片生成策略配置中新增 `alibaba_dashscope` provider route。
4. 为下一轮阿里图片 API 契约解析和单图无水印贴纸探针做准备。

## 3. 用户需要填写的字段

用户只需要打开本地 ignored 文件 `.env`，填写：

```bash
DASHSCOPE_API_KEY=
```

如果下一轮脚本需要兼容别名，可从同一个值同步到：

```bash
ALIBABA_DASHSCOPE_API_KEY=
```

已确认：真实 API key 只能填写在本地 `.env`。

禁止：把真实 API key 填入 `.env.example`、项目文档、报告、脚本、commit message 或任何可提交文件。

## 4. env 字段说明

| field | purpose | status |
|---|---|---|
| `IMAGE_API_PROVIDER` | 当前图片 provider 路由建议 | `alibaba_dashscope` |
| `DASHSCOPE_API_KEY` | 阿里百炼 / DashScope API key | 等待用户填写 |
| `ALIBABA_DASHSCOPE_API_KEY` | 兼容别名 | 等待用户按需同步 |
| `ALIBABA_IMAGE_MODEL` | 阿里图片模型名 | 下一轮读取官方文档后确定 |
| `ALIBABA_IMAGE_ENDPOINT` | 阿里图片 API endpoint | 下一轮读取官方文档后确定 |
| `ALIBABA_IMAGE_SIZE` | 单图尺寸默认值 | `1024x1024` |
| `ALIBABA_IMAGE_RESPONSE_FORMAT` | 响应格式默认值 | `base64` |
| `ALIBABA_IMAGE_N` | 单次生成数量默认值 | `1` |
| `ALIBABA_IMAGE_PROMPT_OPTIMIZER` | prompt optimizer 默认开关 | `false` |
| `ALIBABA_REQUIRE_NO_WATERMARK` | 要求无水印 | `true` |
| `ALIBABA_REQUIRE_NO_GENERATED_LABEL` | 要求无生成标识 | `true` |
| `ALIBABA_REQUIRE_NO_LOGO` | 要求无 logo | `true` |
| `ALIBABA_REQUIRE_NO_BRAND_MARK` | 要求无 brand mark | `true` |
| `ALIBABA_REQUIRE_TRANSPARENT_OR_CLEAN_CUTOUT` | 要求透明 PNG 或 clean cutout source | `true` |
| `ALIBABA_ALLOWED_FOR_STICKER_CANDIDATE` | 贴纸候选允许状态 | `pending_contract_probe` |
| `ALIBABA_ALLOWED_FOR_CONNECTION_TEST` | 是否允许下一轮连通性测试 | `true` |

## 5. 下一轮目标

下一轮是：

`alibaba_image_contract_and_watermark_free_sticker_probe`

执行顺序必须是：

1. 检查 `.env` 是否存在 `DASHSCOPE_API_KEY`，不得打印真实值。
2. 读取阿里 / DashScope 官方图片 API 文档。
3. 解析 endpoint、model、auth、request fields、response fields。
4. 只调用阿里一个 provider。
5. 只生成 1 张 `paper_sound_tag` 单图候选。
6. 检查 no watermark、no generated label、no logo、no brand mark、transparent PNG 或 clean cutout source。

如果 `.env` 没有 `DASHSCOPE_API_KEY`，必须 `blocked_missing_dashscope_api_key`。

## 6. do_not_claim

本轮不得声明：

- `Alibaba API verified`
- `Alibaba model resolved`
- `Alibaba no-watermark provider verified`
- `sticker asset approved`
- `sticker asset pack completed`
- `video fixed`
- `visual language passed`
- `Remotion integration completed`
- `vlog director capability verified`

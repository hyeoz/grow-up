export type GeminiRequestBody = {
  inlineData?: {
    data: string;
    mimeType: string;
  };
  text?: string;
}[];

/*
  { sdkHttpResponse: 
    { headers: 
        { 'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
          'content-encoding': 'gzip',
          'content-length': '941',
          'content-type': 'application/json; charset=UTF-8',
          date: 'Thu, 24 Jul 2025 13:31:53 GMT',
          server: 'scaffolding on HTTPServer2',
          'server-timing': 'gfet4t7; dur=6413',
          vary: 'Origin, X-Origin, Referer',
          'x-content-type-options': 'nosniff',
          'x-frame-options': 'SAMEORIGIN',
          'x-xss-protection': '0' } 
    },
    candidates: [ 
      { 
        content: { 
          parts: [ 
            { text: '```json\n{\n  "resStatus": "success",\n  "name": "측백나무 (Thuja orientalis)",\n  "state": "전반적으로 건강해 보입니다. 잎의 색깔이 밝고 촘촘하게 자란 것으로 보아 영양 상태도 양호한 것으로 추정됩니다. 다만, 부분적으로 그늘진 곳은 통풍이 잘 안될 경우 곰팡이병이 발생할 수 있으니 주의가 필요합니다.",\n  "growthRate": "측백나무는 비교적 느리게 자라는 편입니다. 현재 상태로는 적절한 햇빛과 수분 공급이 이루어진다면 꾸준히 성장할 것으로 예상됩니다.",\n  "careTip": "1. 햇빛이 잘 드는 곳에 배치하고 통풍이 잘 되도록 관리해주세요. 2. 겉흙이 마르면 물을 충분히 주세요. 과습은 뿌리썩음병을 유발할 수 있으니 주의하세요. 3. 늦가을이나 초봄에 가지치기를 통해 수형을 정리해주면 더욱 건강하게 자랄 수 있습니다."\n}\n```' } 
          ],
          role: 'model' 
        },
        finishReason: 'STOP',
        avgLogprobs: -0.15238270656668024 
      } 
    ],
    modelVersion: 'gemini-2.0-flash',
    usageMetadata: { 
      promptTokenCount: 3662,
      candidatesTokenCount: 278,
      totalTokenCount: 3940,
      promptTokensDetails: [ 
        { modality: 'TEXT', tokenCount: 308 },
        { modality: 'IMAGE', tokenCount: 3354 } 
      ],
      candidatesTokensDetails: [ { modality: 'TEXT', tokenCount: 278 } ] 
    } 
  ]
*/

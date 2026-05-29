import { Product, PointsProduct, Address, Order, PointsLog } from './types';

export const CATEGORIES = [
  { id: 'all', name: '全部佳酿' },
  { id: 'baijiu', name: '传世白酒' },
  { id: 'beer', name: '工坊精酿' },
  { id: 'spirits', name: '世界洋酒' }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: '贵州茅台酒 飞天酱香型 53度 经典收藏款',
    price: 1499,
    originalPrice: 2499,
    sales: 1240,
    image: 'bottle',
    category: 'baijiu',
    tags: ['抢购热销', '酱香至尊', '口碑好礼'],
    specs: ['【经典飞天】500ml 礼盒装', '【经典飞天】500ml 单瓶装'],
    description: '贵州茅台酒以本地优质糯高粱、小麦、水为原料，利用得天独厚的自然环境，采用科学独特的传统工艺精心酿制。未添加任何香气、香味物质，具有酱香突出、幽雅细腻、酒体醇厚、回味悠长、空杯留香持久的独特风格。',
    images: ['bottle']
  },
  {
    id: '2',
    title: '第八代五粮液 浓香型 52度 经典款',
    price: 1099,
    originalPrice: 1399,
    sales: 850,
    image: 'bottle',
    category: 'baijiu',
    tags: ['大牌臻选', '香气悠久', '多粮酿造'],
    specs: ['【经典水晶瓶】500ml 单瓶', '【特享典封版】500ml 单瓶'],
    description: '第八代五粮液是五粮液代代相传的经典杰作，是多粮浓香型白酒的臻品之作。其香气悠久、味道醇厚、入口甘美、入喉净爽、各味谐调、恰到好处，包装高雅奢华，为佳节送礼与商务宴请之首选。',
    images: ['bottle']
  },
  {
    id: '3',
    title: '比利时风意式 白熊精酿小麦鲜啤酒',
    price: 129,
    originalPrice: 159,
    sales: 1540,
    image: 'glass',
    category: 'beer',
    tags: ['天然原料', '柑橘果香', '冰镇直饮'],
    specs: ['【风味小麦】330ml*6瓶', '【狂欢畅饮版】330ml*24整箱'],
    description: '选用优质大麦芽、小麦芽、啤酒花、酵母及纯净水源，特别添加少量橙皮与芫荽籽，带来明亮清新的柑橘果香与温润草本气息。未经完全过滤，保留天然酵母，酒体云雾般柔和，口感细腻丝滑。',
    images: ['glass']
  },
  {
    id: '4',
    title: '工坊大师原浆精酿拉格鲜啤',
    price: 88,
    originalPrice: 118,
    sales: 2310,
    image: 'cup',
    category: 'beer',
    tags: ['24H锁鲜', '醇厚饱满', '大麦芽酿造'],
    specs: ['【1L大听装*2听】鲜啤', '【500ml*6听】罐装'],
    description: '坚持传统工坊拉格低温慢酿工艺，不加水稀释，不过滤酵母，原汁原味。酒体呈浑厚成熟的金黄色，泡沫如奶油般丰富持久，麦香浓郁扑鼻，口感醇厚甘甜。',
    images: ['cup']
  },
  {
    id: '5',
    title: '麦卡伦 12年 单一麦芽苏格兰威士忌',
    price: 599,
    originalPrice: 699,
    sales: 920,
    image: 'bottle',
    category: 'spirits',
    tags: ['正品臻选', '雪莉橡木桶', '圆润柔顺'],
    specs: ['【经典雪莉双桶】700ml', '【黄金三桶珍藏版】700ml'],
    description: '麦卡伦经典之作，纯粹高贵。在精选的西班牙雪莉橡木桶中陈酿至少12年，赋予其天然的深金色泽与浓郁的水果干、生姜、香草气息。口感圆润饱满，余韵带有温润的烟熏与轻微木质香。',
    images: ['bottle']
  },
  {
    id: '6',
    title: '轩尼诗 V.S.O.P 印记限量版干邑白兰地',
    price: 488,
    originalPrice: 588,
    sales: 420,
    image: 'bottle',
    category: 'spirits',
    tags: ['法国进口', '芳香醇厚', '派对轻奢'],
    specs: ['【经典陈酿口粮版】700ml', '【潮玩限量艺术版】700ml'],
    description: '轩尼诗V.S.O.P选用来自干邑显赫产区的优质生命之水精心调配而成。在成熟橡木桶中和谐陈酿，展现出令人倾心的香草、丁香和肉桂气息，天鹅绒般丝滑平衡。',
    images: ['bottle']
  },
  {
    id: '7',
    title: '马爹利 名士 VSOP 优雅干邑白兰地',
    price: 468,
    originalPrice: 528,
    sales: 310,
    image: 'bottle',
    category: 'spirits',
    tags: ['百年传承', '无花果香', '顺滑回甘'],
    specs: ['【大师甄选礼盒】700ml', '【经典摩登尊贵版】700ml'],
    description: '马爹利名士是为赞赏高雅品味而特别创作的干邑。精选边缘区极富特色的优质生命之水酿制，带有无花果、红苹果与淡淡的橡木微香。酒体顺滑流畅，具有无可比拟的平衡品质。',
    images: ['bottle']
  },
  {
    id: '8',
    title: '德国进口野格草本圣鹿利口酒',
    price: 128,
    originalPrice: 148,
    sales: 3420,
    image: 'bottle',
    category: 'spirits',
    tags: ['草本配方', '极度冰冻', '经典潮饮'],
    specs: ['【经典冰酿草本】700ml', '【派对嗨饮两瓶装】700ml*2'],
    description: '风靡全球的德国利口酒，由56种天然草本植物、花朵、根茎和果实经过繁复浸泡而得。建议在-18℃冰箱急冻后一饮而尽，体验甘草、藏红花与柑橘的爆破多重风味。',
    images: ['bottle']
  }
];

export const POINTS_PRODUCTS: PointsProduct[] = [
  {
    id: 'p1',
    title: '高端水晶锤纹葡萄酒醒酒器',
    points: 1500,
    cashPrice: 0,
    originalPrice: 49,
    image: 'glass',
    stock: 240,
    description: '精选进口无铅无色水晶玻璃，经匠人手工吹制而成。优雅的弧线瓶身设计，接触空气面积大，利于香气瞬间苏醒，为您的高端佳酿添彩。'
  },
  {
    id: 'p2',
    title: '意式无铅水晶郁金香威士忌杯 (2只)',
    points: 800,
    cashPrice: 5,
    originalPrice: 29,
    image: 'glass',
    stock: 150,
    description: '经典郁金香花苞造型，能完美收束凝聚威士忌及白兰地的幽雅芬芳。手感沉稳舒适，高透彻度水晶利于观察酒体挂杯与莹润成色。'
  },
  {
    id: 'p3',
    title: '复古黑胡桃木高端海马开瓶器',
    points: 600,
    cashPrice: 0,
    originalPrice: 19,
    image: 'bottle',
    stock: 580,
    description: '选用珍贵北美黑胡桃木贴片，搭配食品级精钢海马刀。两级力学支点结构，轻松开启各类软木塞，流线手感，质朴而尊贵。'
  },
  {
    id: 'p4',
    title: '食品级304不锈钢冰酒石套装 (附冰夹)',
    points: 1200,
    cashPrice: 2,
    originalPrice: 39,
    image: 'glass',
    stock: 90,
    description: '采用医用级304不锈钢，内注冷冻液，冰镇迅速持久，且绝对不会稀释美酒的原生风味。适用于威士忌、烈酒与冰镇精酿啤酒。'
  }
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'a1',
    name: '李知白',
    phone: '186****5203',
    province: '上海市',
    city: '上海市',
    district: '静安区',
    detail: '江宁路街道 愚园路218号 3楼12号工位',
    isDefault: true
  },
  {
    id: 'a2',
    name: '李知白',
    phone: '186****5203',
    province: '浙江省',
    city: '杭州市',
    district: '西湖区',
    detail: '灵隐街道 留和路288号 溪水别院6栋302',
    isDefault: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'o1',
    orderNumber: 'WX20260528104230',
    items: [
      {
        product: PRODUCTS[0], // Kweichow Moutai
        quantity: 1,
        selectedSpec: '【经典飞天】500ml 单瓶装',
        checked: true
      },
      {
        product: PRODUCTS[7], // Jagermeister
        quantity: 2,
        selectedSpec: '【经典冰酿草本】700ml',
        checked: true
      }
    ],
    totalPrice: 1755,
    status: 'completed',
    address: INITIAL_ADDRESSES[0],
    createTime: '2026-05-28 10:42',
    payTime: '2026-05-28 10:43',
    paymentMethod: '微信支付'
  },
  {
    id: 'o2',
    orderNumber: 'WX20260529011245',
    items: [
      {
        product: PRODUCTS[2], // Witbier 白熊精酿小麦
        quantity: 1,
        selectedSpec: '【风味小麦】330ml*6瓶',
        checked: true
      }
    ],
    totalPrice: 129,
    status: 'pending_pay',
    address: INITIAL_ADDRESSES[0],
    createTime: '2026-05-29 01:12'
  }
];

export const INITIAL_POINTS_HISTORY: PointsLog[] = [
  {
    id: 'pl1',
    productTitle: '高端水晶锤纹葡萄酒醒酒器',
    pointsSpent: 1500,
    date: '2026-05-27 15:30',
    status: 'completed',
    code: 'DH19284719'
  },
  {
    id: 'pl2',
    productTitle: '意式无铅水晶郁金香威士忌杯 (2只)',
    pointsSpent: 800,
    cashSpent: 5,
    date: '2026-05-29 00:05',
    status: 'pending',
    code: 'DH20918471'
  }
];

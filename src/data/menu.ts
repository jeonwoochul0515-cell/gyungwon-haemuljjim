export interface MenuItem {
  slug: string;
  name: string;
  category: "signature" | "side";
  description: string;
  prices?: { label: string; price: number; serves?: string }[];
  price?: number;
  badge?: string;
  imagePlaceholder?: string;
  image?: string;
}

export const signature: MenuItem[] = [
  {
    slug: "haemul-jjim",
    name: "해물찜",
    category: "signature",
    description:
      "갑오징어, 꽃게, 낙지, 전복, 새우, 한치, 조개까지 — 그날의 신선한 해산물을 콩나물 한 가득 위에 얹어 정성스럽게 찐 시그니처.",
    prices: [
      { label: "소", serves: "2~3인", price: 42000 },
      { label: "중", serves: "3~4인", price: 54000 },
      { label: "대", serves: "4~5인", price: 66000 },
    ],
    badge: "BEST",
    image: new URL("../assets/haemul-jjim.jpg", import.meta.url).href,
  },
  {
    slug: "agu-jjim",
    name: "아구찜",
    category: "signature",
    description:
      "쫄깃한 아구살과 통통한 콩나물의 환상의 조합. 매콤한 양념이 깊게 배어들어 한 번 맛보면 잊을 수 없는 맛.",
    prices: [
      { label: "소", serves: "2~3인", price: 38000 },
      { label: "중", serves: "3~4인", price: 48000 },
      { label: "대", serves: "4~5인", price: 58000 },
    ],
    image: new URL("../assets/agu-jjim.jpg", import.meta.url).href,
  },
  {
    slug: "soonsal-agu-jjim",
    name: "순살 아구찜",
    category: "signature",
    description:
      "가시 없이 부드럽게. 아이부터 어르신까지 누구나 편하게 즐길 수 있는 순살 아구찜.",
    prices: [
      { label: "소", serves: "2~3인", price: 40000 },
      { label: "중", serves: "3~4인", price: 52000 },
    ],
    image: new URL("../assets/soonsal-agu.jpg", import.meta.url).href,
  },
  {
    slug: "seokkeo-jjim",
    name: "섞어찜",
    category: "signature",
    description:
      "해물의 풍성함과 아구의 쫄깃함을 한 접시에. 두 가지 맛이 그리울 때 선택하는 베스트 메뉴.",
    prices: [
      { label: "소", serves: "2~3인", price: 40000 },
      { label: "중", serves: "3~4인", price: 52000 },
    ],
    image: new URL("../assets/mixed-jjim.jpg", import.meta.url).href,
  },
];

export const sides: MenuItem[] = [
  {
    slug: "bokkeumbap",
    name: "볶음밥",
    category: "side",
    description:
      "남은 양념에 밥과 김, 참기름을 더해 누룽지처럼 눌러 먹는 마무리. 경원해물찜의 진짜 마지막 한 입.",
    price: 3000,
    badge: "MUST",
    image: new URL("../assets/bokkeumbap-hero.jpg", import.meta.url).href,
  },
  {
    slug: "tuna-mayo",
    name: "셀프 참치마요 주먹밥",
    category: "side",
    description: "직접 만들어 먹는 재미. 매운 양념과 고소함의 균형을 잡아주는 완벽한 사이드.",
    price: 3000,
  },
  {
    slug: "rice",
    name: "공기밥",
    category: "side",
    description: "갓 지은 따뜻한 흰쌀밥.",
    price: 1000,
  },
  {
    slug: "cheese",
    name: "치즈 추가",
    category: "side",
    description: "고소함을 한 단계 더. 매콤한 양념과 만나면 새로운 풍미.",
    price: 2000,
  },
];

export const banchan: string[] = ["동치미", "완두콩", "새우찜", "메추리알", "번데기"];

export const spicyLevels = [
  { level: 1, name: "안 매워요", desc: "아이도 즐길 수 있는 순한 맛", color: "#FFE5A8" },
  { level: 2, name: "약간 매워요", desc: "은은한 매콤함", color: "#FFC371" },
  { level: 3, name: "보통", desc: "경원해물찜의 기본", color: "#FF9248" },
  { level: 4, name: "매워요", desc: "중독성 있는 매운맛", color: "#E84A28" },
  { level: 5, name: "아주 매워요", desc: "도전, 매운 맛 마니아용", color: "#A8121C" },
];

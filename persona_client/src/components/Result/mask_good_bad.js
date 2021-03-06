export const show_good_bad = (type, goodBad) => {
  if (type === 0) {
    return "정보를 불러오고 있습니다...";
  } else {
    return maskGoodBad[type - 1][goodBad].info.map((list) => (
      <li key={list}>{list}</li>
    ));
  }
};

const mask1 = [
  {
    type: "good",
    info: [
      "자신이 생각하는 것을 정직하게 말하며 말한 것을 실제 행동으로 옮긴다",
      "좋은 사람이 되는 것에 관심이 많아 자기 문제 뿐만이 아니라 자기 주변에서 일어나는 문제를 해결하고자 한다",
      "공정함을 중요하게 생각해 일을 할 때 모든 사람이 정당하게 대우받아야 한다고 굳게 믿는 편이다",
    ],
  },
  {
    type: "bad",
    info: [
      "대체적으로 진지한 경우가 많아 하찮고 가벼운 일은 할 시간이 거의 없다고 느껴, 휴가를 갈 때조차 해변에는 짧게 시간을 보내고 박물관에서는 시간을 오래 보내는 등 한가롭게 시간을 보내는 것에 대하여 죄책감을 느낀다",
      "스스로의 작은 결점에 대해서도 곰곰히 생각하면서 본인을 끊임없이 비판하는 것에 익숙하여 타인에 대해서도 판단적이고 비판적인 경우가 많다",
      "상대방이 본인만큼 스스로의 이상에 맞춰 살아가려고 노력하지 않는 모습이 무책임하다고 여겨 상대방에게 화를 낼 수 있다",
    ],
  },
];

const mask2 = [
  {
    type: "good",
    info: [
      "다른 사람들을 위해서 해야 할 일이 있을 때 온 마음을 다 기울여 필요한 일을 할 줄 안다",
      "남에게 먼저 다가가는 것을 잘하며, 때로는 무엇을 함께 하자고 먼저 제시하는 편이다",
      "대체적으로 상냥하고 너그러우며 자기를 희생할 줄 안다",
    ],
  },
  {
    type: "bad",
    info: [
      "상대방과 친밀한 관계를 맺기를 원하면 원할수록 상대방의 사적인 영역을 존중하는 것을 어려워하며 지나치게 간섭하려고 할 수 있다",
      "자신이 원하는 것을 다른 사람이 알아차려서 여러 가지 방식으로 자신에게 되돌려 주기를 바라며 이를 간접적으로 요구한다",
      "상대방에게 과잉투자를 할 경우 상대방이 더 많은 좋은 자질들을 개발하도록 격려하기보다는 상대방을 자신의 감정적인 필요를 충족시켜주는 사람의 틀에 끼워맞추려 한다",
    ],
  },
];

const mask3 = [
  {
    type: "good",
    info: [
      "자신의 재능을 개발하려고 노력할 뿐만 아니라 다른 사람들도 최선을 다할 수 있도록 격려하고 동기를 부여한다",
      "영업에 능하여 남에게 영향을 주고 설득하는 일을 잘한다",
      "커뮤니케이션과 홍보에 능해서 어떻게 하면 자신이 속한 단체를 매력적이고 호소력 있게 소개할지를 잘 알고 있다",
    ],
  },
  {
    type: "bad",
    info: [
      "자신은 뒤쳐지고 다른 사람이 더 많은 관심을 얻게 될까봐 두려워한다",
      "사람들에게 본인의 본모습을 보여 주기를 꺼려해 사람간의 관계에 있어서 진정한 관계보다는 남들이 보기에 서로간에 행복하게 지내는 이미지만을 원하기도 한다",
      "타인의 찬사와 관심을 받는 것을 중요하게 여겨 본인과 별 상관도 없는 사람들에게 좋은 인상을 주려는 것에 강박적일 수 있다",
    ],
  },
];

const mask4 = [
  {
    type: "good",
    info: [
      "자신의 개인사와 감정의 세계, 가족, 과거 추억, 사랑에 대한 탐구에 바탕한 개성적인 창조성을 지니고 있어 소설가, 극작가, 시인의 자질이 있다",
      "다른 사람의 내면 안에 있는 깊고 섬세한 감정과 교류할 수 있는 능력이 있다",
      "신중하게 생각하려는 경향이 있어 다른 사람의 말이나 스스로가 느끼는 감정 속에 숨겨진 의미를 찾아낼 줄 안다",
    ],
  },
  {
    type: "bad",
    info: [
      "스스로에게는 발견되지 않은 아주 특별한 재능이 있다고 믿어 정상적인 삶의 기대와 규칙이 본인에게 맞지 않는다고 생각해 규칙과 규율을 무시하고 다른 사람들이 강제로 시키는 일에 저항감을 느끼는 편이다",
      "다른 사람은 안정적이고 정상적인 반면 본인은 결함이 많고 완성되지 못했다고 생각하며 스스로를 비하하려는 경향이 있다",
      "자신의 감정에 주의를 기울이기 때문에 다른 사람에게서 감정적 필요를 충족시켜달라고 하지만 정작 다른 사람의 감정이나 문제에 대해서 관심이 없다",
    ],
  },
];

const mask5 = [
  {
    type: "good",
    info: [
      "항상 뭔가를 추구하고 질문을 던지고 깊게 탐구한다",
      "집중력이 타고나 어떤 일을 오랜 시간을 들여 탐구하는 것을 어려워하지 않는다",
      "자신이 새롭게 발견한 것을 다른 사람들과 나누기를 좋아하여 상대방으로 하여금 스스로의 삶에 대해 깊이 생각하도록 자극하는 편이다",
    ],
  },
  {
    type: "bad",
    info: [
      "한 가지에 너무 몰두하느라 인간관계, 건강, 실직 등 실질적인 문제를 회피하게 된다",
      "친구나 연인에게 이야기를 많이 나누지만 자신의 삶에 대한 이야기는 감추는 경향이 있다",
      "스스로의 아이디어가 본인의 안정감의 원천이기에 누군가가 그것을 반대하거나 믿지 않을 경우 스스로의 아이디어를 열정적으로 방어하고 상대방에게 적대적이게 변한다",
    ],
  },
];

const mask6 = [
  {
    type: "good",
    info: [
      "엄청난 끈기를 갖고 있으며 꾸준한 노력을 통해 자신의 목표를 성취하는 노력파이다",
      "문제 신호에 대해서 민감하기 때문에 모든 일을 사전에 예방하고 미리미리 처리하는 경향이 있다",
      "공동의 이익을 위해 자신을 내세우지 않고 일할 줄 알아 주변 사람들에게 헌신, 협동, 봉사의 기쁨을 가르쳐준다",
    ],
  },
  {
    type: "bad",
    info: [
      "걱정이 많아 끊임없이 자신의 환경 안에 어떤 문제가 있는지 찾으려 해 평상시에 긴장푸는 것을 어려워한다",
      "작은 문제를 과잉해서 해석해 작은 오해나 의견의 불일치가 있을 때마다 자신이 상대방에게서 버림받았다고 느낀다",
      "자신에게 좌절을 준 사람이 아닌, 다른 사람에게 불평을 토함으로써 자신의 불안을 보상받으려 한다",
    ],
  },
];

const mask7 = [
  {
    type: "good",
    info: [
      "다른 사람들에게 의존하지 않고 스스로 원하는 방식대로 원하는 것을 얻는 방법을 찾는다",
      "빠르고 쉽게 아이디어를 수집하는 능력이 있어 프로젝트의 첫 단계에서 창조적인 아이디어로 신선한 접근방식을 제시한다",
      "새로운 경험에 열려 있기 때문에 다양한 분야에 대한 해박한 지식을 갖고 있다",
    ],
  },
  {
    type: "bad",
    info: [
      "불안감을 느낄 경우 그 감정을 직접 대면하기보다는 폭음과 폭식과 같은 신체적인 그리고 감정적인 자극으로 그 불안에서 벗어나려고 한다",
      "모든 것을 스스로 경험하고 싶어하기 때문에 다른 사람의 충고는 잘 받아들이지 않는 편이다",
      "참을성이 부족한 경우가 많아 때때로 제멋대로 행동하여 고집스럽게 요구하는 방식을 통해 자신이 원하는 것을 얻어내기도 한다",
    ],
  },
];

const mask8 = [
  {
    type: "good",
    info: [
      "말썽을 일으키는 어린이에게서 지도자가 될 가능성을 발견하는 것처럼 사람들에게서나 상황에서 남들이 못 보고 지나칠만한 가능성을 볼 줄 안다",
      "사람들의 장점을 이끌어 내기 위해서 자극과 도전을 제공한다",
      "약하고 힘 없는 사람들을 보호하고 불의에 맞서서 싸울 용기를 갖고 있다",
    ],
  },
  {
    type: "bad",
    info: [
      "스트레스 상황에 놓이면 거칠고 공격적인 태도를 보인다",
      "누군가로부터 명령이나 지시를 받는 것을 힘들어하며 도리어 본인이 주변을 통제하고자 하는 욕구가 강하다",
      "인간관계를 자기 멋대로 하는 경향이 있어 화를 내거나 말로 공격을 하여 다른 사람들의 자신감을 손상시킬 수 있다",
    ],
  },
];

const mask9 = [
  {
    type: "good",
    info: [
      "상대방을 있는 그대로 인정해 주고 그들이 자신의 방식대로 일하는 것을 허용한다 (=함부로 판단하려 들지 않는다)",
      "위기 상황에 나머지 사람들이 불안 때문에 과도한 반응을 하더라도 본인은 조용하고 차분하게 그 순간에 해야 할 일을 해 나간다",
      "상황을 긍정적으로 해석하려 하고, 남의 말을 주의 깊게 들을 줄 안다",
    ],
  },
  {
    type: "bad",
    info: [
      "현실에 깊이 영향을 받고 싶어 하지 않아 스스로가 나서서 활동적으로 살고 싶어하지 않는 편이다",
      "외부 사람이 보기에는 많은 일을 하고 있는 것처럼 보이지만, 실제 중요한 문제를 처리하는 일을 미루는 경향이 있다",
      "대개 다른 사람의 말을 잘 따라 주지만 어느 선을 넘어서면 절대로 자신의 의지를 굽히지 않고 다른 사람의 영향이나 조언을 차단하고 고집스러운 태도를 유지한다",
    ],
  },
];

export const maskGoodBad = [
  mask1,
  mask2,
  mask3,
  mask4,
  mask5,
  mask6,
  mask7,
  mask8,
  mask9,
];

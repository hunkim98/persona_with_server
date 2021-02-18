import React from "react";
import { useEffect, useState } from "react";
import "./check_persona.css";
import "./persona_data";
import CheckPersonaChild from "./check_persona_child";

function CheckPersona({
  name,
  setPersonality,
  questionNumber,
  setQuestionNumber,
  changeColor,
}) {
  const hornevian = [
    {
      question:
        name +
        "님은 학급 반장이다. 학급 반장끼리 모여 학생회에서 학교에 대한 논의를 진행하고 있다. 학생회에서 " +
        name +
        "님의 모습은?",
      options: [
        {
          selection: "얘기되는 안건들에 대해서 자기 의견을 소신껏 밝힌다",
          id: "A",
        },
        {
          selection: "본인 반의 입장을 대변하는 역할을 충실히 수행한다",
          id: "C",
        },
        { selection: "별말없이 남들 얘기를 주의깊게 듣는다", id: "W" },
      ],
    },
    {
      question:
        "대학교 교양 수업에서 그룹 발표 과제가 주어진다. 근데 팀 내 토의가 " +
        name +
        "님의 마음에 들지 않는 방향으로 흘러간다. 이때 " +
        name +
        "님이 속으로 가장 할 것 같은 생각은?",
      options: [
        {
          selection: "안되겠다. 내가 나서서 반대 의견을 제시해야겠다",
          id: "A",
        },
        {
          selection:
            "내 역할은 그룹을 위해서 반대하는 걸까 아니면 따르는 걸까?",
          id: "C",
        },
        { selection: "다들 동의하는 것으로 보아 일단은 따르자", id: "W" },
      ],
    },
    {
      question:
        "동창회 파티가 열린다. " +
        name +
        "님은 정말 오랜만에 옛 친구들을 보게 된다. " +
        name +
        "님이 동창회 파티에서 보이는 모습은?",
      options: [
        {
          selection:
            "마음 가는대로 파티를 자유롭게 돌아다니며 사람들과 자유롭게 대화를 나눈다",
          id: "A",
        },
        {
          selection:
            "돌아다니다가도 마음 맞는 주변 사람들과 한자리에서 오랫동안 얘기를 나눈다",
          id: "C",
        },
        {
          selection:
            "사람들이 많이 모여있는 자리를 벗어나 주로 구석에서 파티의 상황을 지켜본다",
          id: "W",
        },
      ],
    },
    {
      question:
        name +
        "님은 조폭 단체에 속해 있다. 조폭 단체 내에서 " +
        name +
        "님이 맡기에 가장 적합한 업무는?",
      options: [
        { selection: "두목 or 행동대장", id: "A" },
        { selection: "보스에게 충성하는 오른팔", id: "C" },
        { selection: "정보원 or 감시자", id: "W" },
      ],
    },
    {
      question:
        name +
        "님은 기업 운영방식에 반대하는 노동자 시위를 참여하게 된다. " +
        name +
        "님이 시위를 참여하는 이유는? ",
      options: [
        { selection: "기업에 자기의 목소리를 전달하려고", id: "A" },
        {
          selection: "참여를 꼭 해야겠다는 생각이 들어서",
          id: "C",
        },
        { selection: "주변에서 욕 먹기 싫어서", id: "W" },
      ],
    },
    {
      question:
        "학교에서 수학여행을 간다. 수학여행에서 일어날 수 있는 여러 일 중 " +
        name +
        "님이 상상도 하기 싫어할만한 상황은?",
      options: [
        { selection: "레크레이션 활동 중 자신의 의견이 무시되는 것", id: "A" },
        {
          selection: "숙소 뒷정리 시간에 자기만 청소하고 남들은 정리 안하는 것",
          id: "C",
        },
        { selection: "본인에게 갑자기 장기자랑을 시키는 것", id: "W" },
      ],
    },
    {
      question:
        name +
        "님이 어떤 창업회사에 들어간다. " +
        name +
        "님이 가장 선호할 것 같은 창업회사의 분위기는?",
      options: [
        {
          selection:
            "본인에게 사업에 어느정도 참여하고 영향력을 행사할 수 있게 해주는 회사",
          id: "A",
        },
        {
          selection:
            "본인을 회사의 일원으로 받아들이고 각자의 역할 구분이 확실한 회사",
          id: "C",
        },
        {
          selection:
            "본인에게 어느정도 자유로움을 제공하며 할당된 일을 믿고 맡기는 회사",
          id: "W",
        },
      ],
    },
    {
      question:
        name +
        "님에게 애인이 있다. " +
        name +
        "이 애인과 가장 자주 다툴 법한 시나리오는?",
      options: [
        { selection: "애인이 본인을 너무 통제한다고 생각한다", id: "A" },
        { selection: "애인이 자기의 기대만큼 안해준다고 생각하다", id: "C" },
        { selection: "애인이 본인에게 과도하게 간섭한다고 생각한다", id: "W" },
      ],
    },
    {
      question: name + "님이 가장 못 견뎌낼 것 같은 상황은? ",
      options: [
        { selection: "억울한 상황을 참고 넘기는 것", id: "A" },
        {
          selection: "본인에게 맡겨진 일을 대충하는 것",
          id: "C",
        },
        { selection: "다수를 상대로 논쟁을 벌이는 것", id: "W" },
      ],
    },
  ];

  const harmonic = [
    {
      question:
        "학교 기말고사 시험이 기존의 시험보다 어렵게 출제된다. " +
        name +
        "님 또한 시험의 난이도 때문에 시험을 잘 못 쳤는데 이에 대한 " +
        name +
        "님의 반응은?",
      options: [
        {
          selection:
            "애초에 높은 성적을 받기 힘든 수업이라 생각하며 스스로 위로하고 시험 출제자를 탓한다",
          id: "P",
        },
        {
          selection:
            "본인이 공부할 때 무엇을 빼먹었는지 생각해보고 왜 시험을 못 쳤는지 이해하려고 한다",
          id: "C",
        },
        {
          selection:
            "남들도 본인과 똑같이 시험이 어려웠는지 느꼈는지 묻으며 이에 대한 불만을 같이 토로한다",
          id: "B",
        },
      ],
    },
    {
      question:
        name +
        "님이 속한 동아리에서 문제가 발생한다. 이 문제에 대해서 동아리원들과 얘기하는 자리에서 " +
        name +
        "님이 가장 꺼려할 것 같은 동아리원은?",
      options: [
        {
          selection:
            "문제상황의 심각성을 강조하며 해당 문제를 오랫동안 붙잡는 사람",
          id: "P",
        },
        {
          selection:
            "문제상황을 해결하기 위해 감정을 뒤로 두고 이성적 판단을 못하는 사람",
          id: "C",
        },
        {
          selection:
            "문제상황에 대해서 서로가 느낀 감정을 무시하고 문제를 처리하려고만 하는 사람",
          id: "B",
        },
      ],
    },
    {
      question:
        name +
        "님의 연인이 평소와 다르게 " +
        name +
        "님과의 통화에서 조금 성의없이 통화한다. 이에 대한 " +
        name +
        "님의 반응은?",
      options: [
        {
          selection:
            "가능한 긍정적으로 상황을 해석하려 하고 분위기를 빨리 바꾸려고 한다",
          id: "P",
        },
        {
          selection:
            "상대방의 반응에 대해서 곰곰히 생각하고 파고들며 원인을 찾는다",
          id: "C",
        },
        {
          selection:
            "상대방에게 실망스러운 감정을 충분히 발산하고 표현을 통해 확실히 전달한다",
          id: "B",
        },
      ],
    },
    {
      question:
        name +
        "님이 회사 업무 중 실수를 저질러 회사 업무 처리에 차질을 일으킨다. 이로 인해 " +
        name +
        "님은 남들 앞에서 상사에게서 꾸중을 듣는다. 이 사건이 있고 나서" +
        name +
        "님이 속으로 가장 할 것 같은 생각은?",
      options: [
        {
          selection:
            '"이게 더 큰 문제로 번지지 않아서 다행이야. 여기에서 그친 게 어디야."',
          id: "P",
        },
        {
          selection:
            '"내가 어떻게 해서 실수하게 되었지? 다음 번에는 어떻게 또 실수 안하지?"',
          id: "C",
        },
        {
          selection: '"난 왜 이런 사람일까? 나 정말 한심하다. 화난다 정말.."',
          id: "B",
        },
      ],
    },
    {
      question:
        name +
        "님이 속한 집단이 어떤 난관에 부딪힌다. 이때 " +
        name +
        "님은 집단 내에서 자기 나름대로 이 난관에 대응하려고 한다. " +
        name +
        "님의 대응방식은?",
      options: [
        {
          selection:
            "집단 내에서 희망적 태도를 유지하며 사람들이 문제상황을 긍정적으로 생각하게끔 유도한다",
          id: "P",
        },
        {
          selection:
            "문제의 해결책을 찾으려 하고 다음 행동을 이성적으로 계획한다",
          id: "C",
        },
        {
          selection:
            "집단 내 사람들이 느낄 부정적 감정을 공유하고 이를 함께 표현해준다",
          id: "B",
        },
      ],
    },
  ];

  const types_adjectives = [
    { adjective: "규칙을 준수하는", id: "CZ" },
    { adjective: "봉사하는", id: "CX" },
    { adjective: "성공을 좇는", id: "AZ" },
    { adjective: "알기 어려운", id: "BY" },
    { adjective: "일에 집중을 잘하는", id: "BZ" },
    { adjective: "타인에게 맞추려는", id: "CY" },
    { adjective: "충동적인", id: "AX" },
    { adjective: "거칠게 몰아붙이는", id: "AY" },
    { adjective: "겸손한", id: "BX" },
  ];

  useEffect(() => {
    for (let i = hornevian.length - 1; i > 0; i--) {
      //shuffled the hornevian questions
      const j = Math.floor(Math.random() * (i + 1));
      const temp = hornevian[i];
      hornevian[i] = hornevian[j];
      hornevian[j] = temp;
    }
    changeColor("#c0baff");
    console.log(hornevian);
  }, []);

  const [newHornevian, mixHornevian] = useState(hornevian);

  return (
    <>
      <CheckPersonaChild
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        setPersonality={setPersonality}
        hornevian={newHornevian}
        harmonic={harmonic}
        types_adjectives={types_adjectives}
        name={name}
      />
    </>
  );
}

export default CheckPersona;

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
        "님은 고등학교 학급 반장이다. 학급 반장끼리 모여 학생회에서 학교에 대한 논의를 진행하고 있다. 학생회에서 " +
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
        "님이 마음에 들지 않는 방향으로 흘러간다. 이때 " +
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
        "님이 맡기에 가장 적합 업무는?",
      options: [
        { selection: "두목 or 행동대장", id: "A" },
        { selection: "보스에게 충성하는 오른팔", id: "C" },
        { selection: "정보원 or 감시자", id: "W" },
      ],
    },
    {
      question: name + "님이 가장 선호할 것 같은 배우자는?",
      options: [
        { selection: "자기 말을 잘 듣는 배우자", id: "A" },
        {
          selection: "자신의 사랑을 고마워하는 배우자",
          id: "C",
        },
        { selection: "본인에게 먼저 다가와주는 배우자", id: "W" },
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
        "님이 어떤 창업회사의 직원이 된다. " +
        name +
        "님이 가장 선호할 것 같은 창업회사는?",
      options: [
        {
          selection:
            "본인에게 사업에 어느정도 참여하고 영향력을 행사할 수 있게 해주는 회사",
          id: "A",
        },
        {
          selection:
            "본인을 회사의 일원으로 받아들이고 일한 만큼 대우하는 회사",
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
      question: name + "님이 관심 있는 이성과 데이트할 때 보이는 모습은?",
      options: [
        { selection: "상대방에게 자신의 매력을 마음껏 보인다", id: "A" },
        { selection: "상대방을 위하는 모습을 보인다", id: "C" },
        { selection: "상대방에게 다가가는 것을 매우 수줍어한다", id: "W" },
      ],
    },
    {
      question:
        "친구들과 여행을 갔을 때 여행지에서 " + name + "님이 보이는 모습은?",
      options: [
        { selection: "갈 곳 선정하고 리드하기", id: "A" },
        { selection: "남들 의견 취합 및 돌보기", id: "C" },
        { selection: "혼자의 시간을 갖기", id: "W" },
      ],
    },
    {
      question:
        name +
        "님이 회사에서 나쁜 상사를 만났다. " +
        name +
        "님이 가장 싫어할만한 상사의 타입은?",
      options: [
        { selection: "자신의 능력을 깔보는 상사", id: "A" },
        {
          selection: "업무 책임을 지지 않는 상사",
          id: "C",
        },
        { selection: "매사 간섭하는 상사", id: "W" },
      ],
    },
  ];

  const harmonic = [
    {
      question:
        "수업에서 예상치 못한 난이도의 시험으로 인해 본인이 기대했던 성적보다 낮은 성적을 받았을 때 " +
        name +
        "님의 반응은?",
      options: [
        {
          selection: "애초에 높은 성적을 받기 힘든 수업이라 생각하며 자위한다",
          id: "P",
        },
        {
          selection:
            "본인이 왜 낮은 성적을 받았는지 알아보고 이를 이해하려고 한다",
          id: "C",
        },
        {
          selection:
            "낮은 성적을 받은 것에 대해서 슬픔이나 분노를 표출하여 감정적으로 반응한다",
          id: "B",
        },
      ],
    },
    {
      question:
        "좋아하는 상대방과의 소개팅에서 차였을 때 " +
        name +
        "님이 속으로 가장 할 것 같은 생각은?",
      options: [
        {
          selection: "상황이 너무 안 따라줬네",
          id: "P",
        },
        {
          selection: "다음번에 어떻게 하면 잘 될 수 있을까?",
          id: "C",
        },
        {
          selection: "지가 얼마나 잘났다고?!",
          id: "B",
        },
      ],
    },
    {
      question:
        "대회에서 본인의 작품이 상을 못 받았을 때 " + name + "님의 반응은?",
      options: [
        {
          selection: "대회가 자신의 작품을 알아주지 못한다고 생각한다",
          id: "P",
        },
        {
          selection: "본인이 어떠한 이유로 상을 못 받게 되었는지 생각해본다",
          id: "C",
        },
        {
          selection: "침울해하거나 화를 표출한다",
          id: "B",
        },
      ],
    },
    {
      question:
        "내가 해결되지 않은 일에 대해서 " +
        name +
        "님에게 조언을 물었을때 " +
        name +
        "님이 가장 할 것 같은 조언은?",
      options: [
        {
          selection: '"너무 걱정하지 마. 잘 될거야~"',
          id: "P",
        },
        {
          selection: '"이렇게 하면 해결되지 않을까?"',
          id: "C",
        },
        {
          selection: '"많이 힘들었겠네"',
          id: "B",
        },
      ],
    },
    {
      question:
        "친구들이랑 함께 여행 가는 버스가 갑자기 알 수 없는 이유로 고장났을 때" +
        name +
        "님이 첫번째로 가장 할 것 같은 말은?",
      options: [
        {
          selection: '"심각한 일 아닐거야~"',
          id: "P",
        },
        {
          selection: '"버스가 어디 고장났지?"',
          id: "C",
        },
        {
          selection: '"어떡해!? or 아 뭔데!"',
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

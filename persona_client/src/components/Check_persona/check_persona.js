import React from 'react';
import { useEffect, useState } from 'react';
import './check_persona.css';
import './persona_data';
import CheckPersonaChild from './check_persona_child';

let onlyOnce = true;

function CheckPersona({
  name,
  setPersonality,
  questionNumber,
  setQuestionNumber,
  changeColor,
}) {
  const hornevian = [
    {
      question: '파티를 참석하는 ' + name + '님의 모습은?',
      options: [
        { selection: '파티에서 낯선 사람들과 친구가 되어 논다', id: 'A' },
        { selection: '파티에 함께 참석한 지인들을 챙기면서 논다', id: 'C' },
        { selection: '파티를 딱히 즐겨하지 않는다', id: 'W' },
      ],
    },
    {
      question:
        '처음 만나는 사람들과 팀 프로젝트를 하는 ' + name + '님의 모습은?',
      options: [
        { selection: '자기의 의견을 자유롭게 주장한다', id: 'A' },
        { selection: '프로젝트 내에서 각자의 역할을 정하자고 한다', id: 'C' },
        { selection: '별 얘기 없이 남들의 말에 귀를 기울인다', id: 'W' },
      ],
    },
    {
      question:
        name +
        '님의 지인이 ' +
        '시비를 걸 경우에 ' +
        name +
        '님이 보이는 반응은?',
      options: [
        { selection: '맞서 싸운다', id: 'A' },
        { selection: '상대방의 얘기를 일단 듣는다', id: 'C' },
        { selection: '싸움을 최대한 피한다', id: 'W' },
      ],
    },
    {
      question:
        name + '님이 집에서 혼자 영화를 보게 된다면 가장 볼 것 같은 영화는?',
      options: [
        { selection: '자극적 영화(액션, 스릴러)', id: 'A' },
        { selection: '서사적 영화(성장영화, 로맨스영화)', id: 'C' },
        { selection: '상상적 영화(S.F., 애니메이션)', id: 'W' },
      ],
    },
    {
      question:
        name + '님이 패스트푸드점에서 알바를 하게 된다면 가장 어울리는 자리는?',
      options: [
        { selection: '계산대 판매원', id: 'A' },
        { selection: '배달원', id: 'C' },
        { selection: '청소지기', id: 'W' },
      ],
    },
    {
      question:
        name +
        '님이 새로운 프로젝트를 선택하는 상황에 놓이면 가장 지원할 것 같은 프로젝트는?',
      options: [
        { selection: '모험적이고 도전적인 프로젝트', id: 'A' },
        { selection: '본인에게 익숙한 프로젝트', id: 'C' },
        { selection: '본인에게 영감을 주는 프로젝트', id: 'W' },
      ],
    },
    {
      question:
        '팀원들과 프레젠테이션을 준비할 때 ' +
        name +
        '님에게 가장 적합한 역할은?',
      options: [
        { selection: '주 발표자', id: 'A' },
        { selection: '보조 발표자', id: 'C' },
        { selection: '자료 조사자', id: 'W' },
      ],
    },
    {
      question: name + '님이 관심 있는 이성과 데이트할 때 보이는 모습은?',
      options: [
        { selection: '상대방에게 자신의 매력을 마음껏 보인다', id: 'A' },
        { selection: '상대방을 위하는 모습을 보인다', id: 'C' },
        { selection: '상대방에게 다가가는 것을 매우 수줍어한다', id: 'W' },
      ],
    },
    {
      question:
        '친구들과 여행을 갔을 때 여행지에서 ' + name + '님이 보이는 모습은?',
      options: [
        { selection: '갈 곳 선정하고 리드하기', id: 'A' },
        { selection: '남들 의견 취합 및 돌보기', id: 'C' },
        { selection: '혼자의 시간을 갖기', id: 'W' },
      ],
    },
    {
      question: name + '님이 집중해서 공부하기 좋아할만한 곳은?',
      options: [
        { selection: '타인들이 공부하는 모습이 보이는 탁상형 장소', id: 'A' },
        {
          selection:
            '다른 사람들이 같이 공부하지만 서로 보이지 않는 칸막이형 장소',
          id: 'C',
        },
        { selection: '사람이 거의 없는 혼자만의 장소', id: 'W' },
      ],
    },
  ];

  const harmonic = [
    {
      question:
        '수업에서 예상치 못한 난이도의 시험으로 인해 본인이 기대했던 성적보다 낮은 성적을 받았을 때 ' +
        name +
        '님의 반응은?',
      options: [
        {
          selection: '애초에 높은 성적을 받기 힘든 수업이라 생각하며 자위한다',
          id: 'P',
        },
        {
          selection:
            '본인이 왜 낮은 성적을 받았는지 알아보고 이를 이해하려고 한다',
          id: 'C',
        },
        {
          selection:
            '낮은 성적을 받은 것에 대해서 슬픔이나 분노를 표출하여 감정적으로 반응한다',
          id: 'B',
        },
      ],
    },
    {
      question:
        '좋아하는 상대방과의 소개팅에서 차였을 때 ' +
        name +
        '님이 속으로 가장 할 것 같은 생각은?',
      options: [
        {
          selection: '상황이 너무 안 따라줬네',
          id: 'P',
        },
        {
          selection: '다음번에 어떻게 하면 잘 될 수 있을까?',
          id: 'C',
        },
        {
          selection: '지가 얼마나 잘났다고?!',
          id: 'B',
        },
      ],
    },
    {
      question:
        '대회에서 본인의 작품이 상을 못 받았을 때 ' + name + '님의 반응은?',
      options: [
        {
          selection: '대회가 자신의 작품을 알아주지 못한다고 생각한다',
          id: 'P',
        },
        {
          selection: '본인이 어떠한 이유로 상을 못 받게 되었는지 생각해본다',
          id: 'C',
        },
        {
          selection: '침울해하거나 화를 표출한다',
          id: 'B',
        },
      ],
    },
    {
      question:
        '내가 해결되지 않은 일에 대해서 ' +
        name +
        '님에게 조언을 물었을때 ' +
        name +
        '님이 가장 할 것 같은 조언은?',
      options: [
        {
          selection: '"너무 걱정하지 마. 잘 될거야~"',
          id: 'P',
        },
        {
          selection: '"이렇게 하면 해결되지 않을까?"',
          id: 'C',
        },
        {
          selection: '"많이 힘들었겠네"',
          id: 'B',
        },
      ],
    },
    {
      question:
        '친구들이랑 함께 여행 가는 버스가 갑자기 알 수 없는 이유로 고장났을 때' +
        name +
        '님이 첫번째로 가장 할 것 같은 말은?',
      options: [
        {
          selection: '"심각한 일 아닐거야~"',
          id: 'P',
        },
        {
          selection: '"버스가 어디 고장났지?"',
          id: 'C',
        },
        {
          selection: '"어떡해!? or 아 뭔데!"',
          id: 'B',
        },
      ],
    },
  ];

  const types_adjectives = [
    { adjective: '규칙을 준수하는', id: 'CZ' },
    { adjective: '봉사하는', id: 'CX' },
    { adjective: '성공을 좇는', id: 'AZ' },
    { adjective: '알기 어려운', id: 'BY' },
    { adjective: '일에 집중을 잘하는', id: 'BZ' },
    { adjective: '타인에게 맞추려는', id: 'CY' },
    { adjective: '충동적인', id: 'AX' },
    { adjective: '거칠게 몰아붙이는', id: 'AY' },
    { adjective: '겸손한', id: 'BX' },
  ];

  const hornevian_mixed = [];

  useEffect(() => {
    for (let i = hornevian.length - 1; i > 0; i--) {
      //shuffled the hornevian questions
      const j = Math.floor(Math.random() * (i + 1));
      const temp = hornevian[i];
      hornevian[i] = hornevian[j];
      hornevian[j] = temp;
    }
    changeColor('#c0baff');
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

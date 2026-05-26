export type EventType = 'CRITICAL' | 'TACTICAL' | 'INTEL' | 'AFTERMATH';

export interface TimelineEvent {
  id: number;
  time: string;
  type: EventType;
  position: 'left' | 'right';
  titleCn: string;
  titleEn: string;
  content: string;
  redactedItems?: { label: string; reveal: string }[];
  quoteBlock?: { text: string; author: string };
  fileRef: string;
  specialVisual?: 'dimmed' | 'dramatic' | 'climax';
}

export const eventTypeColors: Record<EventType, string> = {
  CRITICAL: '#dc2626',
  TACTICAL: '#f59e0b',
  INTEL: '#38bdf8',
  AFTERMATH: '#94a3b8',
};

export const eventTypeLabels: Record<EventType, string> = {
  CRITICAL: 'CRITICAL',
  TACTICAL: 'TACTICAL',
  INTEL: 'INTEL',
  AFTERMATH: 'AFTERMATH',
};

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    time: '23:47 HKT',
    type: 'CRITICAL',
    position: 'left',
    titleCn: '衝鋒車失蹤',
    titleEn: 'The Vanishing',
    content:
      '2015年12月某午夜，香港警方接獲匿名電話。\n\n一輛正在執勤的衝鋒車突然失聯。車上載有五名警員，以及價值連城的高科技戰術裝備。\n\n被劫持的五名警員之中，包括現任行動副處長李文彬的獨子——李家俊。\n\n綁匪對警隊的通訊系統、裝備配置瞭如指掌。這不是普通的劫持——這是對警隊的宣戰。',
    redactedItems: [
      { label: '衝鋒車最後GPS坐標', reveal: '新界某郊區公路段' },
      { label: '匿名來電語音分析', reveal: '聲紋匹配失敗，使用變聲器' },
    ],
    fileRef: 'CW-EVT-001',
  },
  {
    id: 2,
    time: '00:15 HKT',
    type: 'TACTICAL',
    position: 'right',
    titleCn: '寒戰啟動',
    titleEn: 'Operation Declared',
    content:
      '警務處處長因公外訪未返。\n\n行動副處長李文彬立即自封署理處長，啟動代號「寒戰」行動，宣布香港進入一級戒備狀態。\n\n李文彬召開高層緊急會議，鷹派作風展露無遺——「非常時期，用非常方法。」\n\n他調動了飛虎隊、反恐特勤隊、以及所有可用的前線單位，展開大規模搜索。',
    quoteBlock: {
      text: '非常時期，用非常方法。',
      author: '李文彬，署理處長',
    },
    fileRef: 'CW-EVT-002',
  },
  {
    id: 3,
    time: '00:38 HKT',
    type: 'TACTICAL',
    position: 'left',
    titleCn: '辦公室舌辯',
    titleEn: 'The Challenge',
    content:
      '管理副處長劉傑輝公開挑戰李文彬的指揮權。\n\n劉傑輝認為李文彬因兒子被劫持而無法客觀指揮，堅持應由自己接管行動。\n\n兩位副處長在會議室內展開激烈辯論——這是一場文官系統與武官系統的正面交鋒。\n\n劉傑輝引用邱吉爾：「所有戰爭都是非必要戰爭。」\n\n李文彬反駁：「邱吉爾說的是，這一場本來是可以避免的不必要戰爭，他沒說過所有戰爭都不必要。」\n\n最終，李文彬堅持啟動「寒戰」。',
    fileRef: 'CW-EVT-003',
  },
  {
    id: 4,
    time: '02:17 HKT',
    type: 'CRITICAL',
    position: 'right',
    titleCn: '營救失敗',
    titleEn: 'Failed Rescue',
    content:
      '李文彬親自指揮的營救行動徹底失敗。\n\n情報全錯。\n\n飛虎隊按照情報突襲目標地點，只找到了假人和炸彈。沒有任何警員的蹤影。\n\n這是綁匪設下的陷阱——他們對警隊的行動瞭若指掌，每一步都在他們的預料之中。\n\n內鬼。一定有內鬼。',
    redactedItems: [
      { label: '行動傷亡人數', reveal: '3名飛虎隊員輕傷' },
    ],
    fileRef: 'CW-EVT-004',
  },
  {
    id: 5,
    time: '03:55 HKT',
    type: 'TACTICAL',
    position: 'left',
    titleCn: '權力轉移',
    titleEn: 'Power Shift',
    content:
      '營救失敗後，劉傑輝聯合高級警司邝智立、高級助理處長梁紫薇等人，正式彈劾李文彬。\n\n劉傑輝成功奪取「寒戰」行動的指揮權。李文彬被迫交出控制權。\n\n這不僅是一次指揮權的更迭——這是警隊內部權力結構的一次地震。\n\n文官系統暫時擊敗了武官系統。',
    fileRef: 'CW-EVT-005',
  },
  {
    id: 6,
    time: '09:30 HKT',
    type: 'CRITICAL',
    position: 'right',
    titleCn: '贖金要求',
    titleEn: 'The Ransom',
    content:
      '綁匪主動聯繫警方。\n\n最初的贖金要求：港幣 93,000,000。\n\n劉傑輝評估後，認為金額過大，警方無法在短時間內籌集。\n\n經過談判，綁匪改口要求 33,330,000 港元——一個奇怪的數字。\n\n綁匪提出一個條件：贖金必須由劉傑輝親自交收。',
    redactedItems: [
      { label: '綁匪通話錄音摘要', reveal: '通話使用預錄語音，無法進行即時對話' },
    ],
    fileRef: 'CW-EVT-006',
  },
  {
    id: 7,
    time: '14:22 HKT',
    type: 'CRITICAL',
    position: 'left',
    titleCn: '天橋交火',
    titleEn: 'The Exchange',
    content:
      '劉傑輝獨自攜帶贖金，按照綁匪指示來到指定天橋。\n\n這是一個精心設計的陷阱。\n\n綁匪在天橋兩端設下埋伏。交收過程中，槍聲突然響起。\n\n激烈的槍戰爆發。\n\n高級警司徐永基為了保護劉傑輝，奮不顧身衝上前線——身中多槍，當場殉職。\n\n劉傑輝僥倖生還，但贖金追踪器信號中斷。',
    redactedItems: [
      { label: '槍戰現場彈道分析', reveal: '共發現47個彈殼，涉及3種不同槍械' },
    ],
    fileRef: 'CW-EVT-007',
    specialVisual: 'dramatic',
  },
  {
    id: 8,
    time: '16:08 HKT',
    type: 'CRITICAL',
    position: 'right',
    titleCn: '金庫被劫',
    titleEn: 'The Vault Heist',
    content:
      '更驚人的消息傳來。\n\n原本計劃運回金庫的5000餘萬港元現金——在運輸途中被攔截劫走。\n\n押運的狗車遭到襲擊。劫匪訓練有素，行動迅速。\n\n這不是臨時起意的搶劫。這是精密計劃的一部分。\n\n兩宗案件之間，存在著不可分割的聯繫。',
    fileRef: 'CW-EVT-008',
  },
  {
    id: 9,
    time: '18:45 HKT',
    type: 'INTEL',
    position: 'left',
    titleCn: '真相浮現',
    titleEn: 'Truth Emerges',
    content:
      '劉傑輝展開了秘密調查。\n\n一個接一個的驚人發現：\n\n▸ 徐永基——劉傑輝的心腹，實際是內鬼。爛賭成性，抵押房產，最終被同夥滅口。\n\n▸ 金庫主管魏威廉——也是內鬼。向劉傑輝撒謊後，被汽車炸彈滅口。\n\n▸ SDU指揮官石米高——內鬼。負責「清理門戶」，殺害魏威廉和O記臥底。\n\n▸ 李家俊——IQ 192的天才，表面被劫持，實為整個行動的策劃者之一。',
    fileRef: 'CW-EVT-009',
  },
  {
    id: 10,
    time: '20:10 HKT',
    type: 'TACTICAL',
    position: 'right',
    titleCn: 'ICAC介入',
    titleEn: 'ICAC Interference',
    content:
      '劉傑輝做出了一個驚人的決定——他向廉政公署匿名舉報自己。\n\n這是一步險棋。\n\n廉政公署首席調查主任張國標率領調查小組介入。\n\n在ICAC的審訊室內，劉傑輝與張國標展開攻防。\n\n年輕有衝勁的張國標被劉傑輝利用——ICAC的調查反而幫助劉傑輝排除了部分嫌疑，並將調查方向引向了真正的內鬼。\n\n以身入局。',
    fileRef: 'CW-EVT-010',
  },
  {
    id: 11,
    time: '23:15 HKT',
    type: 'CRITICAL',
    position: 'left',
    titleCn: '天台對峙',
    titleEn: 'Rooftop Confrontation',
    content:
      '最終對決在天台展開。\n\n劉傑輝親手逮捕了李家俊。\n\n這個IQ 192的天才策劃者，他的父親是警隊行動副處長，但他選擇了另一條路。\n\n李文彬大義滅親——親眼看著自己的獨子被戴上手銬。\n\n表面上，案件告破。內鬼一一落網。「寒戰」行動結束。\n\n但這真的結束了嗎？',
    fileRef: 'CW-EVT-011',
    specialVisual: 'climax',
  },
  {
    id: 12,
    time: '23:47 HKT',
    type: 'AFTERMATH',
    position: 'right',
    titleCn: '未完的電話',
    titleEn: 'The Unfinished Call',
    content:
      '劉傑輝接到一通神秘電話。\n\n電話那頭的聲音冷冷地說：\n\n「釋放李家俊。不然，你的妻子和女兒——會有危險。」\n\n黑暗從未散去。它只是換了一種形式存在。\n\nThe war is not over. It has just begun.',
    redactedItems: [
      { label: '來電號碼', reveal: '號碼無法追踪，使用7層VPN轉接' },
      { label: '通話時長', reveal: '1分23秒' },
    ],
    fileRef: 'CW-EVT-012 // STATUS: ONGOING',
    specialVisual: 'dimmed',
  },
];

export interface TerminalLogEntry {
  timestamp: string;
  type: 'ALERT' | 'CRITICAL' | 'WARNING' | 'ACTION' | 'UPDATE' | 'STATUS' | 'INCOMING' | 'TRANSCRIPT' | 'CASUALTY' | 'ESTIMATE' | 'THREAT' | 'SYSTEM';
  message: string;
}

export const terminalLogs: TerminalLogEntry[] = [
  { timestamp: '23:47:12', type: 'ALERT', message: 'Police van ER-4471 signal lost' },
  { timestamp: '23:47:15', type: 'ALERT', message: 'Emergency beacon activated — then silenced' },
  { timestamp: '23:48:03', type: 'INCOMING', message: 'Anonymous call received' },
  { timestamp: '23:48:04', type: 'TRANSCRIPT', message: '"你們的車不見了。找不到的。"' },
  { timestamp: '00:15:33', type: 'ACTION', message: 'Op COLD WAR activated by LEE Man-bun' },
  { timestamp: '00:15:34', type: 'ALERT', message: 'Alert Level raised to CRITICAL' },
  { timestamp: '02:17:48', type: 'CRITICAL', message: 'Rescue operation FAILED — decoy located' },
  { timestamp: '02:17:49', type: 'WARNING', message: 'Intelligence compromise detected' },
  { timestamp: '03:55:12', type: 'UPDATE', message: 'Command transferred to LIU Kit-wing' },
  { timestamp: '09:30:00', type: 'INCOMING', message: 'Ransom demand — HK$93,000,000' },
  { timestamp: '09:45:22', type: 'UPDATE', message: 'Ransom revised — HK$33,330,000' },
  { timestamp: '14:22:17', type: 'CRITICAL', message: 'Exchange point ambushed — officer down' },
  { timestamp: '14:22:18', type: 'CASUALTY', message: 'SSP TSUI Wing-kei — KIA' },
  { timestamp: '16:08:44', type: 'CRITICAL', message: 'Vault transport intercepted' },
  { timestamp: '16:08:45', type: 'ESTIMATE', message: 'HK$50,000,000+ stolen' },
  { timestamp: '20:10:00', type: 'ALERT', message: 'ICAC investigation launched' },
  { timestamp: '23:15:00', type: 'STATUS', message: 'Subject KA-LEE Chun arrested' },
  { timestamp: '23:47:00', type: 'THREAT', message: 'Incoming call to LIU Kit-wing' },
  { timestamp: '23:47:01', type: 'THREAT', message: 'THREAT MESSAGE: Family safety threatened' },
  { timestamp: '23:47:02', type: 'SYSTEM', message: 'OPERATION STATUS: INCOMPLETE' },
];

export const logTypeColors: Record<TerminalLogEntry['type'], string> = {
  ALERT: '#f59e0b',
  CRITICAL: '#dc2626',
  WARNING: '#f59e0b',
  ACTION: '#10b981',
  UPDATE: '#10b981',
  STATUS: '#10b981',
  INCOMING: '#38bdf8',
  TRANSCRIPT: '#e2e8f0',
  CASUALTY: '#dc2626',
  ESTIMATE: '#94a3b8',
  THREAT: '#dc2626',
  SYSTEM: '#dc2626',
};

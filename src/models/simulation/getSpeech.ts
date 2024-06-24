export const getSpeech = (text: string) => {
  let voices: SpeechSynthesisVoice[] = [];
  let isSpeaking = false;

  const setVoiceList = () => {
    voices = speechSynthesis.getVoices();
  };

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = setVoiceList;
  }

  setVoiceList(); // 초기화 시도 (때로는 동기적으로 작동함)

  const speech = (text: string) => {
    speechSynthesis.cancel(); // 기존 음성을 중지
    isSpeaking = false;

    const lang = 'ko-KR';
    const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.lang = lang;

    const kor_voice = voices.find(
      elem => elem.lang === lang || elem.lang === lang.replace('-', '_'),
    );

    if (kor_voice) {
      utterThis.voice = kor_voice;
    } else {
      return;
    }

    utterThis.onstart = () => {
      isSpeaking = true;
    };

    utterThis.onend = () => {
      isSpeaking = false;
    };

    speechSynthesis.speak(utterThis);
  };

  // 음성 목록이 로드되었는지 확인하고 텍스트를 말하도록 호출
  if (voices.length > 0) {
    speech(text);
  } else {
    speechSynthesis.onvoiceschanged = () => {
      setVoiceList();
      speech(text);
    };
  }
};

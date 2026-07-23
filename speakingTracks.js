// 리슨앤리핏 (Listen and Repeat) 데이터
// Supabase Storage 버킷: speaking-audio (public)
// 각 문장은 독립된 mp3 파일이라 타임스탬프가 필요 없어요.

const SPEAKING_TESTS = [
  {
    id: 1,
    title: "Test 1",
    sentences: [
      {
        id: "1-1",
        text: "We have a variety of wildlife.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test1-01.mp3"
      },
      {
        id: "1-2",
        text: "Bears, wolves, and large cats are to the right.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test1-02.mp3"
      },
      {
        id: "1-3",
        text: "You can find sea lions and elephants further down the path.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test1-03.mp3"
      },
      {
        id: "1-4",
        text: "Please, no outside food or drinks, and do not feed the animals.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test1-04.mp3"
      },
      {
        id: "1-5",
        text: "Avoid banging or tapping on the displays and enclosures.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test1-05.mp3"
      },
      {
        id: "1-6",
        text: "For those with children, we offer summer camps and educational opportunities.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test1-06.mp3"
      },
      {
        id: "1-7",
        text: "The visitor's centre, located near the front entrance, can give you more information.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test1-07.mp3"
      }
    ]
  }
];

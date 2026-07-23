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
  },
  {
    id: 2,
    title: "Test 2",
    sentences: [
      {
        id: "2-1",
        text: "Welcome to our campus gym.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test2-01.mp3"
      },
      {
        id: "2-2",
        text: "Cardio machines are near the entrance.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test2-02.mp3"
      },
      {
        id: "2-3",
        text: "Free weights are in the back.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test2-03.mp3"
      },
      {
        id: "2-4",
        text: "All of our locker rooms are equipped with showers and towels.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test2-04.mp3"
      },
      {
        id: "2-5",
        text: "Our fitness instructors hold exercise classes over here.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test2-05.mp3"
      },
      {
        id: "2-6",
        text: "You can check the schedule for available classes and timings.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test2-06.mp3"
      },
      {
        id: "2-7",
        text: "If you have any questions, please seek assistance from the attendants at the Help Desk.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test2-07.mp3"
      }
    ]
  },
  {
    id: 3,
    title: "Test 3",
    sentences: [
      {
        id: "3-1",
        text: "Is this your first time at our museum?",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test3-01.mp3"
      },
      {
        id: "3-2",
        text: "For modern art, visit the Eastern Wing.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test3-02.mp3"
      },
      {
        id: "3-3",
        text: "Classical paintings are located on the second floor.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test3-03.mp3"
      },
      {
        id: "3-4",
        text: "The new exhibit of self-portraits is very popular.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test3-04.mp3"
      },
      {
        id: "3-5",
        text: "We offer group tours of gallery highlights at no extra charge.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test3-05.mp3"
      },
      {
        id: "3-6",
        text: "Unfortunately, the sculpture hall is currently under renovation.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test3-06.mp3"
      },
      {
        id: "3-7",
        text: "Our gift shop is running a special promotion on a wide selection of books.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test3-07.mp3"
      }
    ]
  },
  {
    id: 4,
    title: "Test 4",
    sentences: [
      {
        id: "4-1",
        text: "The ticket counter is over there.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test4-01.mp3"
      },
      {
        id: "4-2",
        text: "We have maps to help you find your way.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test4-02.mp3"
      },
      {
        id: "4-3",
        text: "It's a good idea to start at the Central Gallery.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test4-03.mp3"
      },
      {
        id: "4-4",
        text: "Or take a self-guided tour to explore our most famous items.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test4-04.mp3"
      },
      {
        id: "4-5",
        text: "Don't forget to budget extra time for our popular gift shop.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test4-05.mp3"
      },
      {
        id: "4-6",
        text: "This week is your last chance to see the special exhibit on photography.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test4-06.mp3"
      },
      {
        id: "4-7",
        text: "Check out our calendar of upcoming events, many of which are family-friendly.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test4-07.mp3"
      }
    ]
  },
  {
    id: 5,
    title: "Test 5",
    sentences: [
      {
        id: "5-1",
        text: "Welcome, let's check your reservations.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test5-01.mp3"
      },
      {
        id: "5-2",
        text: "You can choose your vehicle from this lot.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test5-02.mp3"
      },
      {
        id: "5-3",
        text: "The rental terms can be viewed at the contract signing desk.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test5-03.mp3"
      },
      {
        id: "5-4",
        text: "When you are ready, come over to the key pickup station.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test5-04.mp3"
      },
      {
        id: "5-5",
        text: "Over here is where rental cars are returned to the parking lot.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test5-05.mp3"
      },
      {
        id: "5-6",
        text: "Please be sure to make a full inspection before driving away from the building.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test5-06.mp3"
      },
      {
        id: "5-7",
        text: "When returning your rental, be sure to park it in the exact same location where you picked it up.",
        file: "https://wccuzwkswtaehcdijtcf.supabase.co/storage/v1/object/public/speaking-audio/Test5-07.mp3"
      }
    ]
  }
];

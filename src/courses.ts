import { CourseType } from "./types/course";
const courses: CourseType[] = [
  {
    name: {
      AR: "أساسيات البرمجة بلغة بايثون",
      EN: "Basics of programming in Python language",
    },
    description: {
      EN: "Developing your programming skills in Python and teaching you how to solve problems by thinking computationally.",
      AR: "تطوير مهارات البرمجة الخاصة بك في بايثون وتعليمك كيفية القيام بذلك لحل المشكلات بالتفكير الحسابي.",
    },
    duration: 35,
    lectures: 27,
    real_projects: 5,
    workshops: 3,
    overview: {
      AR: [
        "لن تنقل دورة بايثون هذه مهارات البرمجة لديك إلى المستوى التالي فحسب ، بل ستمنحك أيضًا قوة عظمى في حل المشكلات!",
        "تعتبر البرمجة مهارة متزايدة الأهمية ، سواء كنت تطمح إلى الحصول على وظيفة في مجال تطوير البرمجيات ، أو في مجالات أخرى. هذه الدورة هي مقدمة إلى البرمجة بلغة بايثون ، لكن دروسها تمتد إلى أي لغة قد ترغب في تعلمها. هذا لأن البرمجة تدور في الأساس حول معرفة كيفية حل فئة من المشاكل وكتابة الخوارزمية ، وهي مجموعة واضحة من الخطوات لحل أي مشكلة في مسارها.",
        "في هذه الدورة ، ستتعلم كيفية تطوير خوارزمية ، ثم التقدم إلى قراءة التعليمات البرمجية وفهم كيفية ارتباط مفاهيم البرمجة بالخوارزميات",
      ],
      EN: [
        "This Python course will not only take your programming skills to the next level, but also give you a problem-solving superpower!",
        "Programming is an increasingly important skill, whether you aspire to a career in software development, or in other fields. This course is an Introduction to Programming in Python, but its lessons extend to any language you might want to learn. This is because programming is fundamentally about figuring out how to solve a class of problems and writing the algorithm, a clear set of steps to solve any problem in its course.",
        "In this course, you will learn how to develop an algorithm, then progress to reading code and understanding how programming concepts relate to algorithms",
      ],
    },
    what_you_will_learn: {
      AR: [
        "في هذه الدورة ، ستتعلم كيفية تطوير خوارزمية ، ثم التقدم إلى قراءة التعليمات البرمجية وفهم كيفية ارتباط مفاهيم البرمجة بالخوارزميات",
        "تطوير فهم شامل للغة بايثون.",
        "كن مطور Python محترفًا واحصل على وظيفة.",
        "حل مشاكل كود بايثون.",
        "إعداد بيئة التثبيت (دفتر ملاحظات anaconda-jupyter)",
        "عوامل تشغيل python ، والحلقات ، والشرطية ، بينما الحلقات ، وهياكل البيانات ، والمتغيرات وأنواع البيانات ..",
        "تنفيذ البرمجة الموجهة للكائنات ومعالجة استثناءات الدراسة في Python ..",
        "إنشاء مخططات Python في Matplotlib.",
        "كن مطورًا محترفًا للغة Python وتوظيفك",
        "العمل مع IDEs مختلفة مثل Spyder و Jupyter.",
        "دراسة معالجة الاستثناءات في بايثون.",
      ],
      EN: [
        "In this course, you will learn how to develop an algorithm, then progress to reading code and understanding how programming concepts relate to algorithms",
        "Develop a thorough understanding of Python .",
        "Become a professional Python Developer and get hire .",
        "Solve problems with Python code .",
        "installation environment setup (anaconda-jupyter notebook)",
        "python operators , loops , conditionals , while loops, data structures , variables and data types..",
        "Implement object-oriented programming and Study exception handling in Python ..",
        "Create Python charts in Matplotlib .",
        "Become a professional Python Developer and get hired",
        "Work with different IDEs like Spyder and Jupyter .",
        "Study exception handling in Python .",
      ],
    },
    fqa: [
      {
        q: {
          EN: "What is Python ?",
          AR: "ما هي لغة بايثون؟",
        },
        a: {
          EN: [
            "Python is an interpreted, interactive, object-oriented programming language. It incorporates modules, exceptions, dynamic typing, very high-level dynamic data types, and classes. It supports multiple programming paradigms beyond object- oriented programming, such as procedural and functional programming.",
          ],
          AR: [
            "Python هي لغة برمجة مفسرة وتفاعلية وموجهة للكائنات. وهو يشتمل على الوحدات النمطية والاستثناءات والكتابة الديناميكية وأنواع البيانات الديناميكية عالية المستوى والفئات. وهو يدعم نماذج برمجة متعددة تتجاوز البرمجة الموجهة للكائنات ، مثل البرمجة الإجرائية والوظيفية.",
          ],
        },
      },
      {
        q: {
          EN: "Why use python ?",
          AR: "لماذا نستخدم بيثون؟",
        },
        a: {
          EN: [
            "Python is commonly used for developing websites and software, task automation, data analysis, and data visualization.",
          ],
          AR: [
            "يتم استخدام Python بشكل شائع لتطوير مواقع الويب والبرامج وأتمتة المهام وتحليل البيانات وتصور البيانات.",
          ],
        },
      },
      {
        q: {
          EN: "Is python commonly used ?",
          AR: "هل بايثون شائع الاستخدام؟",
        },
        a: {
          EN: [
            "Python has become one of the most popular programming languages in the world in recent years. It's used in everything from machine learning to building websites and software testing. It can be used by developers and non-developers alike.",
          ],
          AR: [
            "أصبحت Python واحدة من أشهر لغات البرمجة في العالم فى السنوات الاخيرة. يتم استخدامه في كل شيء من التعلم الآلي إلى إنشاء مواقع الويب واختبار البرامج. يمكن استخدامه من قبل المطورين وغير المطورين على حد سواء.",
          ],
        },
      },
    ],
    have_target: false, // to display
    is_dependent: true,
    icon: "https://firebasestorage.googleapis.com/v0/b/techmind-assets.appspot.com/o/Courses%2FPython_Icon.png?alt=media&token=81a0f41d-df07-43c8-b87d-fd9f1f440776",
    main_img:
      "https://firebasestorage.googleapis.com/v0/b/techmind-assets.appspot.com/o/Courses%2FPython_OtherSrc.jfif?alt=media&token=1f09632d-8ba0-48e8-bb1b-6d717fe10979",
    other_src:
      "https://firebasestorage.googleapis.com/v0/b/techmind-assets.appspot.com/o/Courses%2FPython_OtherSrcgif.gif?alt=media&token=2126680e-03f3-4ef0-a994-e9cc8b631aa9",
    have_objectives: false,
    objectives: [
      {
        name: {
          EN: "Engilsh",
          AR: "Arabic",
        },
        description: {
          EN: "Engilsh",
          AR: "Arabic",
        },
        icon: "icon",
      },
    ],
  },
  {
    name: {
      AR: "أساسيات الرياضيات والإحصاء",
      EN: "Basics of Mathematics and Statistics",
    },
    description: {
      EN: "Covering descriptive and inferential statistics, as well as hypothesis testing techniques and exercises, statistics puts the “scientist” in data scientist.",
      AR: "تغطي الإحصاءات الوصفية والاستنتاجية ، وكذلك تقنيات وتمارين اختبار الفرضيات ، والإحصاء يضع 'العالم' في عالم البيانات.",
    },
    duration: 10,
    lectures: 15,
    real_projects: 2,
    workshops: 2,
    overview: {
      AR: [
        "الإحصاء هو القوة الدافعة في أي مهنة كمية. إنها المهارة الأساسية التي يحتاجها عالم البيانات لفهم وتصميم الاختبارات والتحليلات الإحصائية باستخدام حزم البرامج ولغات البرمجة الحديثة. في هذه الدورة ، نبدأ من الأساسيات ونبني تدريجيًا تفكيرك الإحصائي. وهذا بدوره يمكّنك من فهم التحليلات الأكثر تعقيدًا التي يتم إجراؤها لاحقًا في البرنامج. ",
      ],
      EN: [
        "Statistics is the driving force in any quantitative career. It is the fundamental skill that a data scientist needs to understand and design statistical tests and analysis using modern software packages and programming languages. In this course, we start from the very basics and gradually build your statistical thinking. This, in turn, enables you to understand the more complex analyses carried out later in the program.",
      ],
    },
    what_you_will_learn: {
      AR: [
        "تبدأ هذه الدورة بأساسيات الإحصاء وتبني تفكيرك الحسابي. إنها تعلمك تدريجيًا كيفية التعامل مع تحليلات ونهج إحصائية وفرضيات أكثر تعقيدًا.",
        "فهم ما هو التوزيع.",
        "قم بإجراء اختبار الفرضيات",
        "الإحصاء الوصفي وأنواع المتغيرات.",
        "البيانات إلى نهج العمل وأنواع البيانات.",
        "التوزيع الطبيعي ، التوزيع الطبيعي القياسي",
        "مقاييس النزعة المركزية ومقاييس التجنيب",
        "التوحيد والتطبيع",
        "اختبار الفرضية ، P-value.",
        "خط أنابيب البيانات والإحصاءات الاستنتاجية.",
      ],
      EN: [
        "This course begins with the very basics of statistics and builds up your arithmetic thinking. It gradually teaches you how to work with more complex analyses, statistical approaches, and hypothesis.",
        "Understand what a distribution is .",
        "Perform hypothesis testing.",
        "Descriptive Statistics & Types of variables. ",
        "Data to action approach & Types of Data. ",
        "Normal Distribution, Standard Normal Distribution. ",
        "Measures of central tendency & Measures of spared.",
        "Standardization and normalization.",
        "Hypothesis Testing, P-value.",
        "Data Pipeline & Inferential Statistics.",
      ],
    },
    fqa: [
      {
        q: {
          EN: "Why statistics is important in data science?",
          AR: "لماذا الإحصاء مهم في علم البيانات؟",
        },
        a: {
          EN: [
            "In data science, statistics is at the core of sophisticated machine learning algorithms, capturing, and translating data patterns into actionable evidence. Data scientists use statistics to gather, review, analyze, and draw conclusions from data, as well as apply quantified mathematical models to appropriate variables.",
          ],
          AR: [
            "في علم البيانات ، تعد الإحصائيات جوهر خوارزميات التعلم الآلي المتطورة ، حيث تلتقط أنماط البيانات وترجمتها إلى أدلة قابلة للتنفيذ. يستخدم علماء البيانات الإحصائيات لجمع ومراجعة وتحليل واستخلاص النتائج من البيانات ، وكذلك تطبيق النماذج الرياضية الكمية على المتغيرات المناسبة.",
          ],
        },
      },
      {
        q: {
          EN: "What are 5 uses of statistics?",
          AR: "ما هي الاستخدامات الخمسة للإحصاءات؟",
        },
        a: {
          EN: [
            "Statistics can be used to predict the future, determine the probability that a specific event will happen, or help answer questions about a survey. Statistics is used in many different fields such as business, medicine, biology, psychology and social sciences.",
          ],
          AR: [
            "يمكن استخدام الإحصائيات للتنبؤ بالمستقبل ، أو تحديد احتمالية وقوع حدث معين ، أو المساعدة في الإجابة عن أسئلة حول الاستبيان. يتم استخدام الإحصائيات في العديد من المجالات المختلفة مثل الأعمال التجارية ، والطب ، وعلم الأحياء ، وعلم النفس والعلوم الاجتماعية.",
          ],
        },
      },
      {
        q: {
          EN: "Why is coding used in statistics ?",
          AR: "لماذا يتم استخدام الترميز في الإحصاء؟",
        },
        a: {
          EN: [
            "One purpose of coding is to transform the data into a form suitable for computer- aided analysis.",
          ],
          AR: [
            "يتمثل أحد أهداف الترميز في تحويل البيانات إلى نموذج مناسب للتحليل بمساعدة الكمبيوتر.",
          ],
        },
      },
      {
        q: {
          EN: "What are the 4 types of data in data science?",
          AR: "ما هي الأنواع الأربعة من البيانات في علم البيانات؟",
        },
        a: {
          EN: [
            "Nominal data",
            "Ordinal data",
            "Discrete data",
            "Continuous data.",
          ],
          AR: [
            "البيانات الاسمية.",
            "البيانات الترتيبية.",
            "البيانات المنفصلة.",
            "البيانات المستمرة.",
          ],
        },
      },
    ],
    have_target: false,
    is_dependent: false,
    icon: "https://firebasestorage.googleapis.com/v0/b/techmind-assets.appspot.com/o/courses%2Fmath_icon.png?alt=media&token=1bc7f33c-b6b5-409b-a01c-f44b653dba7e",
    main_img:
      "https://firebasestorage.googleapis.com/v0/b/techmind-assets.appspot.com/o/courses%2Fmath_main_img.jpg?alt=media&token=37eb17fd-4924-47fe-a412-46254b954ba4",
    other_src:
      "https://firebasestorage.googleapis.com/v0/b/techmind-assets.appspot.com/o/courses%2Fmath_other_media.gif?alt=media&token=a443b4d3-d35a-45e1-8a01-ae2dc3074a46",
    have_objectives: false,
  },
];

export default courses;

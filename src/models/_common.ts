export default {
  name: {
    EN: {
      type: String,
      unique: true,
      require: true,
    },
    AR: {
      type: String,
      unique: true,
      require: true,
    },
  },
  description: {
    EN: String,
    AR: String,
  },
  main_img: {
    type: String,
    required: true,
  },
  other_src: {
    type: String,
    required: true,
  },
  overview: {
    EN: [String],
    AR: [String],
  },
  what_you_will_learn: {
    EN: [String],
    AR: [String],
  },
  who_is_this_course_for: {
    EN: [String],
    AR: [String],
  },
  fqa: [
    {
      q: {
        EN: String,
        AR: String,
      },
      a: {
        EN: [String],
        AR: [String],
      },
    },
  ],
};

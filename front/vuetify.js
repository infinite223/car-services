import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import { aliases, md } from "vuetify/iconsets/md";

export default createVuetify({
  icons: {
    defaultSet: "md",
    aliases,
    sets: {
      md,
    },
  },
});

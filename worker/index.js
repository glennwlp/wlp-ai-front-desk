// WLP AI Front Desk demo: static assets only. The early-access form is a non-functional demo (no backend).
export default {
  async fetch(req, env) {
    return env.ASSETS.fetch(req);
  },
};

module.exports = {
  ci: {
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "csp-xss": "off",
        "content-width": "off",
        "maskable-icon": "off",
        "service-worker": "off",
        "splash-screen": "off",
        "themed-omnibox": "off",
        "legacy-javascript": "off",
        "errors-in-console": "off",
        "unused-javascript": "off",
        "uses-responsive-images": "off",
      },
    },
  },
}

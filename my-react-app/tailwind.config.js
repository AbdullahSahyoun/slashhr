module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        global: {
          background1: "var(--global-bg-1)",
          background2: "var(--global-bg-2)",
          background3: "var(--global-bg-3)",
          text1: "var(--global-text-1)",
          text2: "var(--global-text-2)",
          text3: "var(--global-text-3)",
          text4: "var(--global-text-4)",
          text5: "var(--global-text-5)"
        },
        edittext: {
          text1: "var(--edittext-text-1)"
        },
        button: {
          background1: "var(--button-bg-1)"
        },
        sidebar: {
          background1: "var(--sidebar-bg-1)",
          background2: "var(--sidebar-bg-2)"
        },
        header: {
          background1: "var(--header-bg-1)"
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
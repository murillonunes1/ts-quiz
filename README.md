# TypeScript Quiz App

A simple and interactive **Quiz Application** built with **React** and **Vite**, focused on testing and improving your knowledge of **TypeScript**. The quiz is divided into three difficulty levels: **Easy**, **Medium**, and **Hard**.

## 📚 Features

- 🧠 Multiple-choice questions about TypeScript
- 🎯 Three difficulty levels: Easy, Medium, and Hard
- ✅ Immediate feedback on your answers
- 📈 Score tracking
- ⚡ Fast and optimized with Vite
- 🎨 Clean and responsive UI

## 🛠️ Tech Stack

- **React** – UI Library
- **TypeScript** – Static typing
- **Vite** – Next-generation frontend tooling
- **TailwindCSS** _(optional)_ – For styling (if included)

## 🚀 Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/typescript-quiz-app.git
cd typescript-quiz-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

Visit `http://localhost:5173` to start the quiz!

## 📁 Project Structure

```
.
├── src/
│   ├── components/       # Reusable components (QuestionCard, Button, etc.)
│   ├── data/             # Questions and answers JSON grouped by difficulty
│   ├── pages/            # Main pages or views
│   ├── App.tsx           # Root component
│   └── main.tsx          # Vite entry point
├── public/               # Static files
├── README.md
└── vite.config.ts
```

## ✍️ How to Add New Questions

You can add more questions by editing the files in the `src/data/` folder:

```ts
{
  question: "What does the 'readonly' modifier do in TypeScript?",
  options: [
    "Makes a variable immutable",
    "Allows reassignment",
    "Removes type checks",
    "Makes a variable global"
  ],
  correctAnswer: "Makes a variable immutable",
  difficulty: "medium"
}
```

## 🧪 Available Scripts

- `npm run dev` – Run development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

## 📌 TODO

- Add timer for each question
- Save high scores to localStorage
- Implement progress bar
- Add accessibility improvements

## 📄 License

MIT License

---

murillodev

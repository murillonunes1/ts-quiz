import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuizCard } from '@/components/QuizCard';
import { ScoreCard } from '@/components/ScoreCard';
import { questionsData, Question } from '@/data/questions';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { level } = location.state || { level: 'easy' };
  
  const [questions] = useState<Question[]>(() => {
    const questionSet = questionsData.find(qs => qs.level === level);
    return questionSet?.questions || [];
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showScore, setShowScore] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Store quiz start time for analytics
    const startTime = new Date().toISOString();
    localStorage.setItem(`quiz-start-${level}`, startTime);
  }, [level]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    setAnswers(prev => [...prev, isCorrect]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Store individual answer for analytics
    const answerData = {
      questionId: questions[currentQuestionIndex].id,
      isCorrect,
      timestamp: new Date().toISOString()
    };
    
    const existingAnswers = JSON.parse(
      localStorage.getItem(`quiz-answers-${level}`) || '[]'
    );
    localStorage.setItem(
      `quiz-answers-${level}`, 
      JSON.stringify([...existingAnswers, answerData])
    );

    // Auto-advance after showing result
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnswered(false);
      } else {
        // Quiz complete
        setShowScore(true);
        saveQuizResults();
      }
    }, 3000);
  };

  const saveQuizResults = () => {
    const endTime = new Date().toISOString();
    const startTime = localStorage.getItem(`quiz-start-${level}`);
    
    const results = {
      level,
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      startTime,
      endTime,
      answers
    };

    // Save to localStorage for persistence
    const allResults = JSON.parse(localStorage.getItem('quiz-results') || '[]');
    localStorage.setItem('quiz-results', JSON.stringify([...allResults, results]));
    
    // Save current session best score
    const currentBest = localStorage.getItem(`best-score-${level}`);
    const currentPercentage = Math.round((score / questions.length) * 100);
    
    if (!currentBest || currentPercentage > parseInt(currentBest)) {
      localStorage.setItem(`best-score-${level}`, currentPercentage.toString());
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setShowScore(false);
    setIsAnswered(false);
    
    // Clear current quiz answers
    localStorage.removeItem(`quiz-answers-${level}`);
  };

  const handleBackToMenu = () => {
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No questions found</h1>
          <Button onClick={handleBackToHome}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={handleBackToHome}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground capitalize">
              {level} TypeScript Quiz
            </h1>
            <p className="text-muted-foreground">
              Test your TypeScript knowledge
            </p>
          </div>
          
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {showScore ? (
          <ScoreCard
            score={score}
            totalQuestions={questions.length}
            level={level as 'easy' | 'medium' | 'hard'}
            onRestart={handleRestart}
            onBackToMenu={handleBackToMenu}
          />
        ) : (
          <QuizCard
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            showTimer={true}
            timeLimit={30}
          />
        )}
      </div>
    </div>
  );
};
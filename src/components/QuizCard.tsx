import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Question } from '@/data/questions';

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  showTimer?: boolean;
  timeLimit?: number;
}

export const QuizCard = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showTimer = true,
  timeLimit = 30
}: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (!showTimer) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up, auto-submit wrong answer
          handleSubmit(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showTimer]);

  const handleSubmit = (answer: number | null) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === question.correctAnswer;
    onAnswer(isCorrect);
  };

  const getOptionClass = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index 
        ? 'border-primary bg-primary/10' 
        : 'border-border hover:border-primary/50 hover:bg-primary/5';
    }
    
    if (index === question.correctAnswer) {
      return 'border-success bg-success/10 text-success-foreground';
    }
    
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'border-destructive bg-destructive/10 text-destructive-foreground';
    }
    
    return 'border-border opacity-50';
  };

  const progressPercentage = ((questionNumber - 1) / totalQuestions) * 100;
  const timePercentage = showTimer ? (timeLeft / timeLimit) * 100 : 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-sm">
            Question {questionNumber} of {totalQuestions}
          </Badge>
          {showTimer && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className={timeLeft <= 10 ? 'text-destructive font-medium' : ''}>
                {timeLeft}s
              </span>
            </div>
          )}
        </div>
        
        <Progress value={progressPercentage} className="h-2" />
        
        {showTimer && (
          <Progress 
            value={timePercentage} 
            className={`h-1 ${timeLeft <= 10 ? 'bg-destructive/20' : ''}`}
          />
        )}
      </div>

      <Card className="bg-gradient-to-br from-card to-secondary/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 
                ${getOptionClass(index)} disabled:cursor-not-allowed`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && (
                  <div>
                    {index === question.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                    {index === selectedAnswer && index !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                )}
              </div>
            </button>
          ))}
          
          {!showResult && selectedAnswer !== null && (
            <Button 
              onClick={() => handleSubmit(selectedAnswer)}
              className="w-full mt-4"
              size="lg"
            >
              Submit Answer
            </Button>
          )}
          
          {showResult && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Explanation:</strong> {question.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
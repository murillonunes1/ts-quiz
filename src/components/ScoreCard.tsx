import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, RotateCcw, Home, Star } from 'lucide-react';

interface ScoreCardProps {
  score: number;
  totalQuestions: number;
  level: 'easy' | 'medium' | 'hard';
  onRestart: () => void;
  onBackToMenu: () => void;
}

export const ScoreCard = ({
  score,
  totalQuestions,
  level,
  onRestart,
  onBackToMenu
}: ScoreCardProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreMessage = () => {
    if (percentage >= 90) return { message: 'Excellent! You are a TypeScript master!', icon: '🏆' };
    if (percentage >= 70) return { message: 'Great job! You have a solid understanding!', icon: '🎉' };
    if (percentage >= 50) return { message: 'Good work! Keep practicing to improve!', icon: '👍' };
    return { message: 'Keep learning! Practice makes perfect!', icon: '💪' };
  };

  const getLevelColor = () => {
    switch (level) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-primary';
    }
  };

  const scoreMessage = getScoreMessage();

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-gradient-to-br from-card to-secondary/30 shadow-xl border-2">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <Badge 
            className={`text-white capitalize ${getLevelColor()}`}
          >
            {level} Level
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-lg font-medium text-muted-foreground">
              {percentage}% Correct
            </div>
          </div>
          
          <Progress value={percentage} className="h-3" />
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl mb-2">{scoreMessage.icon}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {scoreMessage.message}
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.ceil((percentage / 100) * 5)
                    ? 'fill-primary text-primary'
                    : 'text-border'
                }`}
              />
            ))}
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={onRestart}
              className="w-full"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            
            <Button 
              onClick={onBackToMenu}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
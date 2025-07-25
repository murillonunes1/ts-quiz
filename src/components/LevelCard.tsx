import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, BookOpen, Trophy } from 'lucide-react';

interface LevelCardProps {
  level: 'easy' | 'medium' | 'hard';
  title: string;
  description: string;
  questionCount: number;
  onStart: () => void;
}

export const LevelCard = ({ 
  level, 
  title, 
  description, 
  questionCount, 
  onStart 
}: LevelCardProps) => {
  const getLevelConfig = () => {
    switch (level) {
      case 'easy':
        return {
          color: 'bg-green-500',
          textColor: 'text-green-700',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: BookOpen,
          difficulty: 'Beginner Friendly'
        };
      case 'medium':
        return {
          color: 'bg-yellow-500',
          textColor: 'text-yellow-700',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: Clock,
          difficulty: 'Intermediate'
        };
      case 'hard':
        return {
          color: 'bg-red-500',
          textColor: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: Trophy,
          difficulty: 'Advanced'
        };
      default:
        return {
          color: 'bg-primary',
          textColor: 'text-primary',
          bgColor: 'bg-primary/5',
          borderColor: 'border-primary/20',
          icon: BookOpen,
          difficulty: 'Unknown'
        };
    }
  };

  const config = getLevelConfig();
  const Icon = config.icon;
  
  // Get best score from localStorage
  const bestScore = localStorage.getItem(`best-score-${level}`);
  const bestPercentage = bestScore ? parseInt(bestScore) : 0;

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 border-2 ${config.borderColor} 
      hover:border-primary/30 bg-gradient-to-br from-card to-secondary/20`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.bgColor}`}>
              <Icon className={`w-6 h-6 ${config.textColor}`} />
            </div>
            <div>
              <CardTitle className="text-xl capitalize">{title}</CardTitle>
              <Badge 
                variant="secondary" 
                className={`text-white ${config.color} mt-1`}
              >
                {config.difficulty}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{questionCount} Questions</span>
          <span>~{questionCount * 0.5} minutes</span>
        </div>
        
        {bestScore && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Best Score:</span>
              <span className="font-medium text-primary">{bestPercentage}%</span>
            </div>
            <Progress value={bestPercentage} className="h-2" />
          </div>
        )}
        
        <Button 
          onClick={onStart}
          className="w-full"
          size="lg"
        >
          Start {title} Quiz
        </Button>
      </CardContent>
    </Card>
  );
};
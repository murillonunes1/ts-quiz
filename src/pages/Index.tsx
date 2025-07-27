import { useNavigate } from 'react-router-dom';
import { LevelCard } from '@/components/LevelCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code2, Brain, TrendingUp, Users, Clock } from 'lucide-react';
import { questionsData } from '@/data/questions';

const Index = () => {
  const navigate = useNavigate();

  const handleStartQuiz = (level: 'easy' | 'medium' | 'hard') => {
    navigate('/quiz', { state: { level } });
  };

  const levels = [
    {
      level: 'easy' as const,
      title: 'Easy',
      description: 'Perfect for beginners! Learn TypeScript basics like types, interfaces, and basic syntax.',
      questionCount: questionsData.find(q => q.level === 'easy')?.questions.length || 0
    },
    {
      level: 'medium' as const,
      title: 'Medium',
      description: 'Take it up a notch! Explore generics, utility types, and advanced TypeScript features.',
      questionCount: questionsData.find(q => q.level === 'medium')?.questions.length || 0
    },
    {
      level: 'hard' as const,
      title: 'Hard',
      description: 'For TypeScript masters! Dive into conditional types, mapped types, and complex patterns.',
      questionCount: questionsData.find(q => q.level === 'hard')?.questions.length || 0
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Code2 className="w-4 h-4" />
            Interactive Learning Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
            Master TypeScript
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Level up your TypeScript skills with interactive quizzes designed to test your knowledge 
            and reinforce key concepts through hands-on practice.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Brain className="w-5 h-5 text-primary" />
              <span>15+ Questions</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span>3 Difficulty Levels</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5 text-success" />
              <span>Immediate Feedback</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Levels Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Challenge!</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select a difficulty level that matches your TypeScript knowledge and start learning today!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {levels.map((level) => (
              <LevelCard
                key={level.level}
                level={level.level}
                title={level.title}
                description={level.description}
                questionCount={level.questionCount}
                onStart={() => handleStartQuiz(level.level)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Try our platform!</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to become a TypeScript expert.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: 'Smart Learning',
                description: 'Questions designed by experts to build real understanding'
              },
              {
                icon: TrendingUp,
                title: 'Track Progress',
                description: 'Monitor your improvement with detailed score tracking'
              },
              {
                icon: Clock,
                title: 'Timed Challenges',
                description: 'Test your knowledge under pressure with optional timers'
              },
              {
                icon: Users,
                title: 'Instant Feedback',
                description: 'Learn from mistakes with detailed explanations'
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-background">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">
            Built with React, TypeScript, and TailwindCSS.
          </p>
          <p className="text-muted-foreground">© murillodev</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

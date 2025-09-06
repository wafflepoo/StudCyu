import React, { useState } from 'react';
import { BookOpen, Brain, TrendingUp, Clock, Download, Star, Users, Award, Target, Calendar, FileText, Video, Upload } from 'lucide-react';
import { useApp } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Dashboard() {
  const { user, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data based on user role
  const mockData = {
    guest: {
      stats: [
        { label: 'Documents Previewed', value: '12', icon: BookOpen },
        { label: 'Available with Registration', value: '2M+', icon: FileText },
      ],
      recentActivity: [
        { title: 'Introduction to Psychology', type: 'preview', time: '2 hours ago' },
        { title: 'Calculus I Lecture Notes', type: 'preview', time: '1 day ago' },
      ],
      recommendations: [
        { title: 'Sign up to access full documents', type: 'action' },
        { title: 'Join study groups', type: 'action' },
      ]
    },
    registered: {
      stats: [
        { label: 'Documents Downloaded', value: '47', icon: Download },
        { label: 'Study Hours', value: '28', icon: Clock },
        { label: 'Flashcards Created', value: '156', icon: Brain },
        { label: 'Study Groups', value: '3', icon: Users },
      ],
      recentActivity: [
        { title: 'Organic Chemistry Notes', type: 'download', time: '30 min ago' },
        { title: 'Machine Learning Flashcards', type: 'created', time: '2 hours ago' },
        { title: 'Physics Study Group Discussion', type: 'participated', time: '1 day ago' },
        { title: 'Statistics Exam Prep', type: 'download', time: '2 days ago' },
      ],
      recommendations: [
        { title: 'Upgrade to Premium for AI tools', type: 'upgrade' },
        { title: 'Complete Linear Algebra course', type: 'study' },
        { title: 'Join Advanced CS study group', type: 'social' },
      ]
    },
    premium: {
      stats: [
        { label: 'AI Summaries Generated', value: '89', icon: Brain },
        { label: 'Study Hours', value: '45', icon: Clock },
        { label: 'Documents Downloaded', value: '123', icon: Download },
        { label: 'Achievement Points', value: '2,450', icon: Award },
      ],
      recentActivity: [
        { title: 'Generated AI summary for Advanced Algorithms', type: 'ai', time: '15 min ago' },
        { title: 'Created quiz from Database Systems notes', type: 'ai', time: '1 hour ago' },
        { title: 'Completed Machine Learning course', type: 'achievement', time: '3 hours ago' },
        { title: 'Shared AI-generated flashcards', type: 'shared', time: '1 day ago' },
      ],
      recommendations: [
        { title: 'New AI tools available for document analysis', type: 'feature' },
        { title: 'Your study streak: 7 days! Keep going', type: 'achievement' },
        { title: 'Trending: Neural Networks study materials', type: 'trending' },
      ]
    },
    institutional: {
      stats: [
        { label: 'Students Managed', value: '1,247', icon: Users },
        { label: 'Documents Uploaded', value: '89', icon: Upload },
        { label: 'Avg. Engagement', value: '87%', icon: TrendingUp },
        { label: 'Course Completions', value: '156', icon: Award },
      ],
      recentActivity: [
        { title: 'Published CS101 course materials', type: 'upload', time: '1 hour ago' },
        { title: 'Student engagement report generated', type: 'report', time: '3 hours ago' },
        { title: 'Integration with Canvas LMS completed', type: 'integration', time: '1 day ago' },
        { title: 'Updated course curriculum for Math 200', type: 'update', time: '2 days ago' },
      ],
      recommendations: [
        { title: 'Student engagement up 15% this week', type: 'insight' },
        { title: 'New analytics features available', type: 'feature' },
        { title: 'Bulk upload tool now supports video files', type: 'update' },
      ]
    }
  };

  const currentData = mockData[user?.role || 'guest'];

  const upcomingDeadlines = [
    { course: 'Organic Chemistry', assignment: 'Lab Report #3', due: 'Tomorrow', urgent: true },
    { course: 'Statistics', assignment: 'Problem Set 7', due: 'Dec 15', urgent: false },
    { course: 'Philosophy', assignment: 'Essay: Ethics in AI', due: 'Dec 18', urgent: false },
  ];

  const studyGroups = [
    { name: 'Advanced Calculus Study Group', members: 12, nextMeeting: 'Today 3:00 PM' },
    { name: 'Computer Science Fundamentals', members: 8, nextMeeting: 'Tomorrow 7:00 PM' },
    { name: 'Organic Chemistry Lab Partners', members: 6, nextMeeting: 'Friday 2:00 PM' },
  ];

  const achievements = [
    { title: 'Study Streak Master', description: '7 days of consistent studying', earned: true },
    { title: 'Collaboration Champion', description: 'Helped 10+ students', earned: true },
    { title: 'AI Explorer', description: 'Used all AI tools', earned: user?.role === 'premium' },
    { title: 'Knowledge Sharer', description: 'Uploaded 5+ documents', earned: false },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'download': return Download;
      case 'ai': return Brain;
      case 'achievement': return Award;
      case 'shared': return Users;
      case 'upload': return BookOpen;
      case 'preview': return FileText;
      default: return Clock;
    }
  };

  if (user?.role === 'guest') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-3xl">Welcome to CyuStud</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You're browsing as a guest. Sign up to unlock the full potential of our platform 
            and access all study materials, AI tools, and collaboration features.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => setCurrentPage('signup')}>Sign Up Free</Button>
            <Button variant="outline" onClick={() => setCurrentPage('login')}>Log In</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Limited Stats */}
          {currentData.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}

          {/* Call to Action Card */}
          <Card className="md:col-span-2 lg:col-span-1 bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <Brain className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="mb-2">Unlock AI Tools</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate summaries, create flashcards, and get instant quizzes
              </p>
              <Button size="sm" onClick={() => setCurrentPage('signup')}>
                Sign Up Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Featured Content */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Featured Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Introduction to Psychology', 'Calculus I Lecture Notes', 'Physics Fundamentals'].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="text-sm">{doc}</div>
                    <div className="text-xs text-muted-foreground">Preview available</div>
                  </div>
                  <Button size="sm" variant="outline">Preview</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Study Groups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Computer Science Study Group', 'Pre-Med Study Circle', 'Engineering Fundamentals'].map((group, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="text-sm">{group}</div>
                    <div className="text-xs text-muted-foreground">{15 + index * 3} members</div>
                  </div>
                  <Button size="sm" variant="outline" disabled>
                    Join (Sign up required)
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            {user?.role === 'premium' && "Continue your premium learning journey"}
            {user?.role === 'registered' && "Ready to continue learning?"}
            {user?.role === 'institutional' && "Manage your institution's learning resources"}
          </p>
        </div>
        
        {user?.role === 'registered' && (
          <Button onClick={() => setCurrentPage('profile')} className="bg-blue-600 hover:bg-blue-700">
            Upgrade to Premium
          </Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {currentData.stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl">{stat.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentData.recentActivity.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Study Progress */}
          {user?.role !== 'institutional' && (
            <Card>
              <CardHeader>
                <CardTitle>Study Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Weekly Study Goal</span>
                      <span>18/25 hours</span>
                    </div>
                    <Progress value={72} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Course Completion</span>
                      <span>7/10 courses</span>
                    </div>
                    <Progress value={70} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Study Streak</span>
                      <span>7 days</span>
                    </div>
                    <Progress value={100} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Achievements */}
          {user?.role !== 'institutional' && (
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        achievement.earned 
                          ? 'bg-yellow-50 border-yellow-200' 
                          : 'bg-muted/50 border-muted'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className={`h-5 w-5 ${achievement.earned ? 'text-yellow-600' : 'text-muted-foreground'}`} />
                        <span className={`text-sm ${achievement.earned ? 'text-yellow-800' : 'text-muted-foreground'}`}>
                          {achievement.title}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setCurrentPage('upload')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setCurrentPage('search')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Browse Library
              </Button>
              {user?.role === 'premium' && (
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  AI Tools
                </Button>
              )}
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setCurrentPage('study-lists')}
              >
                <Users className="mr-2 h-4 w-4" />
                Study Groups
              </Button>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentData.recommendations.map((rec, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">{rec.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          {user?.role !== 'institutional' && (
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className={`p-3 rounded-lg ${deadline.urgent ? 'bg-red-50 border border-red-200' : 'bg-muted/50'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">{deadline.assignment}</p>
                          <p className="text-xs text-muted-foreground">{deadline.course}</p>
                        </div>
                        <Badge variant={deadline.urgent ? "destructive" : "secondary"}>
                          {deadline.due}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Study Groups */}
          {user?.role !== 'institutional' && (
            <Card>
              <CardHeader>
                <CardTitle>Your Study Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studyGroups.map((group, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm mb-1">{group.name}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{group.members} members</span>
                        <span>{group.nextMeeting}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { User, Settings, CreditCard, Bell, Shield, Download, Trophy, Calendar, BookOpen, Brain, Crown, Check, Zap } from 'lucide-react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';

export function Profile() {
  const { user, login } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate computer science student focused on machine learning and artificial intelligence.',
    university: 'MIT',
    year: 'Graduate Student',
    major: 'Computer Science',
    location: 'Cambridge, MA'
  });

  const [notifications, setNotifications] = useState({
    emailDigest: true,
    studyReminders: true,
    groupActivity: false,
    aiResults: true,
    weeklyReport: true,
    marketing: false
  });

  const subscriptionPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      current: user?.role === 'registered',
      features: [
        'Access to public documents',
        'Basic search functionality',
        'Join study groups',
        'Upload up to 5 documents/month',
        'Community discussions'
      ],
      limitations: [
        'No AI tools',
        'Limited premium content',
        'Basic support only'
      ]
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      current: user?.role === 'premium',
      popular: true,
      features: [
        'Everything in Free',
        'AI-powered summaries',
        'Automatic flashcard generation',
        'AI quiz creation',
        'Advanced search filters',
        'Unlimited document uploads',
        'Priority support',
        'Exclusive premium content',
        'Study analytics',
        'Export to multiple formats'
      ]
    },
    {
      name: 'Institution',
      price: 'Custom',
      period: 'pricing',
      current: user?.role === 'institutional',
      features: [
        'Everything in Premium',
        'Admin dashboard',
        'Bulk user management',
        'LMS integration',
        'Advanced analytics',
        'Custom branding',
        'Dedicated support',
        'API access',
        'Single sign-on (SSO)'
      ]
    }
  ];

  const achievements = [
    { name: 'First Upload', description: 'Uploaded your first document', earned: true, date: '2024-11-01' },
    { name: 'Study Streak', description: '7 days of consecutive studying', earned: true, date: '2024-11-15' },
    { name: 'Collaborator', description: 'Joined 5 study groups', earned: true, date: '2024-11-20' },
    { name: 'AI Explorer', description: 'Used all AI tools', earned: user?.role === 'premium', date: '2024-11-25' },
    { name: 'Knowledge Sharer', description: 'Uploaded 10+ documents', earned: false },
    { name: 'Community Helper', description: 'Helped 20+ students', earned: false },
    { name: 'Master Student', description: 'Completed 50+ study sessions', earned: false }
  ];

  const activityStats = {
    documentsDownloaded: 127,
    studyHours: 89,
    aiSummariesGenerated: user?.role === 'premium' ? 45 : 0,
    studyGroupsJoined: 8,
    documentsUploaded: 12,
    helpfulVotes: 34,
    streakDays: 7,
    monthlyGoal: 100,
    currentMonth: 73
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Update user context if needed
    if (user) {
      login({ ...user, name: profileData.name });
    }
    alert('Profile updated successfully!');
  };

  const handleUpgrade = (planName: string) => {
    if (planName === 'Premium') {
      if (user) {
        login({ ...user, role: 'premium' });
      }
      alert('Successfully upgraded to Premium!');
    } else if (planName === 'Institution') {
      alert('Please contact our sales team for institutional pricing.');
    }
  };

  const handleDowngrade = () => {
    if (user) {
      login({ ...user, role: 'registered' });
    }
    alert('Subscription cancelled. You will retain Premium features until the end of your billing period.');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="text-xl">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl">{user?.name}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
            <Badge variant={user?.role === 'premium' ? 'default' : 'secondary'} className="mt-1">
              {user?.role === 'premium' && <Crown className="h-3 w-3 mr-1" />}
              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} User
            </Badge>
          </div>
        </div>

        {user?.role === 'registered' && (
          <Button onClick={() => setActiveTab('subscription')} className="bg-blue-600 hover:bg-blue-700">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Premium
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="achievements" className="hidden lg:flex">Achievements</TabsTrigger>
          <TabsTrigger value="settings" className="hidden lg:flex">Settings</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Button 
                    variant="outline" 
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="university">University</Label>
                      <Select value={profileData.university} onValueChange={(value) => setProfileData(prev => ({ ...prev, university: value }))} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MIT">MIT</SelectItem>
                          <SelectItem value="Harvard University">Harvard University</SelectItem>
                          <SelectItem value="Stanford University">Stanford University</SelectItem>
                          <SelectItem value="UC Berkeley">UC Berkeley</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="year">Academic Year</Label>
                      <Select value={profileData.year} onValueChange={(value) => setProfileData(prev => ({ ...prev, year: value }))} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Freshman">Freshman</SelectItem>
                          <SelectItem value="Sophomore">Sophomore</SelectItem>
                          <SelectItem value="Junior">Junior</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                          <SelectItem value="Graduate Student">Graduate Student</SelectItem>
                          <SelectItem value="PhD Student">PhD Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="major">Major</Label>
                      <Input
                        id="major"
                        value={profileData.major}
                        onChange={(e) => setProfileData(prev => ({ ...prev, major: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Study Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl text-blue-600">{activityStats.documentsDownloaded}</div>
                      <div className="text-xs text-muted-foreground">Documents Downloaded</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-green-600">{activityStats.studyHours}</div>
                      <div className="text-xs text-muted-foreground">Study Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-purple-600">{activityStats.aiSummariesGenerated}</div>
                      <div className="text-xs text-muted-foreground">AI Summaries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-orange-600">{activityStats.studyGroupsJoined}</div>
                      <div className="text-xs text-muted-foreground">Study Groups</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Study Goal</span>
                      <span>{activityStats.currentMonth}/{activityStats.monthlyGoal}h</span>
                    </div>
                    <Progress value={(activityStats.currentMonth / activityStats.monthlyGoal) * 100} />
                    <p className="text-xs text-muted-foreground">
                      {activityStats.monthlyGoal - activityStats.currentMonth} hours remaining to reach your goal
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Download className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl mb-1">{activityStats.documentsDownloaded}</div>
                <div className="text-sm text-muted-foreground">Documents Downloaded</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl mb-1">{activityStats.studyHours}</div>
                <div className="text-sm text-muted-foreground">Study Hours</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl mb-1">{activityStats.aiSummariesGenerated}</div>
                <div className="text-sm text-muted-foreground">AI Summaries</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl mb-1">{activityStats.streakDays}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Downloaded', item: 'Machine Learning Algorithms Notes', time: '2 hours ago', icon: Download },
                  { action: 'Generated AI summary for', item: 'Neural Networks Chapter', time: '4 hours ago', icon: Brain },
                  { action: 'Joined study group', item: 'Advanced Calculus Study Group', time: '1 day ago', icon: BookOpen },
                  { action: 'Uploaded', item: 'Computer Vision Project Report', time: '2 days ago', icon: User },
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="text-muted-foreground">{activity.action}</span>{' '}
                          <span>{activity.item}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.current ? 'ring-2 ring-blue-600' : ''} ${plan.popular ? 'border-blue-200' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-blue-600">Most Popular</Badge>
                  </div>
                )}
                {plan.current && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">Current Plan</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl">
                    {plan.price}
                    {plan.period !== 'pricing' && (
                      <span className="text-base text-muted-foreground">/{plan.period}</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations && (
                    <div className="space-y-2 pt-4 border-t">
                      <p className="text-sm text-muted-foreground">Limitations:</p>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0">•</span>
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4">
                    {plan.current ? (
                      <>
                        {user?.role === 'premium' && (
                          <Button variant="outline" className="w-full" onClick={handleDowngrade}>
                            Cancel Subscription
                          </Button>
                        )}
                        {user?.role === 'registered' && (
                          <Button variant="outline" className="w-full" disabled>
                            Current Plan
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button 
                        className="w-full" 
                        onClick={() => handleUpgrade(plan.name)}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {plan.name === 'Institution' ? 'Contact Sales' : `Upgrade to ${plan.name}`}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {user?.role === 'premium' && (
            <Alert>
              <CreditCard className="h-4 w-4" />
              <AlertDescription>
                Your Premium subscription will renew on December 15, 2024. You can cancel anytime before then.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-digest">Email Digest</Label>
                    <p className="text-sm text-muted-foreground">Weekly summary of your activity and trending content</p>
                  </div>
                  <Switch
                    id="email-digest"
                    checked={notifications.emailDigest}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailDigest: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="study-reminders">Study Reminders</Label>
                    <p className="text-sm text-muted-foreground">Gentle reminders to maintain your study streak</p>
                  </div>
                  <Switch
                    id="study-reminders"
                    checked={notifications.studyReminders}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, studyReminders: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="group-activity">Study Group Activity</Label>
                    <p className="text-sm text-muted-foreground">Updates from your study groups and discussions</p>
                  </div>
                  <Switch
                    id="group-activity"
                    checked={notifications.groupActivity}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, groupActivity: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ai-results">AI Tool Results</Label>
                    <p className="text-sm text-muted-foreground">Notifications when AI processing is complete</p>
                  </div>
                  <Switch
                    id="ai-results"
                    checked={notifications.aiResults}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, aiResults: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-report">Weekly Progress Report</Label>
                    <p className="text-sm text-muted-foreground">Your weekly study statistics and achievements</p>
                  </div>
                  <Switch
                    id="weekly-report"
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReport: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing">Marketing Updates</Label>
                    <p className="text-sm text-muted-foreground">New features, tips, and promotional content</p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={() => alert('Notification preferences saved!')}>
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`${achievement.earned ? 'bg-yellow-50 border-yellow-200' : 'bg-muted/50'}`}>
                <CardContent className="p-6 text-center">
                  <Trophy className={`h-8 w-8 mx-auto mb-2 ${achievement.earned ? 'text-yellow-600' : 'text-muted-foreground'}`} />
                  <h3 className={`mb-1 ${achievement.earned ? 'text-yellow-800' : 'text-muted-foreground'}`}>
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                  {achievement.earned && achievement.date && (
                    <Badge variant="secondary" className="text-xs">
                      Earned {new Date(achievement.date).toLocaleDateString()}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Connected Accounts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download My Data
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                  </div>
                  <Select defaultValue="public">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Study Analytics</Label>
                    <p className="text-sm text-muted-foreground">Allow CyuStud to track your study patterns</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
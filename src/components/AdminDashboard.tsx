import React, { useState } from 'react';
import { Users, BookOpen, TrendingUp, Download, Upload, Settings, BarChart3, PieChart, Calendar, FileText, Brain, Award, ExternalLink, Plus, Search, Filter, Eye, Edit3, Trash2 } from 'lucide-react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Alert, AlertDescription } from './ui/alert';

export function AdminDashboard() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for institutional dashboard
  const institutionStats = {
    totalStudents: 1247,
    activeStudents: 892,
    totalDocuments: 234,
    downloadsThisMonth: 15692,
    aiToolUsage: 45,
    averageEngagement: 87,
    premiumUsers: 156,
    studyGroups: 34
  };

  const engagementData = [
    { subject: 'Computer Science', students: 245, documents: 67, engagement: 92 },
    { subject: 'Mathematics', students: 198, documents: 45, engagement: 89 },
    { subject: 'Physics', students: 167, documents: 38, engagement: 85 },
    { subject: 'Chemistry', students: 143, documents: 32, engagement: 88 },
    { subject: 'Biology', students: 124, documents: 28, engagement: 84 },
    { subject: 'Psychology', students: 98, documents: 24, engagement: 91 }
  ];

  const recentActivity = [
    { type: 'upload', user: 'Dr. Sarah Chen', action: 'uploaded new document', item: 'Advanced ML Algorithms', time: '2 hours ago', department: 'Computer Science' },
    { type: 'engagement', user: '156 students', action: 'accessed materials in', item: 'Organic Chemistry', time: '4 hours ago', department: 'Chemistry' },
    { type: 'integration', user: 'System', action: 'synced with Canvas for', item: 'Mathematics Department', time: '6 hours ago', department: 'Mathematics' },
    { type: 'achievement', user: 'Physics Department', action: 'reached 85% engagement rate', item: '', time: '1 day ago', department: 'Physics' }
  ];

  const facultyMembers = [
    { id: '1', name: 'Dr. Sarah Chen', email: 'schen@university.edu', department: 'Computer Science', role: 'Professor', documentsUploaded: 23, lastActive: '2 hours ago', status: 'active' },
    { id: '2', name: 'Prof. Michael Johnson', email: 'mjohnson@university.edu', department: 'Chemistry', role: 'Associate Professor', documentsUploaded: 18, lastActive: '1 day ago', status: 'active' },
    { id: '3', name: 'Dr. Emily Rodriguez', email: 'erodriguez@university.edu', department: 'Mathematics', role: 'Assistant Professor', documentsUploaded: 31, lastActive: '3 hours ago', status: 'active' },
    { id: '4', name: 'Dr. Alex Thompson', email: 'athompson@university.edu', department: 'Psychology', role: 'Professor', documentsUploaded: 12, lastActive: '2 days ago', status: 'inactive' }
  ];

  const institutionDocuments = [
    { id: '1', title: 'Advanced Machine Learning Algorithms', author: 'Dr. Sarah Chen', department: 'Computer Science', uploads: '2024-12-01', downloads: 247, views: 892, status: 'published' },
    { id: '2', title: 'Organic Chemistry Lab Manual', author: 'Prof. Michael Johnson', department: 'Chemistry', uploads: '2024-11-28', downloads: 156, views: 445, status: 'published' },
    { id: '3', title: 'Calculus II Practice Problems', author: 'Dr. Emily Rodriguez', department: 'Mathematics', uploads: '2024-12-03', downloads: 234, views: 567, status: 'published' },
    { id: '4', title: 'Research Methods in Psychology', author: 'Dr. Alex Thompson', department: 'Psychology', uploads: '2024-11-25', downloads: 89, views: 234, status: 'pending' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload': return Upload;
      case 'engagement': return Users;
      case 'integration': return Settings;
      case 'achievement': return Award;
      default: return FileText;
    }
  };

  if (user?.role !== 'institutional') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">
            This dashboard is only available for institutional partners.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Institution Dashboard</h1>
          <p className="text-muted-foreground">
            Manage resources, monitor engagement, and track analytics for your institution
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl">{institutionStats.totalStudents.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600">+12%</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Students</p>
                    <p className="text-2xl">{institutionStats.activeStudents.toLocaleString()}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600">+8%</span>
                  <span className="text-muted-foreground ml-1">engagement rate</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Documents</p>
                    <p className="text-2xl">{institutionStats.totalDocuments}</p>
                  </div>
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600">+15</span>
                  <span className="text-muted-foreground ml-1">this month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Downloads</p>
                    <p className="text-2xl">{institutionStats.downloadsThisMonth.toLocaleString()}</p>
                  </div>
                  <Download className="h-8 w-8 text-orange-600" />
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600">+23%</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Engagement */}
          <Card>
            <CardHeader>
              <CardTitle>Department Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {engagementData.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="w-24">{dept.subject}</span>
                        <span className="text-sm text-muted-foreground">
                          {dept.students} students • {dept.documents} documents
                        </span>
                      </div>
                      <span className="text-sm">{dept.engagement}%</span>
                    </div>
                    <Progress value={dept.engagement} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span>{activity.user}</span>{' '}
                          <span className="text-muted-foreground">{activity.action}</span>{' '}
                          <span>{activity.item}</span>
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{activity.time}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">{activity.department}</Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Usage Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Chart visualization would go here
                  <br />
                  (Document downloads, user engagement, etc.)
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Department Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Pie chart showing student distribution
                  <br />
                  across departments
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Tool Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Summary Generation</span>
                    <span className="text-sm text-muted-foreground">234 uses</span>
                  </div>
                  <Progress value={85} />
                  
                  <div className="flex justify-between items-center">
                    <span>Flashcard Creation</span>
                    <span className="text-sm text-muted-foreground">189 uses</span>
                  </div>
                  <Progress value={68} />
                  
                  <div className="flex justify-between items-center">
                    <span>Quiz Generation</span>
                    <span className="text-sm text-muted-foreground">156 uses</span>
                  </div>
                  <Progress value={56} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {institutionDocuments.slice(0, 4).map((doc, index) => (
                    <div key={doc.id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                      <div className="flex-1">
                        <p className="text-sm line-clamp-1">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">{doc.department}</p>
                      </div>
                      <div className="text-right text-sm">
                        <div>{doc.downloads} downloads</div>
                        <div className="text-xs text-muted-foreground">{doc.views} views</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Faculty Tab */}
        <TabsContent value="faculty" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search faculty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Faculty Member
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Faculty Member</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyMembers.map((faculty) => (
                    <TableRow key={faculty.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{faculty.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm">{faculty.name}</div>
                            <div className="text-xs text-muted-foreground">{faculty.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{faculty.department}</TableCell>
                      <TableCell>{faculty.role}</TableCell>
                      <TableCell>{faculty.documentsUploaded}</TableCell>
                      <TableCell>{faculty.lastActive}</TableCell>
                      <TableCell>
                        <Badge variant={faculty.status === 'active' ? 'secondary' : 'outline'}>
                          {faculty.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit3 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search content..."
                  className="pl-10 w-64"
                />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {institutionDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="max-w-48">
                          <div className="text-sm line-clamp-1">{doc.title}</div>
                        </div>
                      </TableCell>
                      <TableCell>{doc.author}</TableCell>
                      <TableCell>{doc.department}</TableCell>
                      <TableCell>{new Date(doc.uploads).toLocaleDateString()}</TableCell>
                      <TableCell>{doc.downloads}</TableCell>
                      <TableCell>{doc.views}</TableCell>
                      <TableCell>
                        <Badge variant={doc.status === 'published' ? 'secondary' : 'outline'}>
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Institution Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="institution-name">Institution Name</Label>
                    <Input id="institution-name" value="MIT" />
                  </div>
                  <div>
                    <Label htmlFor="domain">Email Domain</Label>
                    <Input id="domain" value="mit.edu" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value="Massachusetts Institute of Technology - Leading research university"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>LMS Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    Connect with your Learning Management System to sync courses and user data.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Canvas Integration</Label>
                      <p className="text-sm text-muted-foreground">Sync with Canvas LMS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Blackboard Integration</Label>
                      <p className="text-sm text-muted-foreground">Sync with Blackboard Learn</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Moodle Integration</Label>
                      <p className="text-sm text-muted-foreground">Sync with Moodle</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Button className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Configure Integration Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Institution Email</Label>
                    <p className="text-sm text-muted-foreground">Only allow users with @mit.edu emails</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-approve Faculty</Label>
                    <p className="text-sm text-muted-foreground">Automatically approve faculty accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Student Document Upload</Label>
                    <p className="text-sm text-muted-foreground">Allow students to upload documents</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button>Save Settings</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
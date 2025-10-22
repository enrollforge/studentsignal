'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, TrendingUp, Target, ArrowRight, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Enrollment Dashboard</h1>
          <p className="text-lg text-slate-600">
            Welcome to your StudentSignal command center
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-[rgba(0,0,0,0.05)]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-600">Total Matches</div>
                <Users className="w-5 h-5 text-slate-400" />
              </div>
              <div className="text-3xl font-semibold mb-1">2,847</div>
              <div className="text-sm text-green-600">+12% from last month</div>
            </CardContent>
          </Card>

          <Card className="border-[rgba(0,0,0,0.05)]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-600">Active Campaigns</div>
                <Target className="w-5 h-5 text-slate-400" />
              </div>
              <div className="text-3xl font-semibold mb-1">8</div>
              <div className="text-sm text-slate-600">3 ending this week</div>
            </CardContent>
          </Card>

          <Card className="border-[rgba(0,0,0,0.05)]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-600">Conversion Rate</div>
                <TrendingUp className="w-5 h-5 text-slate-400" />
              </div>
              <div className="text-3xl font-semibold mb-1">24.5%</div>
              <div className="text-sm text-green-600">+5.2% improvement</div>
            </CardContent>
          </Card>

          <Card className="border-[rgba(0,0,0,0.05)]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-600">ROI</div>
                <BarChart3 className="w-5 h-5 text-slate-400" />
              </div>
              <div className="text-3xl font-semibold mb-1">385%</div>
              <div className="text-sm text-green-600">Above target</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Matches */}
            <Card className="border-[rgba(0,0,0,0.05)]">
              <CardHeader>
                <CardTitle>Recent Student Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Johnson", score: 95, programs: ["Engineering", "Computer Science"], location: "California" },
                    { name: "Michael Chen", score: 92, programs: ["Business", "Economics"], location: "New York" },
                    { name: "Emily Rodriguez", score: 89, programs: ["Liberal Arts", "Psychology"], location: "Texas" },
                    { name: "David Kim", score: 87, programs: ["Medicine", "Biology"], location: "Massachusetts" }
                  ].map((student, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{student.name}</div>
                        <div className="text-sm text-slate-600">{student.location}</div>
                        <div className="flex gap-2 mt-2">
                          {student.programs.map((program, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-semibold text-green-600">{student.score}</div>
                        <div className="text-xs text-slate-500">Match Score</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 rounded-full" variant="outline">
                  View All Matches <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Campaign Performance */}
            <Card className="border-[rgba(0,0,0,0.05)]">
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Fall 2025 Engineering", reach: 1250, conversions: 312, status: "Active" },
                    { name: "Spring 2025 Liberal Arts", reach: 890, conversions: 201, status: "Active" },
                    { name: "Summer 2025 Business", reach: 650, conversions: 145, status: "Ending Soon" }
                  ].map((campaign, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">{campaign.name}</div>
                        <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-slate-500">Reach</div>
                          <div className="font-semibold">{campaign.reach.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Conversions</div>
                          <div className="font-semibold">{campaign.conversions}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Insights */}
            <Card className="border-[rgba(0,0,0,0.05)] bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-6 h-6 mr-2" />
                  <h4 className="text-white">AI Insights</h4>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-slate-200">Engineering programs showing 15% higher engagement this week</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-slate-200">Best time to reach students: Tuesday-Thursday, 2-4 PM</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-slate-200">Consider expanding outreach to Pacific Northwest region</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-[rgba(0,0,0,0.05)]">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full rounded-full" variant="outline">
                  Create New Campaign
                </Button>
                <Button className="w-full rounded-full" variant="outline">
                  Export Data
                </Button>
                <Button className="w-full rounded-full" variant="outline">
                  Schedule Report
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="border-[rgba(0,0,0,0.05)] bg-slate-50">
              <CardContent className="pt-6">
                <h4 className="mb-3">Need Help?</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Our team is here to help you maximize your enrollment success.
                </p>
                <Button className="w-full rounded-full" variant="default">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

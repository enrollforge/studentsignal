'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Globe, Users, GraduationCap, DollarSign, TrendingUp, 
  Building2, Heart, ExternalLink, BookOpen, Home, Briefcase,
  Award, Calendar, CheckCircle2, Loader2
} from 'lucide-react';

interface College {
  id: number;
  name: string;
  city: string;
  state: string;
  type: string;
  control: string;
  total_enrollment: number;
  undergrad_enrollment: number;
  grad_enrollment: number;
  acceptance_rate: number;
  graduation_rate: number;
  tuition_in_state: number;
  tuition_out_state: number;
  website: string;
  programs: string[];
}

export default function ProfilePage() {
  const params = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    fetchCollege();
  }, [params.id]);

  const fetchCollege = async () => {
    try {
      const response = await fetch(`/api/colleges/${params.id}`);
      const data = await response.json();
      setCollege(data);
    } catch (error) {
      console.error('Error fetching college:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">College Not Found</h1>
          <Button asChild>
            <Link href="/directory">Back to Directory</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => num.toLocaleString();
  const formatCurrency = (num: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  const sections = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'tuition', label: 'Tuition, Cost & Aid', icon: DollarSign },
    { id: 'admissions', label: 'Admissions', icon: CheckCircle2 },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'campus', label: 'Campus Life', icon: Home },
    { id: 'graduation', label: 'After Graduation', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Image */}
      <div className="h-96 bg-gradient-to-br from-blue-400 via-teal-400 to-green-400 relative">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* College Header */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              {/* Logo */}
              <div className="w-24 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-12 h-12 text-teal-600" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{college.name}</h1>
                <div className="flex items-center gap-4 text-slate-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {college.city}, {college.state}, USA
                  </div>
                  <Badge variant="secondary">{college.control}</Badge>
                  <Badge variant="secondary">{college.type}</Badge>
                </div>
                <div className="flex gap-3">
                  <Button className="rounded-full">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="rounded-full" asChild>
                    <a href={`https://${college.website}`} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    Virtual Tour
                  </Button>
                </div>
              </div>

              {/* CTA */}
              <div className="text-right">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 rounded-full px-8">
                  See My Chances
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeSection === section.id
                        ? 'bg-teal-50 text-teal-600 font-semibold border-l-4 border-teal-600'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* Overview Section */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-slate-50 rounded-lg">
                        <div className="text-3xl font-bold text-teal-600 mb-2">
                          {college.acceptance_rate}%
                        </div>
                        <div className="text-sm text-slate-600">Acceptance Rate</div>
                      </div>
                      <div className="text-center p-6 bg-slate-50 rounded-lg">
                        <div className="text-3xl font-bold text-teal-600 mb-2">
                          {formatCurrency(college.tuition_in_state)}
                        </div>
                        <div className="text-sm text-slate-600">Average Net Price</div>
                      </div>
                      <div className="text-center p-6 bg-slate-50 rounded-lg">
                        <div className="text-3xl font-bold text-teal-600 mb-2">
                          {formatNumber(college.total_enrollment)}
                        </div>
                        <div className="text-sm text-slate-600">Total Students</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-slate-600">Undergraduate Students</span>
                        <span className="font-semibold">{formatNumber(college.undergrad_enrollment)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-slate-600">Graduate Students</span>
                        <span className="font-semibold">{formatNumber(college.grad_enrollment)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-slate-600">Graduation Rate</span>
                        <span className="font-semibold">{college.graduation_rate}%</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-slate-600">Institution Type</span>
                        <span className="font-semibold">{college.control}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-slate-600">Campus Setting</span>
                        <span className="font-semibold">Urban</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Student Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Gender Distribution</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-slate-600">Female</span>
                              <span className="font-semibold">52%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-teal-600 h-2 rounded-full" style={{width: '52%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-slate-600">Male</span>
                              <span className="font-semibold">48%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{width: '48%'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Ethnic Diversity</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-teal-600">45%</div>
                            <div className="text-xs text-slate-600">White</div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-teal-600">18%</div>
                            <div className="text-xs text-slate-600">Hispanic/Latino</div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-teal-600">15%</div>
                            <div className="text-xs text-slate-600">Black/African American</div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-teal-600">12%</div>
                            <div className="text-xs text-slate-600">Asian</div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-teal-600">8%</div>
                            <div className="text-xs text-slate-600">International</div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-teal-600">2%</div>
                            <div className="text-xs text-slate-600">Other</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Geographic Diversity</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-slate-600">In-State Students</span>
                            <span className="font-semibold">35%</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-slate-600">Out-of-State Students</span>
                            <span className="font-semibold">57%</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-slate-600">International Students</span>
                            <span className="font-semibold">8%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tuition Section */}
            {activeSection === 'tuition' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Affordability & Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="p-6 bg-teal-50 rounded-lg">
                        <div className="text-sm text-slate-600 mb-2">Average Net Price</div>
                        <div className="text-3xl font-bold text-teal-600">
                          {formatCurrency(college.tuition_in_state)}
                        </div>
                        <Button className="mt-4 w-full rounded-full" variant="outline">
                          Calculate Your Net Cost
                        </Button>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-lg">
                        <div className="text-sm text-slate-600 mb-2">Financial Aid</div>
                        <div className="text-3xl font-bold">85%</div>
                        <div className="text-sm text-slate-600 mt-2">of students receive aid</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Tuition</h3>
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-slate-600">In-State Tuition</span>
                        <span className="font-semibold">{formatCurrency(college.tuition_in_state)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-slate-600">Out-of-State Tuition</span>
                        <span className="font-semibold">{formatCurrency(college.tuition_out_state)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-slate-600">Room and Board (est.)</span>
                        <span className="font-semibold">$15,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Admissions Section */}
            {activeSection === 'admissions' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Admissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="p-6 bg-slate-50 rounded-lg text-center">
                        <div className="text-4xl font-bold text-teal-600 mb-2">
                          {college.acceptance_rate}%
                        </div>
                        <div className="text-sm text-slate-600">Acceptance Rate</div>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-lg text-center">
                        <div className="text-4xl font-bold text-teal-600 mb-2">
                          {Math.floor(college.total_enrollment * 0.25).toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-600">Applications Received</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Test Scores</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-slate-600 mb-2">SAT Composite</div>
                          <div className="text-2xl font-bold">1200-1400</div>
                          <div className="text-xs text-slate-500 mt-1">Middle 50%</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-slate-600 mb-2">ACT Composite</div>
                          <div className="text-2xl font-bold">26-31</div>
                          <div className="text-xs text-slate-500 mt-1">Middle 50%</div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-semibold text-lg mb-4">Application Deadlines</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-teal-600" />
                            <div>
                              <div className="font-semibold">Early Decision</div>
                              <div className="text-sm text-slate-600">November 1</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-teal-600" />
                            <div>
                              <div className="font-semibold">Regular Decision</div>
                              <div className="text-sm text-slate-600">January 15</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Academics Section */}
            {activeSection === 'academics' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Academics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-4">Popular Majors & Programs</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {college.programs.map((program, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-4 border rounded-lg hover:border-teal-600 transition-colors">
                            <GraduationCap className="w-5 h-5 text-teal-600" />
                            <span className="font-medium">{program}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-teal-600">15:1</div>
                        <div className="text-sm text-slate-600 mt-1">Student-Faculty Ratio</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-teal-600">200+</div>
                        <div className="text-sm text-slate-600 mt-1">Degree Programs</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-teal-600">95%</div>
                        <div className="text-sm text-slate-600 mt-1">Classes Under 50</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Campus Life Section */}
            {activeSection === 'campus' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campus Life</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 bg-slate-50 rounded-lg">
                        <Home className="w-8 h-8 text-teal-600 mb-3" />
                        <h3 className="font-semibold mb-2">Housing</h3>
                        <p className="text-sm text-slate-600">On-campus housing available for all students</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-lg">
                        <Users className="w-8 h-8 text-teal-600 mb-3" />
                        <h3 className="font-semibold mb-2">Student Organizations</h3>
                        <p className="text-sm text-slate-600">300+ clubs and organizations</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-lg">
                        <Award className="w-8 h-8 text-teal-600 mb-3" />
                        <h3 className="font-semibold mb-2">Athletics</h3>
                        <p className="text-sm text-slate-600">NCAA Division I sports programs</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-lg">
                        <MapPin className="w-8 h-8 text-teal-600 mb-3" />
                        <h3 className="font-semibold mb-2">Location</h3>
                        <p className="text-sm text-slate-600">{college.city}, {college.state}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* After Graduation Section */}
            {activeSection === 'graduation' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>After Graduation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-6 bg-slate-50 rounded-lg">
                        <div className="text-3xl font-bold text-teal-600 mb-2">
                          {college.graduation_rate}%
                        </div>
                        <div className="text-sm text-slate-600">Graduation Rate</div>
                      </div>
                      <div className="text-center p-6 bg-slate-50 rounded-lg">
                        <div className="text-3xl font-bold text-teal-600 mb-2">92%</div>
                        <div className="text-sm text-slate-600">Employment Rate</div>
                      </div>
                      <div className="text-center p-6 bg-slate-50 rounded-lg">
                        <div className="text-3xl font-bold text-teal-600 mb-2">$65K</div>
                        <div className="text-sm text-slate-600">Avg Starting Salary</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Career Outcomes</h3>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <Briefcase className="w-5 h-5 text-teal-600" />
                          <span className="font-semibold">Top Employers</span>
                        </div>
                        <div className="text-sm text-slate-600">
                          Graduates work at leading companies including Fortune 500 firms, tech startups, and non-profit organizations.
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <TrendingUp className="w-5 h-5 text-teal-600" />
                          <span className="font-semibold">Graduate School</span>
                        </div>
                        <div className="text-sm text-slate-600">
                          Many graduates continue their education at top graduate and professional schools.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

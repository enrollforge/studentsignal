import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Target, TrendingUp, Users, Sparkles, BarChart3, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium">
              Powered by EnrollForge
            </div>
            <h1 className="mb-6">
              The smarter way for colleges to connect with students who fit
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              StudentSignal is the AI-powered enrollment intelligence platform that helps colleges attract and connect with qualified students more efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full text-base">
                <Link href="/signup">
                  Sign Up <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full text-base">
                <Link href="/directory">Browse Campus Directory</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-semibold mb-2">10x</div>
              <div className="text-slate-600">Faster Student Matching</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-semibold mb-2">85%</div>
              <div className="text-slate-600">Improved ROI</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-semibold mb-2">500+</div>
              <div className="text-slate-600">Partner Institutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Where Enrollment Meets Intelligence</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Transform data into actionable insights—so institutions can grow enrollment, improve ROI, and advance access for every learner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-[rgba(0,0,0,0.05)]">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="mb-3">Smart Targeting</h4>
                <p className="text-slate-600">
                  Connect with students who are the perfect fit for your institution using AI-powered matching algorithms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[rgba(0,0,0,0.05)]">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h4 className="mb-3">Data-Driven Insights</h4>
                <p className="text-slate-600">
                  Make informed decisions with clear data and practical intelligence that drives enrollment success.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[rgba(0,0,0,0.05)]">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="mb-3">Grow Enrollment</h4>
                <p className="text-slate-600">
                  Increase qualified applications and improve conversion rates with targeted outreach strategies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Colleges Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Built for College Admissions Teams</h2>
              <p className="text-lg text-slate-600 mb-8">
                StudentSignal gives you the tools to identify, engage, and enroll the right students for your institution.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Sparkles className="w-5 h-5 mr-3 mt-1 text-slate-700" />
                  <div>
                    <div className="font-semibold mb-1">AI-Powered Matching</div>
                    <div className="text-slate-600">Find students who align with your institution's values and programs</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 mr-3 mt-1 text-slate-700" />
                  <div>
                    <div className="font-semibold mb-1">Fair Access Tools</div>
                    <div className="text-slate-600">Promote equity and reach underrepresented student populations</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 mr-3 mt-1 text-slate-700" />
                  <div>
                    <div className="font-semibold mb-1">Secure & Compliant</div>
                    <div className="text-slate-600">Enterprise-grade security with full FERPA compliance</div>
                  </div>
                </li>
              </ul>
              <Button asChild size="lg" className="mt-8 rounded-full">
                <Link href="/signup">
                  Access Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-12 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <BarChart3 className="w-24 h-24 mx-auto mb-4 text-slate-700" />
                <p className="text-slate-600">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">Ready to transform your enrollment strategy?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Join hundreds of institutions using StudentSignal to connect with the right students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full text-base">
              <Link href="/contact">
                Schedule a Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full text-base">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

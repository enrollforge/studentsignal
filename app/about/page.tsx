import { Card, CardContent } from &apos;@/components/ui/card';
import { Target, Users, TrendingUp, Sparkles } from &apos;lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="mb-6">About StudentSignal</h1>
          <p className="text-xl text-slate-600">
            We&apos;re transforming how colleges and students connect through AI-powered enrollment intelligence.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card className="border-[rgba(0,0,0,0.05)]">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="mb-4">Our Mission</h3>
              <p className="text-slate-600">
                To help colleges and universities connect with the right students through clear data, practical intelligence, and fair access tools.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[rgba(0,0,0,0.05)]">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="mb-4">Our Vision</h3>
              <p className="text-slate-600">
                A world where enrollment decisions are guided by insight—not guesswork—so every student and institution can thrive together.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What We Do */}
        <div className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">What We Do</h2>
            <p className="text-lg text-slate-600">
              StudentSignal is the AI-powered enrollment intelligence platform that helps colleges attract and connect with qualified students more efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="mb-3">Smart Matching</h4>
              <p className="text-slate-600">
                Connect institutions with students who are the perfect fit using advanced AI algorithms.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h4 className="mb-3">Data Intelligence</h4>
              <p className="text-slate-600">
                Transform enrollment data into actionable insights that drive better outcomes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="mb-3">Fair Access</h4>
              <p className="text-slate-600">
                Promote equity and reach underrepresented student populations effectively.
              </p>
            </div>
          </div>
        </div>

        {/* Powered By */}
        <div className="bg-slate-50 rounded-2xl p-12 text-center">
          <h3 className="mb-4">Powered by EnrollForge</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            StudentSignal is built on EnrollForge&apos;s cutting-edge technology platform, combining artificial intelligence, data analytics, and enrollment expertise to deliver unmatched results.
          </p>
        </div>
      </div>
    </div>
  );
}

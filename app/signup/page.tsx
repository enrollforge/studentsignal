'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '', firstName: '', lastName: '', gender: '', dobMonth: '', dobDay: '', dobYear: '',
    firstGeneration: '', ethnicity: [] as string[], graduationYear: '', startTerm: '',
    collegeList: [] as number[], highSchool: '', majors: [] as string[], isUndecided: false,
    gpa: '', collegeSize: [] as string[], distanceFromHome: '', homeCity: '', homeState: '',
    homeZip: '', email: '',
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: string, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        router.push(`/dashboard/${data.studentId}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold mb-3 text-slate-900">StudentSignal™</h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`h-2 w-20 rounded-full ${step >= 1 ? 'bg-teal-500' : 'bg-slate-200'}`}></div>
            <div className={`h-2 w-20 rounded-full ${step >= 2 ? 'bg-teal-500' : 'bg-slate-200'}`}></div>
            <div className={`h-2 w-20 rounded-full ${step >= 3 ? 'bg-teal-500' : 'bg-slate-200'}`}></div>
          </div>
          <p className="text-lg text-slate-600">Step {step} of 3</p>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-8 pt-10">
            <CardTitle className="text-2xl mb-3">
              {step === 1 && "Welcome! Tell us a bit about yourself."}
              {step === 2 && "This will help us figure out where you're at on your college journey."}
              {step === 3 && "Let's personalize your recommendations."}
            </CardTitle>
            <CardDescription className="text-base">
              {step === 1 && "We'll use this information to create your personalized profile."}
              {step === 2 && "Help us understand your academic background and goals."}
              {step === 3 && "Tell us your preferences so we can find the perfect colleges for you."}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-12 pb-12 space-y-8">
            {step === 1 && (
              <>
                <div className="space-y-3">
                  <Label className="text-base font-medium">Join as a</Label>
                  <Select value={formData.userType} onValueChange={(val) => updateField('userType', val)}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select your status..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high_school_student">High School Student</SelectItem>
                      <SelectItem value="college_student">College Student</SelectItem>
                      <SelectItem value="adult_learner">Adult Learner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-base font-medium">First Name *</Label>
                    <Input className="h-12 text-base" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} placeholder="Enter first name" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Last Name *</Label>
                    <Input className="h-12 text-base" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} placeholder="Enter last name" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">Gender (Optional)</Label>
                  <Select value={formData.gender} onValueChange={(val) => updateField('gender', val)}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select gender..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non_binary">Non-Binary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">Date of Birth *</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Select value={formData.dobMonth} onValueChange={(val) => updateField('dobMonth', val)}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, i) => (
                          <SelectItem key={month} value={String(i + 1)}>{month}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input className="h-12 text-base" placeholder="Day" value={formData.dobDay} onChange={(e) => updateField('dobDay', e.target.value)} />
                    <Input className="h-12 text-base" placeholder="YYYY" value={formData.dobYear} onChange={(e) => updateField('dobYear', e.target.value)} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">Will you be the first in your immediate family to earn a four-year college degree?</Label>
                  <Select value={formData.firstGeneration} onValueChange={(val) => updateField('firstGeneration', val)}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Ethnicity</Label>
                  <div className="space-y-3 bg-slate-50 p-6 rounded-lg">
                    {['African American', 'American Indian or Native Alaskan', 'Asian or Pacific Islander', 'Hispanic-Latino', 'White', 'Other'].map(eth => (
                      <div key={eth} className="flex items-center space-x-3">
                        <Checkbox 
                          id={eth}
                          checked={formData.ethnicity.includes(eth)}
                          onCheckedChange={() => toggleArrayField('ethnicity', eth)}
                          className="h-5 w-5"
                        />
                        <label htmlFor={eth} className="text-base cursor-pointer">{eth}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-3">
                  <Label className="text-base font-medium">High School Graduation Date</Label>
                  <Select value={formData.graduationYear} onValueChange={(val) => updateField('graduationYear', val)}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select year..." />
                    </SelectTrigger>
                    <SelectContent>
                      {['2025', '2026', '2027', '2028', '2029', '2030'].map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">Expected College Start Term</Label>
                  <Select value={formData.startTerm} onValueChange={(val) => updateField('startTerm', val)}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select term..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Spring">Spring</SelectItem>
                      <SelectItem value="Summer">Summer</SelectItem>
                      <SelectItem value="Fall">Fall</SelectItem>
                      <SelectItem value="Winter">Winter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">Which high school do you attend?</Label>
                  <Input className="h-12 text-base" placeholder="Search for your high school..." value={formData.highSchool} onChange={(e) => updateField('highSchool', e.target.value)} />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">Intended Major (Select up to 5)</Label>
                  <Input className="h-12 text-base" placeholder="Search majors..." />
                  <div className="flex items-center space-x-3 pt-2">
                    <Checkbox 
                      id="undecided"
                      checked={formData.isUndecided}
                      onCheckedChange={(checked) => updateField('isUndecided', checked)}
                      className="h-5 w-5"
                    />
                    <label htmlFor="undecided" className="text-base cursor-pointer">I might also be undecided</label>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">GPA (Unweighted, out of 4.00)</Label>
                  <Input className="h-12 text-base" type="number" step="0.01" max="4.00" placeholder="e.g., 3.75" value={formData.gpa} onChange={(e) => updateField('gpa', e.target.value)} />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-4">
                  <Label className="text-base font-medium">What size college are you interested in?</Label>
                  <div className="space-y-3 bg-slate-50 p-6 rounded-lg">
                    {[{val: 'small', label: 'Small'}, {val: 'midsize', label: 'Midsize'}, {val: 'large', label: 'Large'}, {val: 'any_size', label: 'Any Size'}].map(size => (
                      <div key={size.val} className="flex items-center space-x-3">
                        <Checkbox 
                          id={size.val}
                          checked={formData.collegeSize.includes(size.val)}
                          onCheckedChange={() => toggleArrayField('collegeSize', size.val)}
                          className="h-5 w-5"
                        />
                        <label htmlFor={size.val} className="text-base cursor-pointer">{size.label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">How far do you want to be from home?</Label>
                  <Select value={formData.distanceFromHome} onValueChange={(val) => updateField('distanceFromHome', val)}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select distance..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1_hr">1 hr Drive</SelectItem>
                      <SelectItem value="3_hr">3 hr Drive</SelectItem>
                      <SelectItem value="5_hr">5 hr Drive</SelectItem>
                      <SelectItem value="any_location">Open to any location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">Where is home?</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Input className="h-12 text-base" placeholder="City" value={formData.homeCity} onChange={(e) => updateField('homeCity', e.target.value)} />
                    <Input className="h-12 text-base" placeholder="State" value={formData.homeState} onChange={(e) => updateField('homeState', e.target.value)} />
                    <Input className="h-12 text-base" placeholder="Zip" value={formData.homeZip} onChange={(e) => updateField('homeZip', e.target.value)} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">Email Address *</Label>
                  <Input className="h-12 text-base" type="email" placeholder="your.email@example.com" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
                </div>
              </>
            )}

            <div className="flex justify-between pt-8">
              {step > 1 && (
                <Button variant="outline" size="lg" onClick={() => setStep(step - 1)} className="h-12 px-8 text-base">
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
              )}
              {step < 3 ? (
                <Button size="lg" onClick={() => setStep(step + 1)} className="ml-auto h-12 px-8 text-base bg-teal-600 hover:bg-teal-700">
                  Next <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button size="lg" onClick={handleSubmit} className="ml-auto h-12 px-8 text-base bg-teal-600 hover:bg-teal-700">
                  Complete Profile <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', institution: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="mb-6">Get in Touch</h1>
          <p className="text-xl text-slate-600">
            Ready to transform your enrollment strategy? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-[rgba(0,0,0,0.05)]">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@institution.edu"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium mb-2">
                      Institution
                    </label>
                    <Input
                      id="institution"
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="Your college or university"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your enrollment goals..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-full">
                    Send Message <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-[rgba(0,0,0,0.05)]">
              <CardContent className="pt-6">
                <h4 className="mb-4">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 mt-0.5 text-slate-600" />
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Email</div>
                      <a href="mailto:hello@studentsignal.com" className="text-slate-900 hover:underline">
                        hello@studentsignal.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 mt-0.5 text-slate-600" />
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Phone</div>
                      <a href="tel:+18005551234" className="text-slate-900 hover:underline">
                        (800) 555-1234
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-slate-600" />
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Address</div>
                      <div className="text-slate-900">
                        123 Education Way<br />
                        San Francisco, CA 94102
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[rgba(0,0,0,0.05)] bg-slate-50">
              <CardContent className="pt-6">
                <h4 className="mb-3">Schedule a Demo</h4>
                <p className="text-sm text-slate-600 mb-4">
                  See StudentSignal in action with a personalized demo for your institution.
                </p>
                <Button asChild className="w-full rounded-full">
                  <a href="mailto:demo@studentsignal.com">
                    Request Demo
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, MapPin, Users, GraduationCap, Loader2, Building2, DollarSign } from 'lucide-react';

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

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [colleges, setColleges] = useState<College[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('enrollment');
  
  // Filters
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedControl, setSelectedControl] = useState<string[]>([]);

  useEffect(() => {
    fetchColleges();
  }, [searchQuery, sortBy, selectedStates, selectedTypes, selectedControl]);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search: searchQuery,
        limit: '2500',
        offset: '0'
      });
      
      const response = await fetch(`/api/colleges?${params}`);
      const data = await response.json();
      
      let filtered = data.colleges;
      
      // Apply filters
      if (selectedStates.length > 0) {
        filtered = filtered.filter((c: College) => selectedStates.includes(c.state));
      }
      if (selectedTypes.length > 0) {
        filtered = filtered.filter((c: College) => selectedTypes.includes(c.type));
      }
      if (selectedControl.length > 0) {
        filtered = filtered.filter((c: College) => selectedControl.includes(c.control));
      }
      
      // Apply sorting
      if (sortBy === 'enrollment') {
        filtered.sort((a: College, b: College) => b.total_enrollment - a.total_enrollment);
      } else if (sortBy === 'acceptance') {
        filtered.sort((a: College, b: College) => a.acceptance_rate - b.acceptance_rate);
      } else if (sortBy === 'graduation') {
        filtered.sort((a: College, b: College) => b.graduation_rate - a.graduation_rate);
      }
      
      setColleges(filtered);
      setTotal(filtered.length);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  const toggleFilter = (value: string, filterArray: string[], setFilter: (arr: string[]) => void) => {
    if (filterArray.includes(value)) {
      setFilter(filterArray.filter(item => item !== value));
    } else {
      setFilter([...filterArray, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedStates([]);
    setSelectedTypes([]);
    setSelectedControl([]);
    setSearchQuery('');
  };

  const popularStates = ['CA', 'TX', 'NY', 'FL', 'PA', 'IL', 'OH', 'MI', 'NC', 'GA'];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">College Search</h1>
          <p className="text-xl text-slate-600 max-w-3xl mb-8">
            StudentSignal makes finding and connecting with the best colleges and universities easy. Browse using our free college search engine.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search Colleges"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-white shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <Button 
                variant="ghost" 
                className="text-slate-400 hover:text-slate-600 p-0 h-auto"
                onClick={clearAllFilters}
              >
                Clear All
              </Button>

              {/* Location Filter */}
              <div>
                <h3 className="font-semibold text-teal-600 mb-3">Location</h3>
                <div className="space-y-2">
                  {popularStates.map(state => (
                    <div key={state} className="flex items-center space-x-2">
                      <Checkbox
                        id={`state-${state}`}
                        checked={selectedStates.includes(state)}
                        onCheckedChange={() => toggleFilter(state, selectedStates, setSelectedStates)}
                      />
                      <label htmlFor={`state-${state}`} className="text-sm cursor-pointer">
                        {state}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level of Institution */}
              <div>
                <h3 className="font-semibold text-teal-600 mb-3">Level of Institution</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="type-4year"
                      checked={selectedTypes.includes('4-year')}
                      onCheckedChange={() => toggleFilter('4-year', selectedTypes, setSelectedTypes)}
                    />
                    <label htmlFor="type-4year" className="text-sm cursor-pointer">
                      4 Year
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="type-2year"
                      checked={selectedTypes.includes('2-year')}
                      onCheckedChange={() => toggleFilter('2-year', selectedTypes, setSelectedTypes)}
                    />
                    <label htmlFor="type-2year" className="text-sm cursor-pointer">
                      2 Year
                    </label>
                  </div>
                </div>
              </div>

              {/* Institution Type */}
              <div>
                <h3 className="font-semibold text-teal-600 mb-3">Institution Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="control-public"
                      checked={selectedControl.includes('Public')}
                      onCheckedChange={() => toggleFilter('Public', selectedControl, setSelectedControl)}
                    />
                    <label htmlFor="control-public" className="text-sm cursor-pointer">
                      Public
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="control-private"
                      checked={selectedControl.includes('Private')}
                      onCheckedChange={() => toggleFilter('Private', selectedControl, setSelectedControl)}
                    />
                    <label htmlFor="control-private" className="text-sm cursor-pointer">
                      Private
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-600">
                {loading ? 'Loading...' : `Showing ${formatNumber(total)} Colleges`}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enrollment">Most Popular</SelectItem>
                  <SelectItem value="acceptance">Most Selective</SelectItem>
                  <SelectItem value="graduation">Highest Graduation Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
              </div>
            )}

            {/* College Grid */}
            {!loading && colleges.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {colleges.map((college) => (
                  <Card key={college.id} className="overflow-hidden hover:shadow-xl transition-shadow border-0">
                    {/* College Image/Header */}
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-teal-100 relative">
                      <div className="absolute bottom-4 left-4">
                        <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-teal-600" />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 hover:text-teal-600 transition-colors">
                        <Link href={`/profile/${college.id}`}>
                          {college.name}
                        </Link>
                      </h3>
                      
                      <div className="flex items-center text-sm text-slate-600 mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        {college.city}, {college.state}
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">{college.control}</span>
                          <Badge variant="secondary">{college.acceptance_rate}% Acceptance Rate</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-slate-500 text-xs mb-1">Avg Net Price:</div>
                            <div className="font-semibold">{formatCurrency(college.tuition_in_state)}</div>
                          </div>
                          <div>
                            <div className="text-slate-500 text-xs mb-1">Students:</div>
                            <div className="font-semibold">{formatNumber(college.total_enrollment)}</div>
                          </div>
                        </div>

                        <div className="border-t pt-3">
                          <div className="text-xs text-slate-500 mb-2">Top Programs</div>
                          <div className="flex flex-wrap gap-1">
                            {college.programs.slice(0, 3).map((program, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {program}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button asChild className="w-full">
                        <Link href={`/profile/${college.id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && colleges.length === 0 && (
              <div className="text-center py-20 bg-white rounded-lg">
                <p className="text-slate-600 text-lg mb-4">
                  No colleges found matching your criteria.
                </p>
                <Button onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

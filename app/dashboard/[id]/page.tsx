import { notFound } from 'next/navigation';
import { Pool } from 'pg';
import { Button } from '@/components/ui/button';
import { Home, Search, Heart, GraduationCap, Calendar, DollarSign, User, BookOpen, Settings, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'studentsignal_db',
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

async function getStudent(id: string) {
  const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
  return result.rows[0];
}

async function getStudentMatches(id: string) {
  const result = await pool.query(`
    SELECT c.*, sm.match_score, sm.match_reasons 
    FROM student_matches sm
    JOIN colleges c ON sm.college_id = c.id
    WHERE sm.student_id = $1 AND sm.liked IS NULL
    ORDER BY sm.match_score DESC
    LIMIT 3
  `, [id]);
  return result.rows;
}

async function getCollegeList(id: string) {
  const result = await pool.query(`
    SELECT c.* 
    FROM student_college_list scl
    JOIN colleges c ON scl.college_id = c.id
    WHERE scl.student_id = $1
    ORDER BY scl.added_at DESC
  `, [id]);
  return result.rows;
}

export default async function DashboardPage({ params }: { params: { id: string } }) {
  const student = await getStudent(params.id);
  
  if (!student) {
    notFound();
  }

  const matches = await getStudentMatches(params.id);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold">
            StudentSignal™
          </Link>
          <Button size="sm" variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Add a college to your list
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-4">
          <nav className="space-y-1">
            <Link href={`/dashboard/${params.id}`} className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-slate-100 text-slate-900">
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
            <Link href="/directory" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600">
              <Search className="w-5 h-5" />
              <span>Explore Colleges</span>
            </Link>
            <Link href={`/dashboard/${params.id}/college-list`} className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600">
              <Heart className="w-5 h-5" />
              <span>My College List</span>
            </Link>
            <Link href={`/dashboard/${params.id}/admissions`} className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600">
              <GraduationCap className="w-5 h-5" />
              <span>Direct Admissions</span>
            </Link>
            <Link href={`/dashboard/${params.id}/planner`} className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600">
              <Calendar className="w-5 h-5" />
              <span>College Planner</span>
            </Link>
            <Link href={`/dashboard/${params.id}/scholarships`} className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600">
              <DollarSign className="w-5 h-5" />
              <span>Scholarships</span>
            </Link>
            <div className="border-t border-slate-200 my-2"></div>
            <Link href={`/dashboard/${params.id}/profile`} className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            <Link href={`/dashboard/${params.id}/academics`} className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600">
              <BookOpen className="w-5 h-5" />
              <span>High School Academics</span>
            </Link>
            <Link href={`/dashboard/${params.id}/preferences`} className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-600">
              <Settings className="w-5 h-5" />
              <span>My Preferences</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Welcome Message */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold mb-2">Hi {student.first_name}</h1>
              <p className="text-slate-600">👋 Welcome to your college journey.</p>
            </div>

            {/* Today&apos;s Matches */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Today&apos;s Matches</h2>
                  <p className="text-sm text-slate-600">Like or dismiss to improve your results.</p>
                </div>
              </div>
              
              {matches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {matches.map((college) => (
                    <Card key={college.id} className="overflow-hidden">
                      <div className="h-32 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <Building2 className="w-12 h-12 text-slate-600" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{college.name}</h3>
                        <p className="text-sm text-slate-600 mb-2">{college.city}, {college.state}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
                            {college.match_score}% Match
                          </span>
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/profile/${college.id}`}>View</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-slate-600">That&apos;s all for now. Check back later for more matches.</p>
                  </CardContent>
                </Card>
              )}
            </section>

            {/* Take Action */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Take action</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <User className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Complete your profile</h3>
                    <p className="text-sm text-slate-600 mb-4">Finish your profile to improve your recommendations.</p>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Heart className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Add more schools to your college list</h3>
                    <p className="text-sm text-slate-600 mb-4">Explore and add more schools and their list.</p>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                      <Calendar className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Start your college plan</h3>
                    <p className="text-sm text-slate-600 mb-4">Know exactly what to do at each stage to prep for search.</p>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Campus Tours */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Campus tours for you</h2>
                <Link href="/directory" className="text-sm text-teal-600 hover:text-teal-700">
                  See more »
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-slate-700" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Virtual Campus Tour</h3>
                    <p className="text-sm text-slate-600">Explore colleges from home</p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-slate-700" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Virtual Campus Tour</h3>
                    <p className="text-sm text-slate-600">Explore colleges from home</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

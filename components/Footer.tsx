import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-[rgba(0,0,0,0.05)] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="font-semibold text-lg mb-4">
              StudentSignal<span className="text-xs align-super">™</span>
            </div>
            <p className="text-sm text-slate-600">
              Where Enrollment Meets Intelligence
            </p>
            <p className="text-xs text-slate-500 mt-4">
              Powered by EnrollForge
            </p>
          </div>

          {/* Product */}
          <div>
            <h6 className="font-semibold text-sm mb-4">Product</h6>
            <ul className="space-y-2">
              <li>
                <Link href="/#how-it-works" className="text-sm text-slate-600 hover:text-slate-900">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-sm text-slate-600 hover:text-slate-900">
                  Campus Directory
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className="font-semibold text-sm mb-4">Company</h6>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h6 className="font-semibold text-sm mb-4">Legal</h6>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[rgba(0,0,0,0.05)] text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} StudentSignal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

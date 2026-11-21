
import Link from "next/link";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  BookOpen,
} from "lucide-react";

const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Tuitions", href: "/browse-tuitions" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
];

const studentLinks = [
  { label: "Find a Tutor", href: "/browse-tuitions" },
  { label: "My Applications", href: "/dashboard/student/applications" },
  { label: "My Profile", href: "/dashboard/student/profile" },
];

const tutorLinks = [
  { label: "Post a Tuition", href: "/dashboard/tutor/add-tuition" },
  { label: "Manage Tuitions", href: "/dashboard/tutor/tuitions" },
  { label: "My Students", href: "/dashboard/tutor/applications" },
];

export default function Footer() {
  return (
    <footer className="bg-[#101D36] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="bg-[#087F9F] p-2 rounded-xl">
                <GraduationCap size={27} />
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Mentor<span className="text-[#087F9F]">Lagbe</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-7 mt-5 max-w-sm">
              Making quality education accessible to everyone.
              Find the right tutor, explore tuition opportunities,
              and build a brighter future with MentorLagbe.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#087F9F] flex items-center justify-center transition"
              >
                <span className="font-bold text-lg">f</span>
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#087F9F] flex items-center justify-center transition"
              >
                <span className="font-bold text-xl">◎</span>
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#087F9F] flex items-center justify-center transition"
              >
                <span className="font-bold text-sm">in</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#087F9F] transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Students */}
          <div>
            <h3 className="text-base font-bold mb-6">
              For Students
            </h3>

            <ul className="space-y-4">
              {studentLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#087F9F] transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tutors */}
          <div>
            <h3 className="text-base font-bold mb-6">
              For Tutors
            </h3>

            <ul className="space-y-4">
              {tutorLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#087F9F] transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid sm:grid-cols-3 gap-5 mt-14 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#087F9F]/20 text-[#087F9F] flex items-center justify-center">
              <Mail size={19} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Email Us</p>
              <p className="text-sm font-medium mt-1">
                support@mentorlagbe.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#087F9F]/20 text-[#087F9F] flex items-center justify-center">
              <Phone size={19} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Call Us</p>
              <p className="text-sm font-medium mt-1">
                +880 1XXX-XXXXXX
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#087F9F]/20 text-[#087F9F] flex items-center justify-center">
              <MapPin size={19} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Our Location</p>
              <p className="text-sm font-medium mt-1">
                Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 mt-10 pt-7 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-sm text-slate-400 text-center">
            © {currentYear} MentorLagbe. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-[#087F9F] transition">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-[#087F9F] transition">
              Terms of Service
            </Link>

            <Link href="/contact" className="hover:text-[#087F9F] transition">
              Contact
            </Link>
          </div>

          <p className="text-sm text-slate-400 flex items-center gap-1">
            Made for better learning
            <BookOpen size={15} className="text-[#087F9F]" />
          </p>
        </div>
      </div>
    </footer>
  );
}

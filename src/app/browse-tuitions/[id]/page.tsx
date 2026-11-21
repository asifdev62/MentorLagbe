
import { Suspense } from "react";
import { getTuitionById } from "@/lib/api/tuitions";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/navbar";
import {
  MapPin,
  BookOpen,
  GraduationCap,
  CalendarDays,
  Clock,
  Wallet,
  Users,
  Building2,
  BriefcaseBusiness,
  CalendarCheck,
  ArrowLeft,
  UserRound,
  BadgeCheck,
  School,
  Info,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import TuitionApplyButton from "../TuitionApplyButton";

type Props = {
  params: Promise<{ id: string }>;
};

const formatValue = (value: unknown, fallback = "Not specified") => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  return String(value);
};

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-start gap-3 py-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#087F9F]/5 text-[#087F9F]">
      <Icon size={19} strokeWidth={1.8} />
    </div>

    <div className="min-w-0">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  </div>
);

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) => (
  <div className="mb-6 flex items-start gap-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087F9F]/5 text-[#087F9F]">
      <Icon size={21} />
    </div>

    <div>
      <h2 className="text-lg font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  </div>
);

const Requirement = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-0">
    <span className="text-sm text-slate-500">{label}</span>
    <span className="text-right text-sm font-semibold text-slate-800">
      {value}
    </span>
  </div>
);

const TuitionDetailsContent = async ({ params }: Props) => {
  const { id } = await params;
  const tuition = await getTuitionById(id);

  if (!tuition) notFound();

  const budget = Number(tuition.budget || 0);

  const postedDate = tuition.createdAt
    ? new Date(tuition.createdAt).toLocaleDateString("en-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Recently";

  const isActive =
    !tuition.status ||
    String(tuition.status).toLowerCase() === "active";

  return (
    <main className="min-h-screen bg-[#F7F9FC] pb-16">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-10">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link
            href="/browse-tuitions"
            className="flex items-center gap-1.5 font-medium text-slate-500 transition hover:text-[#087F9F]"
          >
            <ArrowLeft size={16} />
            Browse Tuitions
          </Link>

          <ChevronRight size={15} className="text-slate-300" />

          <span className="font-medium text-slate-800">
            Tuition Details
          </span>
        </div>

        {/* Main Heading */}
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">

          <div className="p-5 sm:p-8">

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? "bg-emerald-500" : "bg-slate-400"
                  }`}
                />
                {formatValue(tuition.status, "Active")}
              </span>

              <span className="rounded-full bg-[#087F9F]/5 px-3 py-1.5 text-xs font-semibold text-[#087F9F]">
                {formatValue(tuition.tuitionType, "Home Tuition")}
              </span>
            </div>

            <h1 className="mt-5 max-w-3xl text-2xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              {tuition.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">

              <span className="flex items-center gap-2">
                <MapPin size={17} className="text-[#087F9F]" />
                {formatValue(tuition.area, "Area not specified")},{" "}
                {formatValue(tuition.district, "District not specified")}
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays size={17} className="text-[#087F9F]" />
                Posted {postedDate}
              </span>
            </div>

            {/* Salary */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-5 rounded-xl border border-[#087F9F]/20 bg-[#087F9F]/5 p-5 sm:p-6">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Monthly Salary
                </p>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-[#087F9F]">
                    ৳{budget.toLocaleString("en-BD")}
                  </span>
                  <span className="text-sm text-slate-500">/ month</span>
                </div>

                {tuition.negotiable && (
                  <p className="mt-1 text-xs font-medium text-emerald-600">
                    Salary is negotiable
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                <Wallet size={18} className="text-[#087F9F]" />
                Monthly Payment
              </div>

            </div>
          </div>

          {/* Quick Information */}
          <div className="grid grid-cols-2 border-t border-slate-100 bg-white sm:grid-cols-4">

            {[
              {
                label: "Class / Level",
                value: formatValue(tuition.classLevel),
                icon: GraduationCap,
              },
              {
                label: "Subject",
                value: formatValue(tuition.subject),
                icon: BookOpen,
              },
              {
                label: "Students",
                value: formatValue(tuition.studentCount),
                icon: Users,
              },
              {
                label: "Days / Week",
                value: formatValue(tuition.daysPerWeek),
                icon: CalendarDays,
              },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 p-4 sm:p-5 ${
                  index % 2 === 0 ? "bg-slate-50/70" : "bg-white"
                } ${index < 2 ? "border-b sm:border-b-0" : ""} ${
                  index !== 3 ? "sm:border-r sm:border-slate-100" : ""
                }`}
              >
                <item.icon
                  size={20}
                  className="shrink-0 text-[#087F9F]"
                />

                <div className="min-w-0">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="mt-1 truncate text-sm font-bold text-slate-800">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Content Grid */}
        <div className="mt-7 grid items-start gap-7 lg:grid-cols-3">

          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">

            {/* Tuition Information */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">

              <SectionHeader
                icon={BookOpen}
                title="Tuition Information"
                subtitle="Academic details about this tuition"
              />

              <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">

                <div className="sm:pr-6">
                  <InfoItem
                    icon={GraduationCap}
                    label="Class / Level"
                    value={formatValue(tuition.classLevel)}
                  />

                  <InfoItem
                    icon={BookOpen}
                    label="Subject"
                    value={formatValue(tuition.subject)}
                  />

                  <InfoItem
                    icon={Building2}
                    label="Medium"
                    value={formatValue(tuition.medium)}
                  />
                </div>

                <div className="sm:pl-6">
                  <InfoItem
                    icon={Users}
                    label="Number of Students"
                    value={formatValue(tuition.studentCount)}
                  />

                  <InfoItem
                    icon={UserRound}
                    label="Student Gender"
                    value={formatValue(tuition.studentGender)}
                  />

                  <InfoItem
                    icon={School}
                    label="Institution"
                    value={formatValue(tuition.institution)}
                  />
                </div>
              </div>
            </section>

            {/* Schedule */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">

              <SectionHeader
                icon={CalendarDays}
                title="Class Schedule"
                subtitle="Preferred days and teaching time"
              />

              <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">

                <div className="sm:pr-6">
                  <InfoItem
                    icon={CalendarCheck}
                    label="Preferred Days"
                    value={formatValue(tuition.preferredDays, "Flexible")}
                  />

                  <InfoItem
                    icon={CalendarDays}
                    label="Days Per Week"
                    value={formatValue(tuition.daysPerWeek)}
                  />
                </div>

                <div className="sm:pl-6">
                  <InfoItem
                    icon={Clock}
                    label="Preferred Time"
                    value={formatValue(tuition.preferredTime, "Flexible")}
                  />

                  <InfoItem
                    icon={BriefcaseBusiness}
                    label="Tuition Duration"
                    value={formatValue(tuition.duration)}
                  />
                </div>
              </div>
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">

              <SectionHeader
                icon={MapPin}
                title="Teaching Location"
                subtitle="Where the tutor needs to teach"
              />

              <div className="rounded-xl bg-[#087F9F]/5 p-4 sm:p-5">

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-white p-3 text-[#087F9F] shadow-sm">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#087F9F]">
                      Tuition Address
                    </p>

                    <p className="mt-1 text-base font-bold text-slate-900">
                      {formatValue(tuition.area, "Area not specified")}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {formatValue(tuition.district, "District not specified")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <InfoItem
                  icon={MapPin}
                  label="Nearby Landmark"
                  value={formatValue(tuition.landmark)}
                />

                <InfoItem
                  icon={Building2}
                  label="Institution"
                  value={formatValue(tuition.institution)}
                />
              </div>
            </section>

            {/* Description */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">

              <SectionHeader
                icon={Info}
                title="Tuition Description"
                subtitle="Additional information from the tuition poster"
              />

              <p className="whitespace-pre-line text-sm leading-8 text-slate-600">
                {tuition.description || "No additional description provided."}
              </p>
            </section>

          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-6">

            {/* Tutor Requirements */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">

              <SectionHeader
                icon={BadgeCheck}
                title="Tutor Requirements"
                subtitle="What the guardian is looking for"
              />

              <div>
                <Requirement
                  label="Preferred Gender"
                  value={formatValue(tuition.tutorGender, "Any")}
                />

                <Requirement
                  label="University"
                  value={formatValue(tuition.tutorUniversity, "Any")}
                />

                <Requirement
                  label="Department"
                  value={formatValue(tuition.tutorDepartment, "Any")}
                />

                <Requirement
                  label="Experience"
                  value={formatValue(tuition.experience, "Not specified")}
                />
              </div>
            </section>

            {/* Apply Card */}
            <section className="overflow-hidden rounded-2xl border border-[#087F9F]/20 bg-white shadow-sm">

              <div className="bg-gradient-to-br from-[#087F9F] to-[#066B85] p-6 text-white">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <Sparkles size={22} />
                </div>

                <h2 className="mt-4 text-xl font-bold">
                  Interested in this tuition?
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/85">
                  Think you are a good match? Get ready to apply for this teaching opportunity.
                </p>
              </div>

              <div className="p-5 sm:p-6">

                <div className="mb-5 flex items-start gap-3 rounded-xl bg-emerald-50 p-3.5">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <p className="text-xs leading-5 text-emerald-800">
                    Carefully review the requirements before applying.
                  </p>
                </div>

                <TuitionApplyButton
                  tuitionId={tuition._id ?? id}
                  tuitionTitle={tuition.title}
                  classLevel={tuition.classLevel}
                  tutorEmail={tuition.tutorEmail || ""}
                />

                <p className="mt-3 text-center text-xs text-slate-400">
                  Your application will be sent to the tuition poster.
                </p>

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <p className="text-xs font-semibold text-slate-500">
                    Monthly Salary
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-slate-900">
                    ৳{budget.toLocaleString("en-BD")}
                    <span className="ml-1 text-xs font-medium text-slate-400">
                      / month
                    </span>
                  </p>
                </div>

              </div>
            </section>

            {/* Summary */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">

              <h3 className="font-bold text-slate-900">
                Tuition Summary
              </h3>

              <div className="mt-4 space-y-4 text-sm">

                <Requirement
                  label="Tuition Type"
                  value={formatValue(tuition.tuitionType, "Home Tuition")}
                />

                <Requirement
                  label="Salary Negotiable"
                  value={tuition.negotiable ? "Yes" : "No"}
                />

                <Requirement
                  label="Status"
                  value={formatValue(tuition.status, "Active")}
                />

                <Requirement
                  label="Posted"
                  value={postedDate}
                />

              </div>
            </section>

          </aside>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 border-t border-slate-200 pt-6">
          <Link
            href="/browse-tuitions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#087F9F] transition hover:text-[#066B85]"
          >
            <ArrowLeft size={17} />
            Explore More Tuitions
          </Link>
        </div>

      </div>
    </main>
  );
};

const TuitionDetailsPage = ({ params }: Props) => {
  return (
    <>
      <Navbar />

      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#087F9F]/20 border-t-[#087F9F]" />
              <p className="mt-4 text-sm font-medium text-slate-500">
                Loading tuition details...
              </p>
            </div>
          </div>
        }
      >
        <TuitionDetailsContent params={params} />
      </Suspense>
    </>
  );
};

export default TuitionDetailsPage;

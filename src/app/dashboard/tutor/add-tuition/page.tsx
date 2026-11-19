"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";
import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
    Check,
    ChevronDown,
    CircleDollarSign,
    Clock,
    FileText,
    GraduationCap,
    Home,
    Info,
    Laptop,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    Sparkles,
    UserRound,
    Users,
    Wallet,
} from "lucide-react";
import { addTuitions, type TuitionFormData } from "@/lib/actions/tuitions";
import { useSession } from "@/lib/auth-client";

const inputClass =
    "h-11 w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

const selectClass =
    "h-11 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50/70 px-3 pr-9 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

const classes = [
    "Play - Class 5",
    "Class 6 - 8",
    "Class 9 - 10",
    "Class 11 - 12",
    "Admission Test",
    "University Level",
    "Other",
];

const mediums = [
    "Bangla Medium",
    "English Medium",
    "English Version",
    "Madrasha",
];

const weekDays = [
    { label: "Sat", value: "sat", checked: true },
    { label: "Sun", value: "sun", checked: true },
    { label: "Mon", value: "mon", checked: false },
    { label: "Tue", value: "tue", checked: true },
    { label: "Wed", value: "wed", checked: false },
    { label: "Thu", value: "thu", checked: true },
    { label: "Fri", value: "fri", checked: false },
];

const tuitionTypes = [
    {
        value: "home",
        title: "Home Visit",
        description: "You teach at the student's home",
        icon: Home,
        checked: true,
    },
    {
        value: "online",
        title: "Online",
        description: "You take classes online",
        icon: Laptop,
        checked: false,
    },
    {
        value: "batch",
        title: "Group / Batch",
        description: "You teach multiple students together",
        icon: Users,
        checked: false,
    },
];

const tips = [
    "Write a clear title so students understand what you teach quickly.",
    "Mention the area you can travel to, plus your preferred days and time.",
    "A realistic monthly fee helps students decide faster.",
    "Add your qualification, experience and teaching style in the description.",
];

function FormSection({
    icon: Icon,
    title,
    description,
    children,
}: {
    icon: LucideIcon;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40 md:p-6">
            <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={19} />
                </div>

                <div>
                    <h2 className="text-base font-bold text-slate-900">{title}</h2>
                    <p className="mt-0.5 text-xs text-slate-500">{description}</p>
                </div>
            </div>

            <div className="mt-5">{children}</div>
        </section>
    );
}

function SelectWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            {children}
            <ChevronDown
                size={16}
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
            />
        </div>
    );
}



export default function AddTuitionPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!session?.user) {
      toast.error("Please sign in before posting a tuition.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const whatsappSameAsContact = formData.has(
      "whatsappSameAsContact"
    );

    const tuitionData = {
      ...Object.fromEntries(formData),
      studentGender: String(formData.get("studentGender") ?? "Any"),
      tutorGender: String(formData.get("tutorGender") ?? "Any"),
      studentCount: Number(formData.get("studentCount") ?? 1),
      budget: Number(formData.get("budget") ?? 0),
      preferredDays: formData.getAll("preferredDays").map(String),
      negotiable: formData.has("negotiable"),
      whatsappSameAsContact,
      whatsapp: whatsappSameAsContact
        ? String(formData.get("contactNumber") ?? "")
        : String(formData.get("whatsapp") ?? ""),
      // Link the post to the signed-in tutor so it appears in
      // "Manage Tuitions" for this account only.
      userId: session.user.id,
      tutorEmail: session.user.email,
    } as TuitionFormData;

    try {
      setIsSubmitting(true);

      await addTuitions(tuitionData);

      toast.success("Tuition posted successfully! Waiting for admin approval.");

      router.push("/dashboard/tutor/manage-tuition");
    } catch (error) {
      console.error("Failed to add tuition:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to post tuition"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
    return (
        <div className="min-h-svh bg-[#F4F7FC] px-4 py-6 md:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Page header */}
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <Link
                            href="/dashboard/tutor"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
                        >
                            <ArrowLeft size={16} />
                            Back to dashboard
                        </Link>

                        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                            Post Your Tuition
                        </h1>

                        <p className="mt-1.5 text-sm text-slate-500">
                            Share your tutoring details so students can find you and apply.
                        </p>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
                        <Sparkles size={14} />
                        New Tuition Post
                    </span>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"
                >
                    {/* Main form */}
                    <div className="space-y-6">
                        {/* Basic information */}
                        <FormSection
                            icon={FileText}
                            title="Basic Information"
                            description="Tell students what you teach and how you like to teach."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label htmlFor="title" className={labelClass}>
                                        Tuition Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        required
                                        placeholder="e.g. Math & Physics tutor for Class 9-10 students"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="classLevel" className={labelClass}>
                                        Class / Level <span className="text-red-500">*</span>
                                    </label>
                                    <SelectWrapper>
                                        <select
                                            id="classLevel"
                                            name="classLevel"
                                            required
                                            defaultValue=""
                                            className={selectClass}
                                        >
                                            <option value="" disabled>
                                                Select class or level
                                            </option>
                                            {classes.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </SelectWrapper>
                                </div>

                                <div>
                                    <label htmlFor="subject" className={labelClass}>
                                        Subject(s) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        placeholder="e.g. Mathematics, Physics"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="medium" className={labelClass}>
                                        Medium / Curriculum
                                    </label>
                                    <SelectWrapper>
                                        <select
                                            id="medium"
                                            name="medium"
                                            defaultValue="Bangla Medium"
                                            className={selectClass}
                                        >
                                            {mediums.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </SelectWrapper>
                                </div>

                                <div>
                                    <label htmlFor="tutorGender" className={labelClass}>
                                        Your Gender
                                    </label>
                                    <SelectWrapper>
                                        <select
                                            id="tutorGender"
                                            name="tutorGender"
                                            defaultValue="Any"
                                            className={selectClass}
                                        >
                                            <option value="Any">Prefer not to say</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </SelectWrapper>
                                </div>

                                <div>
                                    <label htmlFor="experience" className={labelClass}>
                                        Teaching Experience
                                    </label>
                                    <SelectWrapper>
                                        <select
                                            id="experience"
                                            name="experience"
                                            defaultValue="1+ years"
                                            className={selectClass}
                                        >
                                            <option value="No experience">No experience</option>
                                            <option value="1+ years">1+ years</option>
                                            <option value="2+ years">2+ years</option>
                                            <option value="3+ years">3+ years</option>
                                            <option value="5+ years">5+ years</option>
                                        </select>
                                    </SelectWrapper>
                                </div>

                                <div>
                                    <label htmlFor="studentCount" className={labelClass}>
                                        Students per Batch
                                    </label>
                                    <input
                                        id="studentCount"
                                        name="studentCount"
                                        type="number"
                                        min={1}
                                        defaultValue={1}
                                        className={inputClass}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <span className={labelClass}>Tuition Type</span>

                                    <div className="grid gap-3 sm:grid-cols-3">
                                        {tuitionTypes.map((type) => {
                                            const Icon = type.icon;

                                            return (
                                                <label
                                                    key={type.value}
                                                    className="group flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-blue-300 has-checked:border-blue-600 has-checked:bg-blue-50/60 has-checked:ring-2 has-checked:ring-blue-500/10"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="tuitionType"
                                                        value={type.value}
                                                        defaultChecked={type.checked}
                                                        className="sr-only"
                                                    />

                                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-has-checked:bg-blue-100 group-has-checked:text-blue-700">
                                                        <Icon size={18} />
                                                    </span>

                                                    <span className="min-w-0 flex-1">
                                                        <span className="block text-sm font-bold text-slate-800">
                                                            {type.title}
                                                        </span>
                                                        <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">
                                                            {type.description}
                                                        </span>
                                                    </span>

                                                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-slate-300 text-transparent group-has-checked:border-blue-600 group-has-checked:bg-blue-600 group-has-checked:text-white">
                                                        <Check size={12} />
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </FormSection>

                        {/* Qualification */}
                        <FormSection
                            icon={GraduationCap}
                            title="Your Qualification"
                            description="Students love to know where you study or studied."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="tutorUniversity" className={labelClass}>
                                        University / Institution
                                    </label>
                                    <input
                                        id="tutorUniversity"
                                        name="tutorUniversity"
                                        type="text"
                                        placeholder="e.g. University of Dhaka"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="tutorDepartment" className={labelClass}>
                                        Department / Major
                                    </label>
                                    <input
                                        id="tutorDepartment"
                                        name="tutorDepartment"
                                        type="text"
                                        placeholder="e.g. Computer Science & Engineering"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </FormSection>

                        {/* Location & schedule */}
                        <FormSection
                            icon={MapPin}
                            title="Location & Schedule"
                            description="Set where and when you can take classes."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label htmlFor="area" className={labelClass}>
                                        Area / Location <span className="text-red-500">*</span>
                                    </label>

                                    <div className="relative">
                                        <MapPin
                                            size={17}
                                            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            id="area"
                                            name="area"
                                            type="text"
                                            required
                                            placeholder="e.g. Dhanmondi, Dhaka (area you can teach in)"
                                            className={`${inputClass} pl-10`}
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <span className={labelClass}>Preferred Days</span>

                                    <div className="flex flex-wrap gap-2">
                                        {weekDays.map((day) => (
                                            <label
                                                key={day.value}
                                                className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-600 transition select-none has-checked:border-blue-600 has-checked:bg-blue-50 has-checked:text-blue-700"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="preferredDays"
                                                    value={day.value}
                                                    defaultChecked={day.checked}
                                                    className="sr-only"
                                                />
                                                {day.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="preferredTime" className={labelClass}>
                                        Preferred Time
                                    </label>
                                    <SelectWrapper>
                                        <select
                                            id="preferredTime"
                                            name="preferredTime"
                                            defaultValue="Evening"
                                            className={selectClass}
                                        >
                                            <option value="Morning">Morning (6 AM - 12 PM)</option>
                                            <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
                                            <option value="Evening">Evening (5 PM - 9 PM)</option>
                                            <option value="Flexible">Flexible</option>
                                        </select>
                                    </SelectWrapper>
                                </div>

                                <div>
                                    <label htmlFor="duration" className={labelClass}>
                                        Class Duration
                                    </label>
                                    <SelectWrapper>
                                        <select
                                            id="duration"
                                            name="duration"
                                            defaultValue="1 hour"
                                            className={selectClass}
                                        >
                                            <option value="1 hour">1 hour</option>
                                            <option value="1.5 hours">1.5 hours</option>
                                            <option value="2 hours">2 hours</option>
                                            <option value="3 hours">3 hours</option>
                                        </select>
                                    </SelectWrapper>
                                </div>

                                <div>
                                    <label htmlFor="daysPerWeek" className={labelClass}>
                                        Classes per Week
                                    </label>
                                    <SelectWrapper>
                                        <select
                                            id="daysPerWeek"
                                            name="daysPerWeek"
                                            defaultValue="3 days"
                                            className={selectClass}
                                        >
                                            <option value="1 day">1 day</option>
                                            <option value="2 days">2 days</option>
                                            <option value="3 days">3 days</option>
                                            <option value="4 days">4 days</option>
                                            <option value="5 days">5 days</option>
                                            <option value="6 days">6 days</option>
                                        </select>
                                    </SelectWrapper>
                                </div>
                            </div>
                        </FormSection>

                        {/* Fee & details */}
                        <FormSection
                            icon={Wallet}
                            title="Fee & Details"
                            description="Set your expected fee and share anything students should know."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="budget" className={labelClass}>
                                        Expected Monthly Fee <span className="text-red-500">*</span>
                                    </label>

                                    <div className="relative">
                                        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-bold text-slate-500">
                                            ৳
                                        </span>
                                        <input
                                            id="budget"
                                            name="budget"
                                            type="number"
                                            min={0}
                                            required
                                            placeholder="e.g. 6000"
                                            className={`${inputClass} pl-8`}
                                        />
                                    </div>

                                    <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                                        <input
                                            type="checkbox"
                                            name="negotiable"
                                            className="size-4 rounded border-slate-300 accent-blue-600"
                                        />
                                        Fee is negotiable
                                    </label>
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="description" className={labelClass}>
                                        About You & Your Teaching
                                    </label>

                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        placeholder="Write about your teaching style, syllabus coverage, results, or anything students should know..."
                                        className="w-full resize-y rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                    />

                                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400">
                                        <Info size={13} />
                                        Maximum 500 characters.
                                    </p>
                                </div>
                            </div>
                        </FormSection>

                        {/* Contact */}
                        <FormSection
                            icon={Phone}
                            title="Contact Information"
                            description="Students will use this information to contact you."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="contactNumber" className={labelClass}>
                                        Contact Number <span className="text-red-500">*</span>
                                    </label>

                                    <div className="relative">
                                        <Phone
                                            size={17}
                                            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            id="contactNumber"
                                            name="contactNumber"
                                            type="tel"
                                            required
                                            placeholder="+880 1XXX-XXXXXX"
                                            className={`${inputClass} pl-10`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="whatsapp" className={labelClass}>
                                        WhatsApp Number
                                    </label>

                                    <div className="relative">
                                        <MessageCircle
                                            size={17}
                                            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            id="whatsapp"
                                            name="whatsapp"
                                            type="tel"
                                            placeholder="+880 1XXX-XXXXXX"
                                            className={`${inputClass} pl-10`}
                                        />
                                    </div>

                                    <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                                        <input
                                            type="checkbox"
                                            name="whatsappSameAsContact"
                                            defaultChecked
                                            className="size-4 rounded border-slate-300 accent-blue-600"
                                        />
                                        Same as contact number
                                    </label>
                                </div>
                            </div>
                        </FormSection>

                        {/* Actions */}
                        <div className="flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40 sm:flex-row sm:items-center sm:justify-between">
                            <Link
                                href="/dashboard/tutor/manage-tuition"
                                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Send size={16} />
                                {isSubmitting ? "Publishing..." : "Publish Tuition"}
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-4 lg:sticky lg:top-6">
                        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
                            <div className="flex items-center gap-2 text-blue-700">
                                <Sparkles size={18} />
                                <h2 className="text-sm font-bold">Tips for a great post</h2>
                            </div>

                            <ul className="mt-4 space-y-3">
                                {tips.map((tip) => (
                                    <li key={tip} className="flex gap-2.5 text-sm leading-5 text-slate-600">
                                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                                            <Check size={10} />
                                        </span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="flex items-center gap-2 text-slate-800">
                                <GraduationCap size={18} className="text-blue-600" />
                                <h2 className="text-sm font-bold">Posting Summary</h2>
                            </div>

                            <dl className="mt-4 space-y-3 text-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="flex items-center gap-2 text-slate-500">
                                        <BookOpen size={15} />
                                        Status
                                    </dt>
                                    <dd className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                                        Pending approval
                                    </dd>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <dt className="flex items-center gap-2 text-slate-500">
                                        <CalendarDays size={15} />
                                        Days per week
                                    </dt>
                                    <dd className="font-semibold text-slate-700">3 days</dd>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <dt className="flex items-center gap-2 text-slate-500">
                                        <Clock size={15} />
                                        Class duration
                                    </dt>
                                    <dd className="font-semibold text-slate-700">1 hour</dd>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <dt className="flex items-center gap-2 text-slate-500">
                                        <CircleDollarSign size={15} />
                                        Expected fee
                                    </dt>
                                    <dd className="font-semibold text-slate-700">Not set</dd>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <dt className="flex items-center gap-2 text-slate-500">
                                        <UserRound size={15} />
                                        Posting as
                                    </dt>
                                    <dd className="max-w-[140px] truncate font-semibold text-slate-700">
                                        {session?.user?.name || "Tutor"}
                                    </dd>
                                </div>
                            </dl>

                            <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">
                                Your post will be visible to students after admin approval.
                                You can edit or close it anytime from Manage Tuitions.
                            </p>
                        </div>

                        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                            <UserRound size={18} className="mt-0.5 shrink-0 text-blue-600" />
                            <p className="text-xs leading-5 text-slate-500">
                                Need help? Contact our support team and we will help you create
                                the perfect tuition post.
                            </p>
                        </div>
                    </aside>
                </form>
            </div>
        </div>
    );
}

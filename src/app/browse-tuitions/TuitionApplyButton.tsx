'use client'

import { applyToATuition } from '@/lib/actions/applicants';
import { useSession } from '@/lib/auth-client';
import {
    CalendarClock,
    CheckCircle2,
    Loader2,
    Mail,
    MessageSquareQuote,
    Phone,
    Send,
    UserRound,
    X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    tuitionId: string;
    tuitionTitle: string;
    classLevel?: string;
};

const TuitionApplyButton = ({ tuitionId, tuitionTitle, classLevel }: Props) => {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const [phone, setPhone] = useState('');
    const [preferredSchedule, setPreferredSchedule] = useState('');
    const [note, setNote] = useState('');

    const user = session?.user;
    const role =
        (user as { role?: string } | undefined)?.role?.toLowerCase() ?? 'student';

    const handleOpenForm = () => {
        if (isPending || isSubmitting || isApplied) return;

        if (!user) {
            router.push(`/auth/sign-in?redirectTo=/browse-tuitions/${tuitionId}`);
            return;
        }

        if (role !== 'student') {
            toast.error('Only students can apply for a tuition.');
            return;
        }

        setIsOpen(true);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmitting) return;

        if (!user) {
            router.push(`/auth/sign-in?redirectTo=/browse-tuitions/${tuitionId}`);
            return;
        }

        try {
            setIsSubmitting(true);

            const result = await applyToATuition({
                tuitionId,
                tuitionTitle,
                classLevel,
                studentName: user.name,
                email: user.email,
                phone: phone.trim(),
                preferredSchedule: preferredSchedule.trim(),
                note: note.trim() || undefined,
                userId: user.id,
                status: 'Pending',
                appliedDate: new Date().toISOString(),
            });

            if (!result?.insertedId) {
                throw new Error(
                    'Application could not be submitted. Please try again.'
                );
            }

            setIsApplied(true);
            setIsOpen(false);
            toast.success('Application submitted successfully!');
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to submit application'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const isDisabled = isPending || isSubmitting || isApplied;

    return (
        <>
            <button
                onClick={handleOpenForm}
                type="button"
                disabled={isDisabled}
                className={`flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 ${
                    isDisabled ? 'cursor-not-allowed opacity-60' : ''
                }`}
            >
                {isSubmitting ? (
                    <Loader2 size={17} className="animate-spin" />
                ) : isApplied ? (
                    <CheckCircle2 size={17} />
                ) : (
                    <Send size={17} />
                )}
                {isSubmitting
                    ? 'Applying...'
                    : isApplied
                      ? 'Application Submitted'
                      : 'Apply for This Tuition'}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="apply-dialog-title"
                >
                    <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5">
                            <div className="min-w-0">
                                <h2
                                    id="apply-dialog-title"
                                    className="text-base font-bold text-slate-900"
                                >
                                    Apply for this tuition
                                </h2>
                                <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                                    {tuitionTitle}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                disabled={isSubmitting}
                                aria-label="Close apply form"
                                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-5">
                            {/* Student summary */}
                            <div className="mb-4 grid grid-cols-1 gap-2 rounded-xl bg-slate-50 p-3 text-xs sm:grid-cols-2">
                                <p className="flex min-w-0 items-center gap-1.5 truncate font-semibold text-slate-700">
                                    <UserRound
                                        size={13}
                                        className="shrink-0 text-slate-400"
                                    />
                                    <span className="truncate">
                                        {user?.name ?? 'Student'}
                                    </span>
                                </p>
                                <p className="flex min-w-0 items-center gap-1.5 truncate text-slate-500">
                                    <Mail
                                        size={13}
                                        className="shrink-0 text-slate-400"
                                    />
                                    <span className="truncate">
                                        {user?.email ?? ''}
                                    </span>
                                </p>
                            </div>

                            <label className="block text-xs font-semibold text-slate-700">
                                Phone Number
                                <span className="text-rose-500"> *</span>
                            </label>
                            <div className="relative mt-1.5">
                                <Phone
                                    size={15}
                                    className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(event) =>
                                        setPhone(event.target.value)
                                    }
                                    placeholder="01XXXXXXXXX"
                                    maxLength={20}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-3 pl-9 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                                />
                            </div>

                            <label className="mt-4 block text-xs font-semibold text-slate-700">
                                Preferred Schedule
                                <span className="text-rose-500"> *</span>
                            </label>
                            <div className="relative mt-1.5">
                                <CalendarClock
                                    size={15}
                                    className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="text"
                                    required
                                    value={preferredSchedule}
                                    onChange={(event) =>
                                        setPreferredSchedule(event.target.value)
                                    }
                                    placeholder="e.g. Sat–Thu, 5 PM – 8 PM"
                                    maxLength={120}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-3 pl-9 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                                />
                            </div>

                            <label className="mt-4 block text-xs font-semibold text-slate-700">
                                Note to the guardian
                                <span className="ml-1 font-normal text-slate-400">
                                    (optional)
                                </span>
                            </label>
                            <div className="relative mt-1.5">
                                <MessageSquareQuote
                                    size={15}
                                    className="absolute top-3 left-3 text-slate-400"
                                />
                                <textarea
                                    value={note}
                                    onChange={(event) =>
                                        setNote(event.target.value)
                                    }
                                    rows={3}
                                    maxLength={500}
                                    placeholder="Share your experience, availability or anything else that helps..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-3 pl-9 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                                />
                            </div>

                            <div className="mt-5 flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    disabled={isSubmitting}
                                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSubmitting ? (
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Send size={16} />
                                    )}
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default TuitionApplyButton;

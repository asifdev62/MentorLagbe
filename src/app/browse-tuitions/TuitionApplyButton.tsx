'use client'

import { applyToATuition } from '@/lib/actions/applicants';
import { useSession } from '@/lib/auth-client';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isApplied, setIsApplied] = useState(false);

    const user = session?.user;
    const role =
        (user as { role?: string } | undefined)?.role?.toLowerCase() ?? 'student';

    const handleApplyNow = async () => {
        if (isSubmitting || isApplied) return;

        if (!user) {
            router.push(`/auth/sign-in?redirectTo=/browse-tuitions/${tuitionId}`);
            return;
        }

        if (role !== 'student') {
            toast.error('Only students can apply for a tuition.');
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
                userId: user.id,
                status: 'Pending',
                appliedDate: new Date().toISOString(),
            });

            if (!result?.insertedId) {
                throw new Error('Application could not be submitted. Please try again.');
            }

            setIsApplied(true);
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
        <button
            onClick={handleApplyNow}
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
    );
};

export default TuitionApplyButton;

import React, { useState } from 'react';
import { KeyRound, Eye, EyeOff, Check, AlertCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

interface AdminSecurityCardProps {
  onSessionExpired: () => void;
}

export const AdminSecurityCard: React.FC<AdminSecurityCardProps> = ({ onSessionExpired }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  const handleToggle = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (isExpanded) {
      resetForm();
    }
    setIsExpanded((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setErrorMsg('All three password fields are required.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMsg('New password and confirmation do not match.');
      return;
    }

    const token = sessionStorage.getItem('kenry_admin_token');
    if (!token) {
      onSessionExpired();
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: 'change_password',
          currentPassword,
          newPassword,
        }),
      });

      if (res.status === 401) {
        onSessionExpired();
        return;
      }

      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body?.success) {
        setErrorMsg(
          typeof body?.error === 'string'
            ? body.error
            : 'Unable to update password. Please verify your current password.'
        );
        return;
      }

      resetForm();
      setIsExpanded(false);
      setSuccessMsg('Studio admin password updated and saved to Cloudflare KV.');
    } catch {
      setErrorMsg('Network error while updating password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 rounded-lg bg-stone-50 border border-stone-200 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <label className="flex items-center space-x-2 text-xs uppercase font-bold text-stone-800">
            <KeyRound className="w-3.5 h-3.5 text-brand" />
            <span>Studio Admin Security &amp; Password</span>
          </label>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Update the private password used to unlock <code className="font-mono">/#admin</code>.
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={isExpanded}
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold bg-white hover:bg-stone-100 text-stone-800 px-3.5 py-2 rounded border border-stone-300 shadow-sm transition-colors"
        >
          <span>{isExpanded ? 'Cancel' : 'Change Admin Password'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {successMsg && (
        <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <Check className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {isExpanded && (
        <form onSubmit={handleSubmit} className="pt-3 border-t border-stone-200 space-y-3">
          <div>
            <label className="block text-[11px] uppercase font-bold text-stone-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter current password"
                className="w-full px-3.5 py-2 pr-10 rounded border border-stone-300 text-sm bg-white"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                aria-label={showCurrent ? 'Hide current password' : 'Show current password'}
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase font-bold text-stone-700 mb-1">
                New Password (min. 6 chars)
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  className="w-full px-3.5 py-2 pr-10 rounded border border-stone-300 text-sm bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((p) => !p)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                  aria-label={showNew ? 'Hide new password' : 'Show new password'}
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-stone-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="Re-enter new password"
                  className="w-full px-3.5 py-2 pr-10 rounded border border-stone-300 text-sm bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                  aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-1 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold bg-brand hover:bg-brand-hover text-white px-4 py-2.5 rounded shadow-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save New Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

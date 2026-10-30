import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { authContext } from "../../context/auth.context";
import { changePassword } from "../auth/apis/changePassword.api";

export default function Profile() {
  const context = useContext(authContext);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (response) => {
      toast.success(response?.message ?? "Password changed successfully");
      const rotatedToken = response?.data?.token;
      if (rotatedToken) {
        localStorage.setItem("tkn", rotatedToken);
        context?.setLogin(rotatedToken);
      }
      resetPasswordForm();
      setShowPasswordModal(false);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message ?? "Could not change password");
    },
  });

  if (!context) return null;
  const { user } = context;

  function resetPasswordForm() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  function closePasswordModal() {
    if (passwordMutation.isPending) return;
    setShowPasswordModal(false);
    resetPasswordForm();
  }

  function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    passwordMutation.mutate({ password: currentPassword, newPassword });
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Your account</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Profile</h1>
        </header>

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="h-40 bg-gradient-to-r from-indigo-700 via-violet-600 to-fuchsia-500 sm:h-52">
            {user?.cover && <img src={user.cover} alt="Profile cover" className="h-full w-full object-cover" />}
          </div>
          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                {user?.photo ? (
                  <img src={user.photo} alt={`${user.name} profile`} className="h-24 w-24 rounded-full border-4 border-white bg-white object-cover shadow-sm sm:h-28 sm:w-28" />
                ) : (
                  <div aria-label="Profile initials" className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-indigo-100 text-3xl font-bold text-indigo-700 shadow-sm sm:h-28 sm:w-28">{user?.name?.charAt(0).toUpperCase() ?? "U"}</div>
                )}
                <div className="pb-1">
                  <h2 className="text-2xl font-bold text-slate-900">{user?.name ?? "User"}</h2>
                  <p className="text-slate-500">@{user?.username ?? ""}</p>
                </div>
              </div>
              <button type="button" onClick={() => setShowPasswordModal(true)} className="rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200">Change password</button>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Account details</h2>
          <dl className="mt-5 divide-y divide-slate-100">
            <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-4"><dt className="text-sm font-medium text-slate-500">Full name</dt><dd className="text-sm text-slate-900">{user?.name || "Not provided"}</dd></div>
            <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-4"><dt className="text-sm font-medium text-slate-500">Username</dt><dd className="text-sm text-slate-900">{user?.username ? `@${user.username}` : "Not provided"}</dd></div>
            <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-4"><dt className="text-sm font-medium text-slate-500">Email address</dt><dd className="text-sm text-slate-900">{user?.email || "Not provided"}</dd></div>
          </dl>
        </section>
      </div>

      <Modal show={showPasswordModal} onClose={closePasswordModal}>
        <ModalHeader>Change password</ModalHeader>
        <ModalBody>
          <form onSubmit={submitPassword} className="grid gap-4">
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">Current password<input required type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="rounded-lg border border-slate-300 p-2.5 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">New password<input required minLength={8} type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="rounded-lg border border-slate-300 p-2.5 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500" /><span className="font-normal text-slate-500">Use at least 8 characters.</span></label>
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">Confirm new password<input required minLength={8} type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="rounded-lg border border-slate-300 p-2.5 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500" /></label>
            <div className="mt-2 flex justify-end gap-2">
              <button type="button" onClick={closePasswordModal} className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50">Cancel</button>
              <button disabled={passwordMutation.isPending} className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50" type="submit">{passwordMutation.isPending ? "Updating…" : "Update password"}</button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </main>
  );
}

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight, Smartphone, User, Globe, Apple, Users, Loader2, Sparkles } from "lucide-react";
import { useAuthStore, type SocialProvider } from "@/store/auth-store";
import Link from "next/link";
import { toast } from "sonner";

const SOCIAL_PROVIDERS: { provider: SocialProvider; icon: typeof Globe; label: string; color: string }[] = [
  { provider: "google", icon: Globe, label: "Google", color: "text-[#ea4335]" },
  { provider: "apple", icon: Apple, label: "Apple", color: "text-[#000]" },
  { provider: "facebook", icon: Users, label: "Facebook", color: "text-[#1877f2]" },
];

export default function AuthModal() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState("");
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);
  const [guestLoading, setGuestLoading] = useState(false);
  const { isLoggedIn, isGuest, login, socialLogin, guestLogin } = useAuthStore();

  const handleContinue = () => {
    if (phoneNumber.length === 10) {
      setStep("otp");
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      login({
        id: "user_" + phoneNumber,
        name: "User",
        email: "user@fmcgcommerce.com",
        role: "user",
        token: "mock_jwt_" + Date.now(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }, phoneNumber);
      setStep("phone");
      setPhoneNumber("");
      setOtp("");
      toast.success("Welcome back! 🎉", {
        description: "You're now logged in.",
        duration: 3000,
        position: "top-center",
      });
    }
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    setSocialLoading(provider);
    // Simulate OAuth redirect / popup delay
    setTimeout(() => {
      socialLogin(provider);
      setSocialLoading(null);
      toast.success(`Signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}! 🎉`, {
        description: "Your social account is now linked.",
        duration: 3000,
        position: "top-center",
        className: "bg-gradient-to-r from-[#0c831f] to-[#10b981] text-white border-none",
      });
    }, 800);
  };

  const handleGuestLogin = () => {
    setGuestLoading(true);
    setTimeout(() => {
      guestLogin();
      setGuestLoading(false);
      toast.success("You're browsing as a guest! 🛒", {
        description: "Sign in anytime to save your cart and addresses.",
        duration: 4000,
        position: "top-center",
        className: "bg-gradient-to-r from-[#ff4f8b] to-[#ff6b9d] text-white border-none",
      });
    }, 500);
  };

  // If logged in, show account link with indicator
  if (isLoggedIn) {
    return (
      <Link href="/account" className="flex min-h-[44px] h-10 items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-3 text-sm font-semibold text-[#1a1a1a] transition-all duration-200 btn-press hover-border-pink hover-bg-pink-light sm:px-4">
        <User className="w-4 h-4 text-[#ff4f8b]" />
        <span className="hidden sm:block">{isGuest ? "Guest" : "My Account"}</span>
        {isGuest && (
          <span className="px-1.5 py-0.5 bg-[#fff3e0] text-[#e65100] text-[8px] font-bold rounded-full uppercase">
            Guest
          </span>
        )}
      </Link>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex min-h-[44px] h-10 items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-3 text-sm font-semibold text-[#1a1a1a] transition-all duration-200 btn-press hover-border-pink hover-bg-pink-light sm:px-4">
          <User className="w-4 h-4 text-[#ff4f8b]" />
          <span className="hidden sm:block">Login</span>
        </button>
      </DialogTrigger>

      <DialogContent className="mx-auto max-w-sm overflow-hidden rounded-3xl border border-[#e8e8e8] bg-white p-0 text-[#1a1a1a] shadow-xl">
        <DialogTitle className="hidden">Authentication Modal</DialogTitle>
        <DialogDescription className="hidden">
          Login using your phone number and OTP verification.
        </DialogDescription>

        <div className="bg-gradient-to-br from-[#0c831f] via-[#128f2b] to-[#ff4f8b] px-6 py-6 text-white">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
            <span className="text-lg font-black">F</span>
          </div>
          <h2 className="text-2xl font-black leading-tight">
            Login to FMCG Commerce
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/85">
            Get faster checkout, saved addresses, and fresh offers near you.
          </p>
        </div>

        <div className="space-y-4 p-6">
          {step === "phone" ? (
            <>
              <div>
                <label className="text-xs font-black uppercase tracking-wide text-[#666]">
                  Phone Number
                </label>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex h-11 w-16 flex-shrink-0 items-center justify-center rounded-lg border border-[#e8e8e8] bg-[#f6f7f6] text-sm font-black text-[#1a1a1a]">
                    +91
                  </div>
                  <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border border-[#e8e8e8] bg-[#f6f7f6] px-3 focus-within:border-[#0c831f] focus-border-pink">
                    <Smartphone className="h-4 w-4 flex-shrink-0 text-[#ff4f8b]" />
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="Enter mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#1a1a1a] outline-none placeholder:text-[#999]"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={phoneNumber.length !== 10}
                className="flex h-11 w-full items-center justify-between rounded-xl bg-[#ff4f8b] px-4 text-sm font-black text-white transition-all duration-200 disabled:opacity-50 hover:bg-[#e63872] btn-press active:scale-[0.98]"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-black uppercase tracking-wide text-[#666]">
                  Enter OTP
                </label>
                <p className="text-xs text-[#666] mt-1">
                  Sent to +91 {phoneNumber} • Demo OTP: 123456
                </p>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter 6 digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="mt-2 h-11 w-full rounded-lg border border-[#e8e8e8] bg-[#f6f7f6] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="flex h-11 w-full items-center justify-between rounded-xl bg-[#ff4f8b] px-4 text-sm font-black text-white transition-all duration-200 disabled:opacity-50 hover:bg-[#e63872] btn-press active:scale-[0.98]"
              >
                Verify & Login
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setStep("phone")}
                className="text-sm text-[#ff4f8b] font-semibold"
              >
                Change Number
              </button>
            </>
          )}

          {/* Social Login */}
          {step === "phone" && (
            <>
              <div className="relative flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-[#e8e8e8]" />
                <span className="text-[10px] font-medium text-[#999] flex-shrink-0">OR CONTINUE WITH</span>
                <div className="flex-1 h-px bg-[#e8e8e8]" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {SOCIAL_PROVIDERS.map(({ provider, icon: Icon, label, color }) => (
                  <button
                    key={provider}
                    onClick={() => handleSocialLogin(provider)}
                    disabled={socialLoading !== null}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-[#e8e8e8] hover:bg-[#fafafa] hover:border-[#ff4f8b] transition-all group btn-press disabled:opacity-60 disabled:cursor-wait"
                  >
                    {socialLoading === provider ? (
                      <Loader2 className="w-5 h-5 text-[#ff4f8b] animate-spin" />
                    ) : (
                      <Icon className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform`} />
                    )}
                    <span className="text-[9px] font-semibold text-[#999] group-hover:text-[#ff4f8b]">{label}</span>
                  </button>
                ))}
              </div>

              <div className="relative flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-[#e8e8e8]" />
                <div className="flex-1 h-px bg-[#e8e8e8]" />
              </div>

              {/* Guest Login */}
              <button
                onClick={handleGuestLogin}
                disabled={guestLoading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#e8e8e8] text-sm font-semibold text-[#666] hover:border-[#ff4f8b] hover:text-[#ff4f8b] hover:bg-[#fff0f6] transition-all disabled:opacity-50"
              >
                {guestLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {guestLoading ? "Starting session..." : "Continue as Guest"}
              </button>

              {/* Guest benefits */}
              <div className="grid grid-cols-3 gap-2">
                {["Browse products", "Add to cart", "Browse offers"].map((benefit) => (
                  <div key={benefit} className="text-center py-1.5 px-1 rounded-lg bg-[#fafafa] border border-[#f2f2f2]">
                    <p className="text-[9px] font-medium text-[#999]">{benefit}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <p className="text-center text-[10px] leading-relaxed text-[#999]">
            By continuing, you agree to our{" "}
            <span className="cursor-pointer font-semibold text-[#ff4f8b] hover-text-pink">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="cursor-pointer font-semibold text-[#ff4f8b] hover-text-pink">
              Privacy Policy
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
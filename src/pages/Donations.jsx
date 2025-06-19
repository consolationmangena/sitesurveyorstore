import { Heart, CreditCard, Globe, Mail } from "lucide-react";

export default function Donations() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
          </div>
          
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50 mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Donations
            </h1>
            <p className="text-xl text-slate-600 font-medium max-w-4xl mx-auto leading-relaxed mb-8">
              Support SiteSurveyor's mission by making a donation. Your contribution helps us continue to provide innovative geomatics solutions for professionals across Africa.
            </p>

            <div className="max-w-3xl mx-auto text-left space-y-6">
              <div className="flex items-center gap-4">
                <CreditCard className="w-6 h-6 text-red-600" />
                <p>
                  Donate via credit or debit card through our secure payment gateway.
                  Visit{" "}
                  <a
                    href="https://payment.sitesurveyor.co.zw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 underline"
                  >
                    payment.sitesurveyor.co.zw
                  </a>{" "}
                  to make a payment.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Globe className="w-6 h-6 text-red-600" />
                <p>
                  International donors can use PayPal or bank transfer. Contact us for details.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-red-600" />
                <p>
                  For inquiries or alternative donation methods, email us at{" "}
                  <a
                    href="mailto:donate@sitesurveyor.co.zw"
                    className="text-red-600 underline"
                  >
                    donate@sitesurveyor.co.zw
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

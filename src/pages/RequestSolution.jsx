
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RequestSolutionForm from "@/components/RequestSolutionForm";

export default function RequestSolutionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header title="Request Solution" subtitle="Share Your Challenge" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border-2 border-slate-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-3xl">💡</span>
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-800">Request a Solution</h2>
              <p className="text-lg font-semibold text-slate-600">Help Us Build Better Tools</p>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50 mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <h3 className="text-xl font-black text-blue-800 mb-3">🌍 Share Your Challenge</h3>
                <p className="text-base font-medium text-slate-700 leading-relaxed">
                  Are you a geomatician or surveyor who faced a challenge in the field, lab, or office? 
                  Share your real-world problem, and help us build open-source solutions for Africa and beyond!
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                <h4 className="text-lg font-black text-green-800 mb-2">🔧 Field Issues</h4>
                <p className="text-sm font-medium text-slate-700">Equipment limitations, data collection challenges</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                <h4 className="text-lg font-black text-purple-800 mb-2">💻 Software Gaps</h4>
                <p className="text-sm font-medium text-slate-700">Missing tools, expensive licenses, workflow bottlenecks</p>
              </div>
            </div>
          </div>

          <RequestSolutionForm />
          
          <div className="mt-6 text-center">
            <p className="text-sm font-bold text-slate-600">
              Your input drives innovation • Community-powered solutions
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


import RequestSolutionForm from "@/components/RequestSolutionForm";

export default function RequestSolutionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-accent/20 to-primary/10 px-4 py-12 flex flex-col items-center">
      <div className="max-w-xl w-full bg-white/90 shadow-xl rounded-2xl p-8 border border-accent/40 animate-fade-in">
        <h1 className="text-2xl font-bold text-primary mb-2">Request a Solution</h1>
        <p className="text-muted-foreground mb-6">
          Are you a geomatician or surveyor who faced a challenge in the field, lab, or office? <br />
          Share your real-world problem, and help us build open-source solutions for Africa and beyond!
        </p>
        <RequestSolutionForm />
      </div>
    </div>
  );
}

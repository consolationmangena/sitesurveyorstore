
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type FormValues = {
  email: string;
  problem: string;
};

export default function RequestSolutionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    // For now just show a confirmation toast
    toast({
      title: "Thank you!",
      description:
        "Your problem has been recorded. We appreciate your contribution and will review it soon.",
      duration: 5000,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-lg font-bold mb-2 text-slate-800">
          Your Email (optional)
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@email.com"
          className="bg-white border-2 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          {...register("email")}
        />
        <span className="block text-sm font-medium text-slate-600 mt-2">We'll only use this if we need to follow up with you.</span>
      </div>
      <div>
        <label htmlFor="problem" className="block text-lg font-bold mb-2 text-slate-800">
          Describe the Problem<span className="text-red-600 ml-1">*</span>
        </label>
        <Textarea
          id="problem"
          rows={5}
          placeholder="Explain the challenge you witnessed in the field, office, or anywhere..."
          className="bg-white border-2 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          required
          {...register("problem", { required: true })}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
}

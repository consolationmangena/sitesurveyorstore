
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
        <label htmlFor="email" className="block text-sm font-medium mb-1 text-primary">
          Your Email (optional)
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@email.com"
          className="bg-white"
          {...register("email")}
        />
        <span className="block text-xs text-muted-foreground mt-1">We'll only use this if we need to follow up with you.</span>
      </div>
      <div>
        <label htmlFor="problem" className="block text-sm font-medium mb-1 text-primary">
          Describe the Problem<span className="text-destructive">*</span>
        </label>
        <Textarea
          id="problem"
          rows={5}
          placeholder="Explain the challenge you witnessed in the field, office, or anywhere."
          className="bg-white"
          required
          {...register("problem", { required: true })}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Submit Request
      </Button>
    </form>
  );
}

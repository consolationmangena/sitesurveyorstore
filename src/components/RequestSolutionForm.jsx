import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Lightbulb, Send, Sparkles, MapPin, Users, Clock, CheckCircle } from "lucide-react";

export default function RequestSolutionForm() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm();

  const problemDescription = watch("problem", "");

  // Update character count
  React.useEffect(() => {
    setCharacterCount(problemDescription.length);
  }, [problemDescription]);

  const categories = [
    { value: "field-tools", label: "Field Tools & Equipment", icon: "🏗️" },
    { value: "software", label: "Software & Applications", icon: "💻" },
    { value: "data-processing", label: "Data Processing & Analysis", icon: "📊" },
    { value: "collaboration", label: "Team Collaboration", icon: "🤝" },
    { value: "education", label: "Education & Training", icon: "🎓" },
    { value: "other", label: "Other", icon: "💡" }
  ];

  const urgencyLevels = [
    { value: "low", label: "Nice to Have", color: "bg-blue-100 text-blue-800", description: "Would improve workflow" },
    { value: "medium", label: "Important", color: "bg-yellow-100 text-yellow-800", description: "Significant impact on work" },
    { value: "high", label: "Critical", color: "bg-red-100 text-red-800", description: "Blocking current projects" }
  ];

  const onSubmit = async (data) => {
    // Build the enhanced solution request object
    const submission = {
      email: data.email || null,
      problem: data.problem,
      category: selectedCategory,
      urgency: selectedUrgency,
      location: data.location || null,
      organization: data.organization || null,
      submitted_at: new Date().toISOString(),
    };

    // Simulate API call (replace with actual Supabase integration)
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Solution request submitted:", submission);
      
      toast({
        title: "🎉 Thank you for sharing!",
        description: "Your challenge has been recorded and will be reviewed by our community. We'll be in touch if we need more details!",
        duration: 6000,
      });
      
      reset();
      setSelectedCategory("");
      setSelectedUrgency("");
      setCharacterCount(0);
    } catch (error) {
      console.error("Error saving request:", error);
      toast({
        title: "Oops! Something went wrong",
        description: "There was a problem submitting your request. Please try again in a moment.",
        duration: 5000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-bold mb-2 text-slate-800">
            Your Email <span className="text-slate-500 font-normal">(optional)</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="bg-white border-2 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl"
            {...register("email")}
          />
          <p className="text-xs text-slate-600 mt-1">We'll only contact you if we need clarification</p>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-bold mb-2 text-slate-800">
            Location <span className="text-slate-500 font-normal">(optional)</span>
          </label>
          <Input
            id="location"
            type="text"
            placeholder="City, Country"
            className="bg-white border-2 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl"
            {...register("location")}
          />
          <p className="text-xs text-slate-600 mt-1">Helps us understand regional challenges</p>
        </div>
      </div>

      <div>
        <label htmlFor="organization" className="block text-sm font-bold mb-2 text-slate-800">
          Organization/Company <span className="text-slate-500 font-normal">(optional)</span>
        </label>
        <Input
          id="organization"
          type="text"
          placeholder="University, Company, or Freelance"
          className="bg-white border-2 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl"
          {...register("organization")}
        />
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-bold mb-3 text-slate-800">
          Challenge Category <span className="text-red-600">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => setSelectedCategory(category.value)}
              className={`p-4 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                selectedCategory === category.value
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-sm font-bold text-slate-800">{category.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Urgency Level */}
      <div>
        <label className="block text-sm font-bold mb-3 text-slate-800">
          How urgent is this challenge?
        </label>
        <div className="grid md:grid-cols-3 gap-3">
          {urgencyLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setSelectedUrgency(level.value)}
              className={`p-4 rounded-xl border-2 transition-all text-center hover:scale-105 ${
                selectedUrgency === level.value
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <Badge className={`${level.color} mb-2`}>
                {level.label}
              </Badge>
              <div className="text-xs text-slate-600">{level.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Problem Description */}
      <div>
        <label htmlFor="problem" className="block text-sm font-bold mb-3 text-slate-800">
          Describe Your Challenge <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <Textarea
            id="problem"
            rows={6}
            placeholder="Tell us about the specific challenge you're facing... 

For example:
• What task are you trying to accomplish?
• What tools have you tried?
• What's not working well?
• How is this affecting your work?
• What would an ideal solution look like?

The more details you provide, the better we can help!"
            className="bg-white border-2 border-slate-300 text-slate-800 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl resize-none"
            required
            {...register("problem", { required: true, minLength: 50 })}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span className={`text-xs font-medium ${
              characterCount < 50 ? 'text-red-500' : characterCount < 100 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {characterCount} characters
            </span>
            {characterCount >= 50 && (
              <CheckCircle className="w-4 h-4 text-green-600" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Lightbulb className="w-4 h-4 text-blue-500" />
          <p className="text-xs text-slate-600">
            <strong>Tip:</strong> Include specific examples and context. The more detailed your description, the better solution we can create!
          </p>
        </div>
      </div>

      {/* Helpful Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Make Your Request Stand Out
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700">Be specific about your workflow</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700">Mention current tools you use</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700">Explain the impact on your work</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700">Include technical requirements</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700">Describe your ideal solution</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700">Mention if others face this too</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
        disabled={isSubmitting || !selectedCategory || characterCount < 50}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Submitting Your Challenge...</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Send className="w-5 h-5" />
            <span>Share My Challenge</span>
            <Sparkles className="w-5 h-5" />
          </div>
        )}
      </Button>

      {/* Privacy Note */}
      <div className="text-center">
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Privacy Promise:</strong> Your information is safe with us. We only use it to understand and solve your challenge. 
          All solutions we create are open-source and freely available to everyone.
        </p>
      </div>
    </form>
  );
}
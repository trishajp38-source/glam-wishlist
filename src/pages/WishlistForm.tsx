import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Sparkles, Heart } from "lucide-react";

const formSchema = z.object({
  itemName: z.string().min(1, "Item name is required").max(100, "Item name must be less than 100 characters"),
  category: z.enum(["Dress", "Shoes", "Accessories", "Other"], {
    required_error: "Please select a category",
  }),
  price: z.string().min(1, "Price is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    "Price must be a positive number"
  ),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
});

const WishlistForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      category: undefined,
      price: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("fashion_wishlist").insert({
        item_name: values.itemName,
        category: values.category,
        price: parseFloat(values.price),
        description: values.description,
      });

      if (error) throw error;

      toast({
        title: "✨ Success!",
        description: "Your fashion item has been added to your wishlist!",
        className: "bg-accent border-primary",
      });

      form.reset();
      
      setTimeout(() => {
        navigate("/view");
      }, 1500);
    } catch (error) {
      console.error("Error adding fashion item:", error);
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-primary/20 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-4 rounded-full">
              <Heart className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-primary flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8" />
            FashionFit Wishlist
            <Sparkles className="h-8 w-8" />
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Add your dream fashion items to your wishlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-semibold">Fashion Item Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Elegant Pink Dress" 
                        {...field} 
                        className="border-primary/30 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-semibold">Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-primary/30 focus:border-primary">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover">
                        <SelectItem value="Dress">Dress</SelectItem>
                        <SelectItem value="Shoes">Shoes</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-semibold">Price (₹)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g., 2999" 
                        {...field} 
                        className="border-primary/30 focus:border-primary"
                        step="0.01"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-semibold">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your dream fashion item..."
                        className="min-h-[120px] border-primary/30 focus:border-primary resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding to Wishlist..." : "✨ Add to Wishlist"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/10"
                onClick={() => navigate("/view")}
              >
                View Latest Item
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WishlistForm;

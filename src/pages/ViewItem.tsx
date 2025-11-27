import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, ArrowLeft, Calendar, Tag, IndianRupee } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface FashionItem {
  id: string;
  item_name: string;
  category: string;
  price: number;
  description: string;
  created_at: string;
}

const ViewItem = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState<FashionItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestItem();
  }, []);

  const fetchLatestItem = async () => {
    try {
      const { data, error } = await supabase
        .from("fashion_wishlist")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          toast({
            title: "No items yet",
            description: "Your wishlist is empty. Add your first fashion item!",
            className: "bg-accent border-primary",
          });
        } else {
          throw error;
        }
      } else {
        setItem(data);
      }
    } catch (error) {
      console.error("Error fetching fashion item:", error);
      toast({
        title: "Error",
        description: "Failed to fetch the latest item.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Dress":
        return "👗";
      case "Shoes":
        return "👠";
      case "Accessories":
        return "👜";
      default:
        return "✨";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin">
            <Sparkles className="h-12 w-12 text-primary mx-auto" />
          </div>
          <p className="text-muted-foreground">Loading your fashion item...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-primary/20 shadow-xl">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Your Wishlist is Empty</h2>
              <p className="text-muted-foreground">Start adding your dream fashion items!</p>
            </div>
            <Button 
              onClick={() => navigate("/")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Add Your First Item
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl border-primary/20 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 to-accent/30 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-card p-4 rounded-full shadow-lg">
              <span className="text-5xl">{getCategoryIcon(item.category)}</span>
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-primary flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-8 w-8" />
            Latest Fashion Item
            <Sparkles className="h-8 w-8" />
          </CardTitle>
        </div>

        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-foreground">{item.item_name}</h3>
              <Badge className="bg-primary text-primary-foreground px-4 py-2 text-base">
                <Tag className="h-4 w-4 mr-2" />
                {item.category}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-2xl font-semibold text-primary">
              <IndianRupee className="h-7 w-7" />
              {item.price.toLocaleString("en-IN")}
            </div>

            <div className="bg-accent/50 p-6 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Description
              </h4>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
              <Calendar className="h-4 w-4" />
              <span>Added on {format(new Date(item.created_at), "MMMM dd, yyyy 'at' hh:mm a")}</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={() => navigate("/")}
              variant="outline"
              className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Form
            </Button>
            <Button 
              onClick={fetchLatestItem}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewItem;

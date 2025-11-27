import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Heart, ShoppingBag } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-primary/20 shadow-2xl">
        <CardHeader className="text-center space-y-4 pt-12">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-6 rounded-full">
              <ShoppingBag className="h-16 w-16 text-primary" />
            </div>
          </div>
          <CardTitle className="text-5xl font-bold text-primary flex items-center justify-center gap-3">
            <Sparkles className="h-10 w-10" />
            FashionFit
            <Sparkles className="h-10 w-10" />
          </CardTitle>
          <CardDescription className="text-xl text-muted-foreground">
            Your Dream Fashion Wishlist
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-12 space-y-6">
          <p className="text-center text-muted-foreground text-lg px-6">
            Create and manage your perfect fashion wishlist. Save your favorite items, track prices, and never lose sight of your style dreams!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 px-6">
            <Button 
              onClick={() => navigate("/form")}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold"
            >
              <Heart className="mr-2 h-6 w-6" />
              Add Fashion Item
            </Button>
            <Button 
              onClick={() => navigate("/view")}
              variant="outline"
              className="flex-1 border-primary/30 text-primary hover:bg-primary/10 py-6 text-lg font-semibold"
            >
              <Sparkles className="mr-2 h-6 w-6" />
              View Latest Item
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 px-6 pt-6">
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-3xl mb-2">👗</div>
              <p className="text-sm text-muted-foreground font-medium">Dresses</p>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-3xl mb-2">👠</div>
              <p className="text-sm text-muted-foreground font-medium">Shoes</p>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-3xl mb-2">👜</div>
              <p className="text-sm text-muted-foreground font-medium">Accessories</p>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <div className="text-3xl mb-2">✨</div>
              <p className="text-sm text-muted-foreground font-medium">More</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;

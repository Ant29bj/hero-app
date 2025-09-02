import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Trophy, Users, Zap } from "lucide-react";
import { HeroStatCard } from "./HeroStatCard";
import { useHeroSummary } from "../hooks/useHeroSumary";
import { FavoriteHeroContext } from "../context/favorites-hero.context";
import { use } from "react";

export function HeroStats() {
  const { data: heroSummary } = useHeroSummary();
  const { favoriteCount } = use(FavoriteHeroContext);
  const total = heroSummary?.totalHeroes ? heroSummary?.totalHeroes : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Characters</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">  {heroSummary?.totalHeroes}</div>
          <div className="flex gap-1 mt-2">
            <Badge variant="secondary" className="text-xs">
              {heroSummary?.heroCount} Heroes
            </Badge>
            <Badge variant="destructive" className="text-xs">

              {heroSummary?.villainCount} Villians
            </Badge>
          </div>
        </CardContent>
      </Card>


      <HeroStatCard
        title="Favorites"
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
        <p className="text-xs text-muted-foreground">{((favoriteCount / total) * 100).toFixed(2)}% of total</p>
      </HeroStatCard>

      <HeroStatCard
        title="Strongest"
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{heroSummary?.strongestHero.alias}</div>
        <p className="text-xs text-muted-foreground">Strength: {heroSummary?.strongestHero.strength}</p>
      </HeroStatCard>

      <HeroStatCard
        title="Smartest"
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{heroSummary?.smartestHero.alias}</div>
        <p className="text-xs text-muted-foreground">Intelligence: {heroSummary?.smartestHero.intelligence}</p>
      </HeroStatCard>
    </div>

  );
}
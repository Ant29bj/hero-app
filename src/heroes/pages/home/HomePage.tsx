import {
  Heart,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotorn } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs"
import { useSearchParams } from "react-router"
import { use, useMemo } from "react"
import { useHeroSummary } from "@/heroes/hooks/useHeroSumary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/favorites-hero.context"

export function HomePage() {

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains']
    return validTabs.includes(activeTab) ? activeTab : 'all'

  }, [activeTab]);

  const { data: heroeResponse } = usePaginatedHero(+page, +limit, category);
  const { data: heroSummary } = useHeroSummary();
  const { favoriteCount, favorites } = use(FavoriteHeroContext);


  return (
    < >
      < >
        {/* Header */}
        <CustomJumbotorn
          title="Superhero Universe"
          description="Discover, explore, and manage your favorite superheroes and villains"
        />
        <CustomBreadCrumbs currentPage="Heroes" />

        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              onClick={() => setSearchParams(
                (prev) => {
                  prev.set('tab', 'all');
                  prev.set('category', 'all');
                  return prev;
                })}
              value="all">All Characters ({heroSummary?.totalHeroes})</TabsTrigger>
            <TabsTrigger
              onClick={() => setSearchParams(
                (prev) => {
                  prev.set('tab', 'favorites');
                  return prev;
                })}
              value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setSearchParams(
                (prev) => {
                  prev.set('tab', 'heroes');
                  prev.set('category', 'hero');
                  return prev;
                })}
              value="heroes">Heroes ({heroSummary?.heroCount})</TabsTrigger>
            <TabsTrigger
              onClick={() => setSearchParams(
                (prev) => {
                  prev.set('tab', 'villains');
                  prev.set('category', 'villain')
                  return prev;
                })}
              value="villains">Villains ({heroSummary?.villainCount})</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <HeroGrid heroes={heroeResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            <h1>Favorites</h1>
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value="heroes">
            <HeroGrid heroes={heroeResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            <HeroGrid heroes={heroeResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {
          selectedTab != 'favorites' && (
            <CustomPagination totalPages={heroeResponse?.pages ?? 2} />
          )
        }
      </>
    </>
  )
}

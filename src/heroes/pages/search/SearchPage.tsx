import { CustomJumbotorn } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { useQuery } from "@tanstack/react-query";
import { searchHeroActions } from "@/heroes/actions/get-hero-filter.action";
import { useSearchParams } from "react-router";
import { HeroGrid } from "@/heroes/components/HeroGrid";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') ?? '';
  const strength = Number(searchParams.get('strength') ?? null);
  const team = searchParams.get('team') ?? '';
  const category = searchParams.get('category') ?? '';
  const universe = searchParams.get('universe') ?? '';
  const status = searchParams.get('status') ?? '';

  const { data } = useQuery({
    queryKey: ['search-result', { name, strength, team, category, universe, status }],
    queryFn: () => searchHeroActions({ name, strength, team, category, universe, status }),
    staleTime: 1000 * 60 * 5,
    retry: false
  });

  return (
    <>
      <CustomJumbotorn title="Search Heroes" description="Find your favorite heroes" />
      <CustomBreadCrumbs
        currentPage="Search Heroes" />
      <HeroStats />
      <SearchControls />
      <HeroGrid heroes={data ?? []} />
    </>
  );
}

export default SearchPage;
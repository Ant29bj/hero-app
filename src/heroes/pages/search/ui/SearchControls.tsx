import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Filter, Search } from "lucide-react";
import { useRef, type KeyboardEvent } from "react";
import { useSearchParams } from "react-router";
import { CustomSelectMenu } from "@/components/custom/CustomSelectMenu";

export function SearchControls() {
  const [searchParams, setSearchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const isActiveAccordion = searchParams.get('active-accordion') ?? '';
  const strength = Number(searchParams.get('strength') ?? 0);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = inputRef.current?.value ?? '';
      setQueryParams('name', value);
    }
  }

  const setQueryParams = (key: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(key, value);
      return prev;
    });
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            defaultValue={searchParams.get('name') ?? ''}
            placeholder="Search heroes, villains, powers, teams..."
            className="pl-12 h-12 text-lg" />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button

            onClick={() => {
              if (isActiveAccordion === 'advance-filters') {
                setQueryParams('active-accordion', '')
                return;
              }
              setQueryParams('active-accordion', 'advance-filters');
            }}
            variant={isActiveAccordion === 'advance-filters' ? 'default' : "outline"} className="h-12">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>
      <Accordion type="single" collapsible value={isActiveAccordion} data-testid='accordion'>
        <AccordionItem value="advance-filters">
          <AccordionContent>
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <Button
                  onClick={() => {

                  }}
                  variant="ghost">Clear All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Team</label>
                  <CustomSelectMenu
                    placeholder="Batfamilia, X-Men ..."
                    keyValue="team"
                    values={[
                      "Vengadores",
                      "Liga de la Justicia",
                      "Batfamilia",
                      "X-Men",
                      "Jóvenes Titanes",
                      "Solo"]} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <CustomSelectMenu
                    placeholder="Hero, Villain, ..."
                    keyValue="category"
                    values={[
                      "Hero",
                      "Villain"
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Universe</label>
                  <CustomSelectMenu
                    placeholder="Marvel, DC, ..."
                    keyValue="universe"
                    values={[
                      "Marvel",
                      "DC"
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <CustomSelectMenu
                    placeholder="Marvel, DC, ..."
                    keyValue="status"
                    values={[
                      "Active",
                      "Deceased"
                    ]}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium">Minimum Strength: {strength}/10</label>
                <Slider
                  onValueChange={(value) => setQueryParams('strength', value[0].toString())}
                  defaultValue={[strength]} max={10} step={1} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
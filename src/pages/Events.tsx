import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@heroui/react";
import EventGrid from "@/components/home/EventGrid";
import SearchBar from "@/components/home/SearchBar";


// interface EventResponse {
//   items: EventResponseDto[]; 
//   total: number; 
//   page: number; 
//   limit: number; 
//   pages: number; 
// }


const BASE_API_URL = "http://localhost:3000";

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const queryParams = Object.fromEntries(searchParams.entries());

  console.log("Query Params:", queryParams);
  const { page, limit, search, city, categoryId, startDate, endDate } =
    queryParams;
  const pageParam = page ? parseInt(page, 10) : 1;
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [apiQuery, setApiQuery] = useState("");

  // Sync state from URL
  // useEffect(() => {
  //   if (query) setSearchTerm(query);
  //   setCurrentPage(pageParam);
  // }, [query, pageParam]);

  // Filter events based on search term
  // const filteredEvents = useMemo(() => {
  //   let filtered = [...mockEventCards];
  //   if (searchTerm.trim()) {
  //     const q = searchTerm.toLowerCase();
  //     setLoading(true);

  //     filtered = filtered.filter(
  //       (event) =>
  //         event.title.toLowerCase().includes(q) ||
  //         event.description.toLowerCase().includes(q) ||
  //         event.location?.toLowerCase().includes(q) ||
  //         event.category?.toLowerCase().includes(q)
  //     );
  //     setLoading(false);

  //   }
  //   return filtered;
  // }, [searchTerm]);

  // Simulate fetching / filtering delay
  useEffect(() => {
    if(search){
      setSearchTerm(search);
      setApiQuery(new URLSearchParams({
        search: search,
        page: currentPage.toString(),
      }).toString());
    }
    async function fetchEvents(){
      setLoading(true);
        try {
          const eventsResponse = await fetch(`${BASE_API_URL}/events?${apiQuery}`);
          console.log(eventsResponse)

          const eventsData = await eventsResponse.json();

          setFilteredEvents(eventsData?.items);
          setTotalPages(eventsData?.pages);
        } catch (error) {
          console.error("Error fetching events:", error);
          throw error;
        }
      }
      if (searchTerm){
        setApiQuery(new URLSearchParams({
          search: searchTerm,
          page: currentPage.toString(),
        }).toString());
      }

    fetchEvents().finally(() => setLoading(false));
  }, [searchTerm, currentPage, apiQuery]);

  // Handlers
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setSearchParams(term ? { search: term, page: "1" } : { page: "1" });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params: Record<string, string> = { page: page.toString() };
    if (searchTerm) params.query = searchTerm;
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold">All Events</h1>
        <p className="mt-2 text-gray-600">
          Discover and explore amazing events
        </p>
      </div>

      {/* Search */}
      <SearchBar
        query={searchTerm}
        onChange={handleSearch}
        placeholder="Search events..."
        size="lg"
      />

      {/* Events Grid */}
      <div className="mt-8">
        <EventGrid events={filteredEvents} isLoading={loading} />
      </div>

      {/* Pagination */}
      {totalPages && (
        <div className="flex justify-center mt-10">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showControls
            showShadow
            size="lg"
            loop={false}
          />
        </div>
      )}
    </div>
  );
};

export default Events;
